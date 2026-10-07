# SPC tool — Fall 2026 update notes

Read this before working on `tools/spc/`. It records what changed on 2026-10-07 and what is still open.

## Why these changes

The SPC tool was updated to match how quality and SPC were taught in Fall 2026 (Week 7, Oct 5 and 7). Students get the same examples, numbers, and framing on the site as in the lecture slides, so they can study from either.

## What changed (branch `fall26-spc-guide`)

### `src/ProcessChartsGuide_v2.tsx` (📚 Guide tab)
- **New "Every Control Chart: Same Four Lines" section** at the top. Two tables (the four lines; each chart's data type, what you plot, and its limits), a 5-step recipe, and the constants for n = 4 and n = 5. This is the organizing idea of the lecture: every chart is CL ± 3 × spread; only the statistic and the spread change.
- **All examples now use this term's lecture data** (every number was verified in Python):
  - X̄ / R: coffee bags, 5 samples of n = 4 (In-Class Exercise 2.2, Q1). X̿ = 498.86, R̄ = 6.284, A₂ = 0.729, X̄ limits 494.28 to 503.44, **Sample 3 (493.63) below LCL**. R limits 0 to 14.34, all in control.
  - p: the same coffee bags as pass/fail (under 495 g), 5 samples of n = 100: 4, 3, 2, 12, 4. p̄ = 0.05, UCL = 0.115, LCL = 0. **Sample 4 (0.12) above UCL.**
  - c: SkyView Drones, defects on 8 drones: 3, 5, 2, 6, 4, 3, 5, 4. c̄ = 4, UCL = 10, LCL = 0. All in control ("in control means predictable, not good" leads into capability).
- **One chart renderer** (`chartConfig` + `renderChart`) draws the same four lines for every chart: data, CL (gray), UCL and LCL (red dashed). Previously R, p, and c showed no CL and some had no LCL.
- **Fixed:** D₄ for n = 5 was 2.115; it is **2.114**.
- Narrative text ("The Story", "Why This Chart?", "Real-World Impact") was left as it was.

### `src/Capability.tsx` (new 📐 Capability tab)
- Voice of the process (control limits) vs. voice of the customer (spec limits).
- **Garage analogy:** spec limits are the garage walls; the 6σ process spread is the car. Cp asks "does the car fit?" Cpk asks "is it parked in the middle?"
- Cp and Cpk formulas with 3-step Cpk procedure. Bolt example for Cp (20–30 mm, 6σ = 9 → 1.11).
- **Interactive bell curve (SVG):** coffee line, specs 0.95 to 1.05 lb. Sliders for mean and σ. Out-of-spec tails shade orange. Shows the Cp/Cpk arithmetic live, a verdict, and a diagnosis (re-center vs. reduce variation). Lecture values: X̄ = 1.00, σ = 0.015 → Cp = Cpk = 1.11; X̄ = 1.03 → Cpk = 0.44.
- Interpretation tables (Cpk → meaning → sigma level; Cp/Cpk → diagnosis → fix).
- **Six Sigma 1.5σ drift explanation** with a table showing DPMO both centered and with drift. (The old lecture slide mixed the two; the drift column is where 3.4 per million comes from.)

### `src/App.tsx`
- Added the 📐 Capability tab between Guide and Playground.

## Not changed / still open
- **`src/Playground.tsx`** was not touched. It still uses its own n = 5 espresso-style example. A future pass could switch it to the coffee-bag data and add c-chart and capability walkthroughs.
- `src/ProcessChartsGuide.tsx` (v1) is unused; `App.tsx` imports `_v2`. It can be deleted.
- **Planned next (Sid asked for these):** step-by-step guides for In-Class Exercise 2.2 (X̄/R in Excel: coffee bags, candy bags n = 8, TechAssemble) and 2.3 (p chart Hometown Bank, c chart Waverly Print, Cp/Cpk). Answer keys are in the Fall 2026 lecture notes in Sid's vault; verify every number before publishing.
- The bundle is >500 kB (Recharts). Vite warns; it is not an error.

## Course conventions that matter here
- Recurring fictional companies: SkyView Drones, FreshRoast Coffee, Waverly Print Co., TechAssemble, VeloShip Fulfillment (Assignment 2.1, Fall 2026).
- Teaching order this term: X̄ + R together → reading charts → attributes (p before c) → same-four-lines recipe → capability (Cp, then Cpk).
- Anchor lines used in class: "Same four lines every time. Only the recipe changes." / "Control limits are what your process does. Spec limits are what you promised." / "Cp asks if the car fits. Cpk asks if you parked it right."
- Verify all arithmetic before shipping (round numbers, no stale constants).
