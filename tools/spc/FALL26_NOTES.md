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

## What changed (2026-10-08, on `main`)

### `src/Playground.tsx` (🎮 Playground tab)
- Replaced the old generic n = 5 espresso example with three real In-Class Exercise 2.2/2.3 walkthroughs, each its own module in the chart-type selector:
  - **X̄ & R — FreshRoast Coffee** bag weights, 5 samples of n = 4. Same data and constants as the Guide tab (X̿ = 498.86, R̄ = 6.284, A₂ = 0.729, D₃ = 0, D₄ = 2.282). Both charts render side by side once ranges are calculated; **Sample 3 (493.63) is below the X̄ LCL (494.28)** — flagged out of control. R chart is all in control.
  - **p — Hometown Bank** wrong account numbers, n = 2,500 deposits/week, 12 weeks. p̄ = 0.0049, UCL = 0.0091, LCL = 0.0007 (not forced to 0 — stays positive at this n). **Week 7 (0.0096) is above UCL** — flagged out of control.
  - **c — Waverly Print Co.** printing defects per 500-page run, 10 days. c̄ = 16.0, UCL = 28, LCL = 4. **Day 6 (29) is above UCL** — flagged out of control.
- Each module keeps the same step-through pattern (raw data → per-sample stat → center line → control limits → plot/interpret), with a status column that flags the specific out-of-control point and why.
- All arithmetic re-derived and verified by hand before publishing (not just transcribed from the source worksheets).

## Not changed / still open
- **Editable data points in Playground**: Sid asked about letting users edit the default dataset interactively (not just step through a fixed example). Flagged as "might be harder" — deferred. If picked up, scope it as an optional edit mode on top of the existing fixed walkthroughs, not a replacement for them.
- `src/ProcessChartsGuide.tsx` (v1) is unused; `App.tsx` imports `_v2`. It can be deleted.
- Capability (Cp/Cpk) walkthrough for Exercise 2.3 is still just the Capability tab's bolt/coffee-line examples — no step-through tied to the Waverly/Hometown Bank data yet.
- The bundle is >500 kB (Recharts). Vite warns; it is not an error.

## Course conventions that matter here
- Recurring fictional companies: SkyView Drones, FreshRoast Coffee, Waverly Print Co., TechAssemble, VeloShip Fulfillment (Assignment 2.1, Fall 2026).
- Teaching order this term: X̄ + R together → reading charts → attributes (p before c) → same-four-lines recipe → capability (Cp, then Cpk).
- Anchor lines used in class: "Same four lines every time. Only the recipe changes." / "Control limits are what your process does. Spec limits are what you promised." / "Cp asks if the car fits. Cpk asks if you parked it right."
- Verify all arithmetic before shipping (round numbers, no stale constants).
