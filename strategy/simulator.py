import csv
import itertools
import json
import os
from copy import deepcopy
from collections import defaultdict

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "sim_config.json")
OUT_DIR = os.path.join(os.path.dirname(__file__), "out")


def load_config(path):
    with open(path, "r", encoding="utf-8") as f:
        config = json.load(f)
    # Normalize dice tables to int keys
    dice_tables = {}
    for name, table in config.get("dice_tables", {}).items():
        dice_tables[name] = {int(k): float(v) for k, v in table.items()}
    config["dice_tables"] = dice_tables
    return config


def expand_options(options):
    expanded = {}
    for base_name, opt in options.items():
        if "target_choices" in opt:
            for target in opt["target_choices"]:
                new_opt = deepcopy(opt)
                new_opt["base_name"] = base_name
                new_opt["target"] = target
                new_opt.pop("target_choices", None)
                expanded[f"{base_name}_{target}"] = new_opt
        else:
            new_opt = deepcopy(opt)
            new_opt["base_name"] = base_name
            expanded[base_name] = new_opt
    return expanded


def base_revenue_for(opt, round_idx):
    if "base_revenue_by_round" in opt:
        return float(opt["base_revenue_by_round"][round_idx])
    base = float(opt.get("base_revenue", 0))
    delta = float(opt.get("per_round_delta", 0))
    return base + delta * round_idx


def clamp_roll(roll):
    return max(1, min(6, roll))


def allocate_spot_market(demand, capacity, method, bid_values):
    pear_demand = demand.get("PearCom", 0)
    soft_demand = demand.get("SoftCom", 0)
    total_demand = pear_demand + soft_demand

    if total_demand <= 0 or capacity <= 0:
        return {"PearCom": 0.0, "SoftCom": 0.0}

    if capacity >= total_demand:
        return {"PearCom": pear_demand, "SoftCom": soft_demand}

    if method == "proportional":
        return {
            "PearCom": capacity * (pear_demand / total_demand),
            "SoftCom": capacity * (soft_demand / total_demand),
        }

    if method == "highest_bidder":
        pear_bid = bid_values.get("PearCom", 0)
        soft_bid = bid_values.get("SoftCom", 0)
        if abs(pear_bid - soft_bid) < 1e-9:
            return {
                "PearCom": capacity * (pear_demand / total_demand),
                "SoftCom": capacity * (soft_demand / total_demand),
            }
        if pear_bid > soft_bid:
            pear_alloc = min(pear_demand, capacity)
            soft_alloc = max(0.0, capacity - pear_alloc)
            soft_alloc = min(soft_alloc, soft_demand)
            return {"PearCom": pear_alloc, "SoftCom": soft_alloc}
        soft_alloc = min(soft_demand, capacity)
        pear_alloc = max(0.0, capacity - soft_alloc)
        pear_alloc = min(pear_alloc, pear_demand)
        return {"PearCom": pear_alloc, "SoftCom": soft_alloc}

    raise ValueError(f"Unknown spot market method: {method}")


def allocate_chips(sil_opt, demand, capacity, spot_method, lock_in):
    # Lock-in blocks SoftCom regardless of other allocation rules
    if lock_in:
        pear = min(demand.get("PearCom", 0), capacity)
        return {"PearCom": pear, "SoftCom": 0.0}

    allocation = sil_opt.get("allocation")
    if isinstance(allocation, dict):
        alloc_pear = float(allocation.get("PearCom", 0))
        alloc_soft = float(allocation.get("SoftCom", 0))
        total_alloc = alloc_pear + alloc_soft
        if total_alloc <= 0:
            return {"PearCom": 0.0, "SoftCom": 0.0}
        if capacity < total_alloc:
            scale = capacity / total_alloc
            alloc_pear *= scale
            alloc_soft *= scale
        alloc_pear = min(alloc_pear, demand.get("PearCom", 0))
        alloc_soft = min(alloc_soft, demand.get("SoftCom", 0))
        return {"PearCom": alloc_pear, "SoftCom": alloc_soft}

    if allocation == "spot_market":
        return allocate_spot_market(demand, capacity, spot_method, demand.get("_bid_values", {}))

    return {"PearCom": 0.0, "SoftCom": 0.0}


def compute_round_expected(scenario_opts, config, round_idx, spot_method, lock_in, shock_name):
    rules = config["rules"]
    dice_tables = config["dice_tables"]
    shocks = config.get("shocks", {})
    shock_round = int(shocks.get("round", 0))
    shock_variant = shocks.get("variants", {}).get(shock_name) if shock_name else None
    shock_active = shock_variant is not None and (round_idx + 1) == shock_round

    # Roll modifiers
    roll_mods = {"PearCom": 0, "SoftCom": 0, "OpenAIco": 0}

    amer_opt = scenario_opts["AmeriShop"]
    amer_effects = amer_opt.get("effects", {})
    if "roll_mod_to_target" in amer_effects:
        target = amer_opt.get("target")
        if target in roll_mods:
            roll_mods[target] += int(amer_effects["roll_mod_to_target"])

    if (round_idx + 1) == rules.get("openai_degradation_round"):
        if scenario_opts["OpenAIco"]["base_name"] != "SoftComExclusive":
            roll_mods["SoftCom"] += int(rules.get("openai_degradation_penalty", 0))

    if shock_active and shock_variant.get("type") == "roll_modifiers":
        for mod in shock_variant.get("mods", []):
            team = mod.get("team")
            if team not in scenario_opts:
                continue
            options = mod.get("options", [])
            opt_name = scenario_opts[team]["base_name"]
            if "Any" in options or opt_name in options:
                roll_mods[team] = roll_mods.get(team, 0) + int(mod.get("delta", 0))

    # Prepare dice variables
    dice_vars = []
    for team in ["PearCom", "SoftCom", "OpenAIco"]:
        opt = scenario_opts[team]
        if "risk_table" in opt:
            dice_vars.append({
                "kind": "multiplier",
                "team": team,
                "table": opt["risk_table"],
                "mod": roll_mods.get(team, 0),
            })

    sil_opt = scenario_opts["Silicore"]
    if "yield_fail_rolls" in sil_opt:
        dice_vars.append({
            "kind": "yield",
            "team": "Silicore",
            "fail_rolls": set(sil_opt["yield_fail_rolls"]),
            "fail_capacity": float(sil_opt["yield_fail_capacity"]),
        })

    if not dice_vars:
        dice_rolls = [()]
    else:
        dice_rolls = itertools.product(range(1, 7), repeat=len(dice_vars))

    expected = defaultdict(float)
    min_profit = defaultdict(lambda: float("inf"))
    max_profit = defaultdict(lambda: float("-inf"))

    # Precompute demands and bids for spot market
    demand = {}
    for team in ["PearCom", "SoftCom"]:
        opt = scenario_opts[team]
        demand[team] = float(opt.get("chips_needed", 0))

    bid_values = {}
    for team in ["PearCom", "SoftCom"]:
        need = demand.get(team, 0)
        if need > 0:
            bid_values[team] = base_revenue_for(scenario_opts[team], round_idx) / need
        else:
            bid_values[team] = 0.0
    demand["_bid_values"] = bid_values

    for rolls in dice_rolls:
        prob = (1.0 / 6.0) ** len(dice_vars) if dice_vars else 1.0
        roll_map = {}
        for idx, var in enumerate(dice_vars):
            roll_map[idx] = rolls[idx]

        # Determine capacity
        capacity = float(rules.get("chip_capacity", 100))
        for idx, var in enumerate(dice_vars):
            if var["kind"] == "yield":
                roll = roll_map[idx]
                if roll in var["fail_rolls"]:
                    capacity = var["fail_capacity"]
        if shock_active and shock_variant.get("type") == "capacity_override":
            capacity = float(shock_variant.get("capacity", capacity))

        chips = allocate_chips(sil_opt, demand, capacity, spot_method, lock_in)

        # Base gross revenue
        gross = defaultdict(float)
        costs = {}

        for team, opt in scenario_opts.items():
            base_rev = base_revenue_for(opt, round_idx)
            costs[team] = float(opt.get("cost", 0))
            multiplier = 1.0
            for idx, var in enumerate(dice_vars):
                if var["kind"] == "multiplier" and var["team"] == team:
                    raw_roll = roll_map[idx] + int(var.get("mod", 0))
                    adj_roll = clamp_roll(raw_roll)
                    multiplier = dice_tables[var["table"]].get(adj_roll, 0.0)
                    break
            gross[team] = base_rev * multiplier

        # Handle CorpSolutions agnostic conditional revenue
        corp_opt = scenario_opts["CorpSolutions"]
        if corp_opt["base_name"] == "Agnostic":
            if scenario_opts["PearCom"]["base_name"] == "EnterprisePivot":
                gross["CorpSolutions"] = float(corp_opt["conditional_revenue"]["if_pearcom_pivot"])
            else:
                gross["CorpSolutions"] = base_revenue_for(corp_opt, round_idx)

        # Shock fines
        if shock_active and shock_variant.get("type") == "fines":
            fine = float(shock_variant.get("fine", 0))
            applies = shock_variant.get("applies_to", {})
            for team, opt in scenario_opts.items():
                if team in applies and opt["base_name"] in applies[team]:
                    costs[team] += fine

        # Dependencies
        corp_integrator_for_pear = (
            corp_opt["base_name"] == "Integrator" and corp_opt.get("target") == "PearCom"
        )
        corp_integrator_for_soft = (
            corp_opt["base_name"] == "Integrator" and corp_opt.get("target") == "SoftCom"
        )

        retailer_premium_for_soft = (
            amer_opt["base_name"] == "PremiumPartner" and amer_opt.get("target") == "SoftCom"
        )

        pear_opt = scenario_opts["PearCom"]
        soft_opt = scenario_opts["SoftCom"]
        openai_opt = scenario_opts["OpenAIco"]

        ai_access_for_pear = (
            soft_opt["base_name"] == "AIArmsDealer" or
            openai_opt["base_name"] in ["OpenModel", "HardwareIntegration"]
        )

        # Chip failure rule
        threshold = float(rules.get("chip_failure_threshold", 0.5))
        for team in ["PearCom", "SoftCom"]:
            need = float(scenario_opts[team].get("chips_needed", 0))
            if need > 0:
                got = chips.get(team, 0)
                if got < threshold * need:
                    gross[team] = 0.0

        # Apply hard dependencies
        if pear_opt["base_name"] == "EnterprisePivot":
            if not corp_integrator_for_pear or not ai_access_for_pear:
                gross["PearCom"] = 0.0

        if pear_opt["base_name"] == "PartnerSoftCom":
            if soft_opt["base_name"] != "AIArmsDealer":
                gross["PearCom"] = 0.0

        if soft_opt["base_name"] == "HardwareBlitz":
            if not retailer_premium_for_soft:
                gross["SoftCom"] = 0.0

        if soft_opt["base_name"] == "AIArmsDealer":
            if pear_opt["base_name"] not in ["EnterprisePivot", "PartnerSoftCom"]:
                gross["SoftCom"] = 0.0

        if openai_opt["base_name"] == "HardwareIntegration":
            if pear_opt["base_name"] != "EnterprisePivot":
                gross["OpenAIco"] = 0.0

        # CorpSolutions veto (via Migration Agent)
        if corp_opt["base_name"] == "MigrationAgent" and corp_opt.get("effects", {}).get("veto_target_enterprise"):
            target = corp_opt.get("target")
            victim = "SoftCom" if target == "PearCom" else "PearCom"
            if "enterprise" in scenario_opts[victim].get("tags", []):
                gross[victim] = 0.0

        # Revenue shares
        if amer_opt["base_name"] == "PremiumPartner":
            share_rate = amer_opt.get("effects", {}).get("share_of_target_gross", 0)
            target = amer_opt.get("target")
            share = gross[target] * share_rate
            gross[target] -= share
            gross["AmeriShop"] += share

        if corp_opt["base_name"] == "Integrator":
            share_rate = corp_opt.get("effects", {}).get("share_of_target_gross", 0)
            target = corp_opt.get("target")
            share = gross[target] * share_rate
            gross[target] -= share
            gross["CorpSolutions"] += share

        # Penalties
        if amer_opt["base_name"] == "PrivateLabel":
            penalty = amer_opt.get("effects", {}).get("penalty_to_target", 0)
            target = amer_opt.get("target")
            gross[target] -= penalty

        if corp_opt["base_name"] == "MigrationAgent":
            effects = corp_opt.get("effects", {})
            target = corp_opt.get("target")
            victim = "SoftCom" if target == "PearCom" else "PearCom"
            gross[victim] -= effects.get("penalty_to_other", 0)
            gross[target] -= effects.get("bounty_paid_by_target", 0)
            gross[target] += effects.get("bonus_to_target", 0)

        if soft_opt["base_name"] == "HardwareBlitz" and not corp_integrator_for_soft:
            gross["CorpSolutions"] -= float(rules.get("softcom_bundle_penalty", 0))

        if lock_in:
            gross["Silicore"] -= float(rules.get("lock_in_penalty_to_silicore", 0))

        # Costs -> profit
        profit = {}
        for team in scenario_opts.keys():
            profit[team] = gross[team] - costs.get(team, 0)

        # Partner split (PearCom + SoftCom)
        if pear_opt["base_name"] == "PartnerSoftCom":
            split = profit["PearCom"] / 2.0
            profit["PearCom"] = split
            profit["SoftCom"] += split

        for team, val in profit.items():
            expected[team] += prob * val
            min_profit[team] = min(min_profit[team], val)
            max_profit[team] = max(max_profit[team], val)

    return expected, min_profit, max_profit


def scenario_notes(scenario_opts):
    notes = []
    pear_opt = scenario_opts["PearCom"]["base_name"]
    soft_opt = scenario_opts["SoftCom"]["base_name"]
    corp_opt = scenario_opts["CorpSolutions"]
    amer_opt = scenario_opts["AmeriShop"]
    openai_opt = scenario_opts["OpenAIco"]["base_name"]

    corp_integrator_for_pear = (
        corp_opt["base_name"] == "Integrator" and corp_opt.get("target") == "PearCom"
    )
    corp_integrator_for_soft = (
        corp_opt["base_name"] == "Integrator" and corp_opt.get("target") == "SoftCom"
    )
    retailer_premium_for_soft = (
        amer_opt["base_name"] == "PremiumPartner" and amer_opt.get("target") == "SoftCom"
    )

    ai_access_for_pear = (
        soft_opt == "AIArmsDealer" or openai_opt in ["OpenModel", "HardwareIntegration"]
    )

    if pear_opt == "EnterprisePivot" and not corp_integrator_for_pear:
        notes.append("PearCom_NoCorpIntegrator")
    if pear_opt == "EnterprisePivot" and not ai_access_for_pear:
        notes.append("PearCom_NoAI")
    if pear_opt == "PartnerSoftCom" and soft_opt != "AIArmsDealer":
        notes.append("PearCom_NoSoftComDeal")

    if soft_opt == "HardwareBlitz" and not retailer_premium_for_soft:
        notes.append("SoftCom_NoRetailer")
    if soft_opt == "AIArmsDealer" and pear_opt not in ["EnterprisePivot", "PartnerSoftCom"]:
        notes.append("SoftCom_NoPearComBuyer")

    if openai_opt == "HardwareIntegration" and pear_opt != "EnterprisePivot":
        notes.append("OpenAIco_NoPearCom")

    if soft_opt == "HardwareBlitz" and not corp_integrator_for_soft:
        notes.append("CorpSolutions_BundlePenalty")

    return ";".join(notes) if notes else "OK"


def simulate(config):
    teams = list(config["teams"].keys())
    expanded_options = {}
    for team, team_data in config["teams"].items():
        expanded_options[team] = expand_options(team_data["options"])

    os.makedirs(OUT_DIR, exist_ok=True)

    spot_methods = config.get("runs", {}).get("spot_market_methods", ["proportional"])
    lock_in_modes = config.get("runs", {}).get("lock_in_modes", ["off"])
    shock_variants = config.get("runs", {}).get("shock_variants", ["none"])

    for spot_method in spot_methods:
        for lock_in_mode in lock_in_modes:
            lock_in = (lock_in_mode == "on")
            for shock_name in shock_variants:
                shock = None if shock_name == "none" else shock_name
                rows = []

                option_lists = [list(expanded_options[team].keys()) for team in teams]
                for combo in itertools.product(*option_lists):
                    scenario = dict(zip(teams, combo))
                    scenario_opts = {
                        team: expanded_options[team][opt_name]
                        for team, opt_name in scenario.items()
                    }

                    total_expected = defaultdict(float)
                    total_min = defaultdict(float)
                    total_max = defaultdict(float)
                    for round_idx in range(config["rounds"]):
                        exp, min_p, max_p = compute_round_expected(
                            scenario_opts, config, round_idx, spot_method, lock_in, shock
                        )
                        for team in teams:
                            total_expected[team] += exp.get(team, 0.0)
                            total_min[team] += min_p.get(team, 0.0)
                            total_max[team] += max_p.get(team, 0.0)

                    row = {
                        "spot_method": spot_method,
                        "lock_in": lock_in_mode,
                        "shock": shock_name,
                        "notes": scenario_notes(scenario_opts)
                    }
                    for team in teams:
                        row[f"{team}_option"] = scenario[team]
                        row[f"{team}_expected_profit"] = round(total_expected[team], 3)
                        row[f"{team}_min_profit"] = round(total_min[team], 3)
                        row[f"{team}_max_profit"] = round(total_max[team], 3)
                    rows.append(row)

                out_path = os.path.join(
                    OUT_DIR, f"scenarios_spot-{spot_method}_lockin-{lock_in_mode}_shock-{shock_name}.csv"
                )
                write_rows(out_path, rows)
                print(f"Wrote {len(rows)} scenarios to {out_path}")
                print_summary(rows, teams)


def write_rows(path, rows):
    if not rows:
        return
    fieldnames = list(rows[0].keys())
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def print_summary(rows, teams):
    print("Summary (expected profits):")
    for team in teams:
        vals = [row[f"{team}_expected_profit"] for row in rows]
        avg = sum(vals) / len(vals)
        neg = sum(1 for v in vals if v < 0)
        print(f"- {team}: avg={avg:.2f}, negative={neg}/{len(vals)}")
    print("---")


if __name__ == "__main__":
    simulate(load_config(CONFIG_PATH))
