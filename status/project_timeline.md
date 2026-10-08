# MGMT 339 — Course Timeline

Running log of decisions, findings, and meetings. Append new dated entries at the end. See `CLAUDE.md` in this folder.

## 2026-09-30 — status/ folder added by control tower

## 2026-10-07 — SPC tool updated to match Fall 26 quality lectures
Guide tab now opens with the "same four lines" recipe and uses this term's verified lecture data (coffee bags for X̄/R and p, SkyView drones for c); every chart draws CL, UCL, and LCL; D₄ (n = 5) corrected to 2.114. New Capability tab: garage analogy, interactive Cp/Cpk bell curve, and the 1.5σ drift explanation behind Six Sigma's 3.4 DPMO. Details and open items in `tools/spc/FALL26_NOTES.md`. Merged to `main` and deployed 2026-10-07.

## 2026-10-08 — SPC Playground rebuilt on real In-Class Exercise 2.2/2.3 data
Replaced the Playground tab's old generic espresso example with three real walkthroughs Sid provided: X̄/R (FreshRoast Coffee bag weights, n = 4 — matches the Guide tab's numbers), p (Hometown Bank wrong account numbers, n = 2,500) and c (Waverly Print Co. defects per run). Each module steps through raw data → statistic → center line → control limits → plot/interpret, and flags the specific out-of-control point in each dataset (X̄ Sample 3 low, p Week 7 high, c Day 6 high). All arithmetic re-derived and verified before publishing; build and UI checked in-browser. Editable/dynamic data entry was discussed and deferred as a future enhancement — this pass uses fixed real examples only. Details in `tools/spc/FALL26_NOTES.md`.

