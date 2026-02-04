import pandas as pd
import itertools

# --- GAME CONFIGURATION ---

# Risk Multiplier (Expected Value of a d6 roll)
# Roll 1 (0x), 2-3 (0.5x), 4-5 (1.0x), 6 (1.5x) -> Avg is 0.75
RISK_MULTIPLIER = 0.75

# Strategies Definition
# Format: 'Name': {'Cost': X, 'BaseRev': Y, 'ChipsNeeded': Z, 'Risk': True/False}

pearcom_strats = {
    '1_Fortress':   {'Cost': 3, 'Rev': 12, 'Chips': 90, 'Risk': False},
    '2_Ent_Pivot':  {'Cost': 5, 'Rev': 22, 'Chips': 30, 'Risk': True}, # Needs CorpSolutions
    '3_Partner':    {'Cost': 1, 'Rev': 8,  'Chips': 0,  'Risk': False}
}

softcom_strats = {
    '1_HW_Blitz':   {'Cost': 8, 'Rev': 25, 'Chips': 40, 'Risk': True}, # Needs AmeriShop
    '2_AI_Arms':    {'Cost': 2, 'Rev': 10, 'Chips': 0,  'Risk': True},
    '3_Software':   {'Cost': 0, 'Rev': 6,  'Chips': 0,  'Risk': False}
}

silicore_strats = {
    '1_Exclusive':  {'Cost': 2, 'Rev': 10, 'Alloc': {'Pear': 90, 'Soft': 10}, 'Risk': False},
    '2_Split_Fab':  {'Cost': 3, 'Rev': 15, 'Alloc': {'Pear': 50, 'Soft': 50}, 'Risk': True},
    '3_Spot_Mkt':   {'Cost': 0, 'Rev': 8,  'Alloc': {'Pear': 0,  'Soft': 0},  'Risk': False} # 0 guaranteed
}

# Retailers (Simplified for the loop: Neutral vs Partner)
amerishop_strats = ['Neutral', 'Partner_Pear', 'Partner_Soft', 'Private_Label']
corpsol_strats   = ['Neutral', 'Partner_Pear', 'Partner_Soft', 'Migration_Attack']

# --- SIMULATION LOOP ---

results = []

# Iterate through core "Game States" (Giants + Silicore)
for p_name, p_data in pearcom_strats.items():
    for s_name, s_data in softcom_strats.items():
        for sil_name, sil_data in silicore_strats.items():
            
            # --- 1. CALCULATE CHIP SUPPLY ---
            # Does PearCom get what they need?
            p_chips_got = sil_data['Alloc']['Pear']
            # If Spot Market, assume they can buy IF no one else has exclusivity
            if sil_name == '3_Spot_Mkt': p_chips_got = 50 
            
            p_supply_penalty = 1.0
            if p_data['Chips'] > p_chips_got:
                p_supply_penalty = 0.0 # Supply Chain Failure!
            
            # Does SoftCom get what they need?
            s_chips_got = sil_data['Alloc']['Soft']
            if sil_name == '3_Spot_Mkt': s_chips_got = 50
            
            s_supply_penalty = 1.0
            if s_data['Chips'] > s_chips_got:
                s_supply_penalty = 0.0 # Supply Chain Failure!

            # --- 2. CALCULATE BASE PAYOFFS ---
            
            # PearCom Payoff
            p_mult = RISK_MULTIPLIER if p_data['Risk'] else 1.0
            p_profit = (p_data['Rev'] * p_mult * p_supply_penalty) - p_data['Cost']
            
            # SoftCom Payoff
            s_mult = RISK_MULTIPLIER if s_data['Risk'] else 1.0
            s_profit = (s_data['Rev'] * s_mult * s_supply_penalty) - s_data['Cost']
            
            # Silicore Payoff
            sil_mult = RISK_MULTIPLIER if sil_data['Risk'] else 1.0
            sil_profit = (sil_data['Rev'] * sil_mult) - sil_data['Cost']

            # --- 3. CHECK FOR BROKEN SCENARIOS ---
            outcome_note = "OK"
            if p_supply_penalty == 0: outcome_note = "PearCom Starved"
            if s_supply_penalty == 0: outcome_note = "SoftCom Starved"
            if p_supply_penalty == 0 and s_supply_penalty == 0: outcome_note = "GLOBAL SHORTAGE"
            
            # Store Result
            results.append({
                'Pear_Strat': p_name,
                'Soft_Strat': s_name,
                'Sil_Strat': sil_name,
                'Pear_Profit': round(p_profit, 1),
                'Soft_Profit': round(s_profit, 1),
                'Sil_Profit': round(sil_profit, 1),
                'Note': outcome_note
            })

# Convert to DataFrame
df = pd.DataFrame(results)

# --- ANALYSIS PRINT ---

print("--- SCENARIO ANALYSIS (Top 5 for PearCom) ---")
print(df.sort_values(by='Pear_Profit', ascending=False).head(5)[['Pear_Strat', 'Sil_Strat', 'Pear_Profit', 'Note']].to_string(index=False))

print("\n--- SCENARIO ANALYSIS (Top 5 for SoftCom) ---")
print(df.sort_values(by='Soft_Profit', ascending=False).head(5)[['Soft_Strat', 'Sil_Strat', 'Soft_Profit', 'Note']].to_string(index=False))

print("\n--- CRITICAL FAILURE CHECK (Scenarios where Giants lose money) ---")
failures = df[(df['Pear_Profit'] < 0) | (df['Soft_Profit'] < 0)]
print(f"Total Failed Scenarios: {len(failures)}")
print(failures.head(3)[['Pear_Strat', 'Soft_Strat', 'Sil_Strat', 'Note']].to_string(index=False))