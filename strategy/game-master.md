# Game Master Guide (from sim_config.json)

All amounts are in **$B per round**. CSV outputs show **3-round totals** (sum of expected values across rounds). Dice are rolled **each round** for any option with a risk table.

**Global Rules**
- Dice tables: Standard `1=0x, 2-3=0.5x, 4-5=1.0x, 6=1.5x`. OpenModel `1=0x, 2-3=0.5x, 4-6=1.0x`. HW Integration `1-3=0x, 4-6=1.0x`.
- Chip failure rule: If a manufacturer receives **<50%** of required chips, their revenue is **$0** for that round.
- AmeriShop Algorithm: Private Label gives target `-1` to its die roll; Premium Partner gives target `+1` to its die roll.
- OpenAIco Degradation: If OpenAIco is **not** SoftComExclusive, SoftCom’s die roll gets **-2 in Round 2**.
- CorpSolutions Veto: Migration Agent zeros the **opposing manufacturer’s enterprise-tagged strategy** in that round.
- SoftCom Bundle: If SoftCom chooses Hardware Blitz and CorpSolutions is **not** Integrator_SoftCom, CorpSolutions suffers **-3B** that round.
- Lock-In (optional run mode): If on, SoftCom gets **0 chips** and Silicore loses **$2B** revenue that round.

**Dice and Yield Rolls**
- Risky strategies roll a d6 each round and apply a revenue multiplier.
- Silicore Split Fab rolls for **yield**: on rolls `1-3`, total chip capacity drops to **60 units** for that round.

**Round 2 Shock (GM Roll)**
- After Round 1 strategies are revealed, the GM rolls a d6:
  - `1-2`: Shock A (Supply Chain Fracture)
  - `3-4`: Shock B (Deepfake Scandal)
  - `5-6`: Shock C (Antitrust Decree)
- The shock applies **only in Round 2** in the simulator (strategies remain fixed across rounds in the output files).

**Shock A: Supply Chain Fracture (Round 2)**
- Silicore capacity is forced to **60 units** for that round.
- Starvation rule still applies (<50% chips → $0 revenue).

**Shock B: Deepfake Scandal (Round 2)**
- Roll modifiers:
  - `-2` to: SoftCom HardwareBlitz, PearCom EnterprisePivot, **all OpenAIco options**
  - `+1` to: PearCom Fortress, Silicore PearComExclusive
- Note: If an option has no die roll, a modifier has no effect in the current simulator.

**Shock C: Antitrust Decree (Round 2)**
- **$3B fine** to any team using these options:
  - Silicore PearComExclusive
  - OpenAIco SoftComExclusive
  - AmeriShop PremiumPartner_*
  - CorpSolutions Integrator_*

## PearCom

| Option | Gross Revenue | Upfront Cost | Base Net | Chips Needed | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- | --- |
| Fortress | 12 | 3 | 9 | 90 | None | Chips must be >=45 to avoid failure. |
| EnterprisePivot | 22 | 5 | 17 | 30 | Standard | Requires CorpSolutions Integrator_PearCom **and** AI access (SoftCom AIArmsDealer or OpenAIco OpenModel/HardwareIntegration). Chips must be >=15. Enterprise-tagged. |
| PartnerSoftCom | 8 | 1 | 7 | 0 | None | Requires SoftCom AIArmsDealer. Net profit split 50/50 with SoftCom. |

## SoftCom

| Option | Gross Revenue | Upfront Cost | Base Net | Chips Needed | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- | --- |
| HardwareBlitz | 25 | 8 | 17 | 40 | Standard | Requires AmeriShop PremiumPartner_SoftCom. Chips must be >=20. Enterprise-tagged. |
| AIArmsDealer | 10 | 2 | 8 | 0 | Standard | Requires PearCom EnterprisePivot **or** PartnerSoftCom. |
| StaySoftware | 6 → 5 → 4 | 0 | 6 → 5 → 4 | 0 | None | Declines by 1 per round. |

## Silicore

| Option | Gross Revenue | Upfront Cost | Base Net | Allocation | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- | --- |
| PearComExclusive | 10 | 2 | 8 | 90 Pear / 10 Soft | None | Fixed allocation. |
| SplitFab | 15 | 3 | 12 | 50 Pear / 50 Soft | Yield Roll | On yield fail (roll 1-3), capacity drops to 60 total. |
| SpotMarket | 8 | 0 | 8 | Auction | None | Allocation uses either proportional or highest-bidder method. |

## OpenAIco

| Option | Gross Revenue | Upfront Cost | Base Net | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- |
| SoftComExclusive | 4 → 3 → 2 | 0 | 4 → 3 → 2 | None | Revenue declines each round. |
| OpenModel | 12 | 2 | 10 | OpenModel | Uses OpenModel dice table. |
| HardwareIntegration | 20 | 4 | 16 | HW Integration | Requires PearCom EnterprisePivot. |

## AmeriShop

| Option | Gross Revenue | Upfront Cost | Base Net | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- |
| OpenMarket | 4 | 0 | 4 | None | Baseline option. |
| PrivateLabel_PearCom / PrivateLabel_SoftCom | 8 | 2 | 6 | None | Target suffers -3B gross and -1 die roll. |
| PremiumPartner_PearCom / PremiumPartner_SoftCom | 2 + 25% of target gross | 1 | Varies | None | Target gross is reduced by 25%. Target gets +1 die roll. HardwareBlitz requires PremiumPartner_SoftCom. |

## CorpSolutions

| Option | Gross Revenue | Upfront Cost | Base Net | Die | Dependencies / Effects |
| --- | --- | --- | --- | --- | --- |
| Agnostic | 3 (or 5 if PearCom EnterprisePivot) | 0 | 3 (or 5) | None | Conditional revenue boost if PearCom pivots. |
| MigrationAgent_PearCom / MigrationAgent_SoftCom | 6 | 0 | 6 | None | Other manufacturer loses -5B. Target pays -6B bounty. Veto opposing enterprise-tagged strategy. |
| Integrator_PearCom / Integrator_SoftCom | 25% of target gross | 1 | Varies | None | Target gross reduced by 25%. Grants enterprise access to target. |

# Example Scenarios (from output)

These are 3-round totals from `strategy/out/scenarios_spot-highest_bidder_lockin-off.csv`.

| Scenario | Options | Notes | Expected Profits (3 rounds) |
| --- | --- | --- | --- |
| All dependencies satisfied | PearCom EnterprisePivot; SoftCom AIArmsDealer; Silicore PearComExclusive; OpenAIco SoftComExclusive; AmeriShop OpenMarket; CorpSolutions Integrator_PearCom | OK | PearCom 22.125, SoftCom 16.5, Silicore 24.0, OpenAIco 9.0, AmeriShop 12.0, CorpSolutions 9.375 |
| SoftCom Blitz with retailer | PearCom Fortress; SoftCom HardwareBlitz; Silicore SplitFab; OpenAIco SoftComExclusive; AmeriShop PremiumPartner_SoftCom; CorpSolutions Agnostic | CorpSolutions_BundlePenalty | PearCom 9.0, SoftCom 32.25, Silicore 36.0, OpenAIco 9.0, AmeriShop 21.75, CorpSolutions 0.0 |
| Dependency failure | PearCom EnterprisePivot; SoftCom HardwareBlitz; Silicore PearComExclusive; OpenAIco SoftComExclusive; AmeriShop OpenMarket; CorpSolutions Agnostic | PearCom_NoCorpIntegrator;PearCom_NoAI;SoftCom_NoRetailer;CorpSolutions_BundlePenalty | PearCom -15.0, SoftCom -24.0, Silicore 24.0, OpenAIco 9.0, AmeriShop 12.0, CorpSolutions 6.0 |
