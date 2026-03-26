# Exam 2 — Build Notes
**MGMT 339 · Spring 2026**

---

## Overview

| Item | Detail |
|---|---|
| Total questions | 25 (Q1–Q25) |
| Total points | 100 (20% of final grade) |
| Time limit | 75 minutes |
| Cheat sheet | 1 page (A4/Letter, front & back) |
| Delivery | Canvas — online, no LockDown Browser |

**Structure:**
- Q1–Q10: Conceptual (Multiple Choice / True-False / Matching), 3 pts each = 30 pts
- Q11–Q24: Quantitative (varying pts) = 67 pts
- Q25: Short Essay (TQM / Lean / TOC), 3 pts

---

## Question Map

| Q | Topic | Type | Pts | Answer |
|---|---|---|---|---|
| 1 | Process Design — Service diagonal | MC | 3 | B |
| 2 | Automation — Fixed vs. variable demand | MC | 3 | B |
| 3 | Diseconomies of scale | MC | 3 | B |
| 4 | c-chart vs. p-chart | MC | 3 | C |
| 5 | 7 Wastes matching | Matching | 3 | Defects=1, Inventory=2, Motion=3, Waiting=4 |
| 6 | TOC 5 steps (True/False) | MC | 3 | B (False) |
| 7 | TOC — CM per bottleneck minute | MC | 3 | B |
| 8 | DBR — Rope | MC | 3 | D |
| 9 | Capacity strategy — Follow the leader | MC | 3 | B |
| 10 | Control charts — below LCL | MC | 3 | B |
| 11 | Pareto — VeloShip (Select All That Apply) | SATA | 3 | A, B, C |
| 12 | Fishbone — Smith, Schroeder & Torn | Matching | 3 | 1=Manpower, 2=Machinery, 3=Material, 4=Methods |
| 13 | NeoZapato LP + MFP (combined, 2 parts) | MC | 4 | LP=B(LA), MFP=A(Tijuana) |
| 14 | TechAssemble X̄/R chart limits | MC | 4 | A (UCL=10.588, LCL=10.092) |
| 15 | TQM / Lean / TOC — Short Essay | Essay | 3 | Rubric: 1 pt per framework |
| 16 | Precision Parts — Process Capability matching | Matching | 6 | 1=1.11, 2=0.74, 3=0.050mm |
| 17 | TechAssemble p-chart (n=150, Shift 6 OOC) | MC | 4 | B (UCL=0.088, Shift 6 OOC) |
| 18 | Riverside Medical — Takt / PT / Lead Time | MC | 4 | B (Takt=15, PT=29, LT=1.40 days) |
| 19 | SunCrest Bakery VSM (3 parts) | MC | 6 | a=C(123s), b=B(9.5d), c=B(0.05%) |
| 20 | VeloShip Kanban (c=24, answer=7) | MC | 4 | C (7 containers) |
| 21 | YPI TOC Bottleneck | MC | 6 | B (W, 2,436 min) |
| 22 | Ridgeline TOC Product Mix | MC | 6 | A (Bookshelf=80, Table=79, Cabinet=52) |
| 23 | PeakForm Capacity (3 machines) | MC | 5 | B |
| 24 | Clearwater Line Balancing Metrics | MC | 5 | B (c=80, TM=3, Eff=87.5%) |
| 25 | ClearFlow Line Balancing Assignment (shortest task) | MC | 7 | A (S1={A,H,I}, S2={B}, S3={E,C,D}, S4={G,J}, S5={F,K}) |

---

## Key Files

| File | Purpose |
|---|---|
| `Build/MGMT_339_-_Exam_2_v2.md` | Final exam source (Markdown → PDF via pandoc) |
| `Build/MGMT_339_-_Exam_2_v2.pdf` | Printed/review PDF |
| `Build/MGMT_339_-_Exam_2_Answer_Key.md` | Answer key with distractor trap notes |
| `Build/canvas_exam_header.html` | Formula reference — paste into Canvas quiz header |
| `Build/images/fishbone.png` | Q12 — fishbone diagram |
| `Build/images/suncrest-vsm.png` | Q19 — SunCrest Bakery VSM screenshot |
| `Build/images/yp-bottleneck.png` | Q21 — YPI routing/workstation data |
| `MGMT_339_-_Exam_2_Formula_Sheet.md` | Standalone formula sheet (separate PDF) |

---

## Canvas Setup Notes

- Formula reference lives in the **quiz description / header** as raw HTML (`canvas_exam_header.html`)
- Questions entered directly in Canvas; answer choices match the exam PDF exactly
- Q13 (NeoZapato): two fill-in dropdown sub-questions within one Canvas question
- Q11 (Pareto): "Select All That Apply" — Canvas multiple-answer type, no partial credit
- Q12, Q16 (Matching): Canvas matching question type; options are numbered 1–4 or listed values
- Q15 (Essay): Canvas essay/text-entry type, manually graded
- Images attached directly in Canvas question body (not embedded in PDF for Canvas version)

---

## PDF Export Command

```bash
cd "exam/Spring 26/Exam 2/Build"
pandoc MGMT_339_-_Exam_2_v2.md -o MGMT_339_-_Exam_2_v2.pdf \
  --pdf-engine=xelatex -V mainfont="Helvetica" -V geometry:margin=1in --resource-path=.
```

**Known rendering quirks (Helvetica/pandoc):**
- Strip `$` from table cell values — put dollar sign in column header only (e.g. `($)`)
- `→` arrows don't render — suppress the warning, cosmetic only
- Unicode subscripts like `ₙ` don't render — use plain text in tables

---

## Lessons for Exam 3

- **Start the question map early** — track Q number, topic, type, pts, and answer from day one
- **Keep Canvas and the MD file in sync** — point values and question order drift if you edit one without the other
- **Formula sheet = Canvas header HTML** — maintain `canvas_exam_header.html` as the source of truth; the MD formula block mirrors it
- **Images**: create/screenshot figures before building questions that reference them; attach in Canvas separately from the PDF
- **Table formatting**: avoid `$` in markdown table cells (LaTeX math mode bug); strip to numbers and label the column header with `($)`
- **Point totals**: verify Quant + Conceptual + Essay = 100 before finalizing
- **Question numbering**: if you merge or split questions, renumber bottom-up to avoid clobbering edits
