# MGMT 339 — Course Timeline

Running log of decisions, findings, and meetings. Append new dated entries at the end. See `CLAUDE.md` in this folder.

## 2026-09-30 — status/ folder added by control tower

## 2026-10-07 — SPC tool updated to match Fall 26 quality lectures
Guide tab now opens with the "same four lines" recipe and uses this term's verified lecture data (coffee bags for X̄/R and p, SkyView drones for c); every chart draws CL, UCL, and LCL; D₄ (n = 5) corrected to 2.114. New Capability tab: garage analogy, interactive Cp/Cpk bell curve, and the 1.5σ drift explanation behind Six Sigma's 3.4 DPMO. Details and open items in `tools/spc/FALL26_NOTES.md`. Merged to `main` and deployed 2026-10-07.

## 2026-10-08 — SPC Playground rebuilt on real In-Class Exercise 2.2/2.3 data
Replaced the Playground tab's old generic espresso example with three real walkthroughs Sid provided: X̄/R (FreshRoast Coffee bag weights, n = 4 — matches the Guide tab's numbers), p (Hometown Bank wrong account numbers, n = 2,500) and c (Waverly Print Co. defects per run). Each module steps through raw data → statistic → center line → control limits → plot/interpret, and flags the specific out-of-control point in each dataset (X̄ Sample 3 low, p Week 7 high, c Day 6 high). All arithmetic re-derived and verified before publishing; build and UI checked in-browser. Editable/dynamic data entry was discussed and deferred as a future enhancement — this pass uses fixed real examples only. Details in `tools/spc/FALL26_NOTES.md`.


## 2026-10-12 — SunCrest Bakery VSM rebuilt as a step-through walkthrough
Replaced the static one-screen map with a 17-step walkthrough for the Fall 26 Lean class: the map builds layer by layer (customer → supplier → production control → schedules → process boxes → data boxes → inventory → timeline) with a side panel that explains each piece, shows the calculation, and flags what to look for. Covers daily demand (480), takt (56.25 s), WIP → days, lead time, processing time, PCE, the "$500K oven" diagnosis, an illustrative future state with kaizen bursts (3 days), and a self-check. Fixed the numbers to match the In-N-Out walkthrough: WIP piles 840 / 1,200 / 600 / 960 → 11.5-day lead time, 123 s processing, PCE ≈ 0.04% (old map said 9.5 days and 0.05%, and 675 ÷ 480 was rounded wrong). Arithmetic verified; checked in-browser at desktop and phone widths.

## 2026-10-12 — In-N-Out VSM and Kanban walkthroughs rebuilt as click-through slides
Both pages now run one slide at a time, like a deck: → / Space / clicker reveals the next point, then moves on; ← steps back. Shared engine and styles in `tools/vsm/deck.js` and `deck.css` (plain, large type for projecting). In-N-Out (10 slides): cycle time → lead time → WIP (13.3% / 86.7%) → traditional vs. lean manager → three VSM layers, with SunCrest numbers (11.5 days / 123 s), handing off to the SunCrest walkthrough. Kanban (9 slides): push vs. pull, the Baking ↔ Packaging loop, the two-person sticky-note demo, single- vs. two-card, the formula, the coffee-cup totes (k = 3.3 → 4), what-if table (r = 0.1 → 3; α = 0 → 3; d = 1,000 → 7). Math verified.
