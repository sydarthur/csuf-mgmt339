# MGMT 339 — Exam 2 · Answer Key & Gap Review

---

## Point Totals

| Q | Topic | Pts |
|---|---|---|
| Q11 | Pareto | 3 |
| Q12 | Fishbone | 3 |
| Q13 | Labor Productivity + MFP (combined) | 4 |
| Q14 | X̄/R Chart | 4 |
| Q15 | TQM / Lean / TOC Essay | 3 |
| Q16 | Process Capability | 6 |
| Q17 | p-Chart | 4 |
| Q18 | Lean Metrics (Riverside) | 4 |
| Q19 | VSM Analysis (3 parts) | 6 |
| Q20 | Kanban | 4 |
| Q21 | TOC Bottleneck | 6 |
| Q22 | TOC Product Mix | 6 |
| Q23 | Capacity | 5 |
| Q24 | Line Balancing Metrics | 5 |
| Q25 | Line Balancing Assignment | 7 |
| **Quant subtotal** | | **70 pts** |
| **Conceptual (Q1–Q10)** | 10 × 3 pts | **30 pts** |
| **Total** | | **100 pts** |

---

## Images to Attach to Exam

| # | Question | Image Needed | Status |
|---|---|---|---|
| 1 | **Q12** | Fishbone diagram — Smith, Schroeder & Torn (4 bones: Material, Machinery, Methods, Manpower) | images/fishbone.png ✓ |
| 2 | **Q18** | VSM Figure B — SunCrest Bakery (`vsm-suncrest-bakery.html` screenshot) | images/suncrest-vsm.png ✓ |
| 3 | **Q20** | YPI routing/processing figures | images/yp-bottleneck.png ✓ |
| 4 | **Q24** | No diagram needed — table fully specifies predecessors | N/A |

## Remaining Notes

| Item | Status |
|---|---|
| Q6 True/False format | Intentional — fine to keep |
| Total points = 100 ✓ | Quant 70 + Conceptual 30 |

---

## Answer Key

### Conceptual (Q1–Q10)

| Q | Answer | Rationale |
|---|---|---|
| 1 | **B** | Strategic diagonal — imposing low-divergence structure on a high-customization process |
| 2 | **B** | Fixed automation needs high, stable volume; variable demand kills the justification |
| 3 | **B** | Diseconomies of scale: coordination cost and inefficiency outweigh size benefits |
| 4 | **C** | c-chart — counting defects per single unit (multiple defects possible on one unit) |
| 5 | 1=Defects, 2=Inventory, 3=Motion, 4=Waiting | Rejected loaves=Defects; WIP staging=Inventory; walking=Motion; idle packaging=Waiting |
| 6 | **B** (False) | Marcus describes Steps 1–4 but omits Step 5: return to Step 1 (continuous loop) |
| 7 | **B** | Margin per unit of scarce resource is what matters when constrained, not per unit of product |
| 8 | **D** (Rope) | Rope syncs materials release to the drum (bottleneck) pace |
| 9 | **B** | Follow the leader — matching rivals' expansion without independent demand justification |
| 10 | **B** | Any point outside either limit signals assignable cause; below LCL still requires investigation |

---

### Quantitative (Q11–Q25)

**Q11 — Pareto Analysis** · 3 pts · **Answer: A, B, C**

Wrong item (48) + Late delivery (35) + Damaged packaging (22) = 105/120 = **87.5%**, crossing the 80% threshold.

---

**Q12 — Fishbone Matching** · 3 pts

| # | Cause | Answer |
|---|---|---|
| 1 | New employee doesn't know how to pack | **1 — Manpower** |
| 2 | Moving dolly has a broken wheel | **2 — Machinery** |
| 3 | Multiple deliveries scheduled on one trip | **4 — Methods** |
| 4 | No packing tape available | **3 — Material** |

---

**Q13 — Labor Productivity + MFP (combined)** · 4 pts · **Part 1: B · Part 2: A**

- LP: Tijuana 1,600/320 = **5.00 units/hr** · LA 2,100/350 = **6.00 units/hr** → **B (LA)**
- Labor cost: Tijuana 320×$12 = $3,840 · LA 350×$45 = $15,750
- MFP: Tijuana $64,000/($3,840+$2,800+$1,200) = $64,000/$7,840 = **8.16** · LA $84,000/$23,950 = **3.51** → **A (Tijuana)**

---

**Q14 — X̄/R Chart Limits** · 4 pts · **Answer: A**

| Shift | x̄ | R |
|---|---|---|
| 1 | 10.350 | 0.3 |
| 2 | 10.100 | 0.5 |
| 3 | 10.550 | 0.3 |
| 4 | 10.250 | 0.3 |
| 5 | 10.450 | 0.3 |

$\bar{\bar{X}}$ = 51.70/5 = **10.340** · $\bar{R}$ = 1.70/5 = **0.340**

UCL = 10.340 + 0.729 × 0.340 = **10.588** · LCL = 10.340 − 0.248 = **10.092**

---

**Q15 — TQM / Lean / TOC Essay** · 3 pts · **Rubric: 1 pt per framework (accurate + distinct)**

- **TQM** prioritizes quality through organization-wide commitment and continuous improvement; it directs effort toward reducing defects and variation at every process and person in the system.
- **Lean** prioritizes eliminating waste; it directs improvement effort toward any activity that consumes resources without adding customer value — excess inventory, waiting, unnecessary motion, etc.
- **TOC** prioritizes throughput by identifying and exploiting the single binding constraint; it directs all improvement effort toward the bottleneck, leaving non-constraints deliberately subordinated.

---

**Q16 — Process Capability** · 6 pts · **Answer: 1=1.11, 2=0.74, 3=0.050 mm**

USL = 105.8, LSL = 105.2, μ = 105.6, σ = 0.09

$C_p$ = (105.8 − 105.2) / (6 × 0.09) = 0.60 / 0.54 = **1.11**

$C_{pk}$ = min( (105.8−105.6)/0.27, (105.6−105.2)/0.27 ) = min(0.74, 1.48) = **0.74**

Process is off-center toward USL — the tighter margin is only 0.2 mm on the upper side.

Max σ for 4σ (Cpk = 1.33, binding side = upper): σ = 0.2 / (3 × 1.33) = **0.050 mm**

Distractor traps:
- **1.48** → Cpk using the wrong (larger) side
- **0.075 mm** → max σ ignoring off-centering: (USL−LSL)/(6×1.33) = 0.6/7.98 (assumes centered process)
- **2.22** → Cp using 3σ instead of 6σ in denominator

---

**Q17 — p-Chart** · 4 pts · **Answer: B**

n = 150, k = 10 shifts · Total defectives = 5+3+8+2+6+16+4+2+7+7 = 60

$\bar{p}$ = 60 / (10 × 150) = 60 / 1,500 = **0.040**

$\sigma_p$ = √(0.040 × 0.960 / 150) = √(0.000256) = **0.016**

UCL = 0.040 + 3(0.016) = **0.088** · LCL = 0.040 − 0.048 = −0.008 → set to **0**

Shift 6: p = 16/150 = **0.107 > 0.088** → **out of control**

> Distractor trap: Option A (UCL = 0.096) uses n = 200 instead of 150. Option C gets the right UCL but misses Shift 6.

---

**Q18 — Lean Metrics (Riverside Medical)** · 4 pts · **Answer: B**

Available time = 10 hr × 60 min = 600 min/day · Daily demand = 40

Takt = 600 / 40 = **15 min**

Total processing time = 8 + 10 + 6 + 5 = **29 min**

Lead time = (8 + 12 + 20 + 16) / 40 = 56 / 40 = **1.40 days**

> Distractor trap: Option A uses takt = 12 min (divides by 50 instead of 40, or uses 8 hr shift instead of 10 hr). Option C has wrong lead time.

---

**Q19 — VSM Analysis** · 6 pts · **Answers: a=C, b=B, c=B**

Daily demand = 480 loaves/day · Available time = 27,000 sec/shift

**Part a — Processing time:** 18 + 40 + 50 + 15 = **123 sec**

**Part b — Production lead time:**

| Inventory Point | Quantity | Days (÷ 480) |
|---|---|---|
| Raw flour | — | 4.0 days |
| WIP before Proofing | 720 loaves | 1.5 days |
| WIP before Baking | 960 loaves | 2.0 days |
| WIP before Packaging | 480 loaves | 1.0 day |
| Finished goods staging | 480 loaves | 1.0 day |
| **Total** | | **9.5 days** |

**Part c — PCE:** 123 / (9.5 × 27,000) = 123 / 256,500 = **0.05%**

---

**Q20 — Kanban** · 4 pts · **Answer: C**

d = 480/day, v = 2 hr = 2/8 = 0.25 day, r = 30 min = 0.5/8 = 0.0625 day, a = 0.10, c = 24

k = 480 × (0.25 + 0.0625) × 1.10 / 24 = 480 × 0.3125 × 1.10 / 24 = 165 / 24 = **6.875 → rounds up to 7**

Options: A=5, B=6, C=7, D=8. Answer = **C (7 containers)**.

---

**Q21 — TOC Bottleneck (YPI)** · 6 pts · **Answer: B**

Station W total: A uses W(11 min)×79 + B uses W(8 min)×28 + C uses W(17 min)×79 = 869 + 224 + 1,343 = **2,436 min**

Exceeds 2,400 available by **36 min** → W is the bottleneck.

Other loads: X=1,659 · Z=1,177 · Y=652 — all under capacity.

---

**Q22 — Bottleneck Product Mix (Ridgeline)** · 6 pts · **Answer: A**

Rank by CM/min: Bookshelf ($9.00) > Table ($6.91) > Cabinet ($4.71)

| Step | Product | Units | Min Used | Remaining |
|---|---|---|---|---|
| 1st | Bookshelf | 80 | 640 | 1,760 |
| 2nd | Dining Table | 79 | 869 | 891 |
| 3rd | Cabinet | 891÷17 = 52 | 884 | 7 |

> Distractor trap: Option B ranks by total CM ($80 > $76 > $72) — the classic traditional-method mistake.

---

**Q23 — Capacity Requirements (PeakForm)** · 5 pts · **Answer: B**

Available per machine = 8 hr × 250 days × 60 min = **120,000 min/yr**

Standard: (15,000 × 8) + (15,000/50 × 30) = 120,000 + 9,000 = 129,000 min

Pro: (7,000 × 18) + (7,000/35 × 60) = 126,000 + 12,000 = 138,000 min

Total required = 267,000 min

M = 267,000 / (120,000 × 0.75) = 267,000 / 90,000 = **2.97 → round up to 3**

---

**Q24 — Line Balancing Metrics (Clearwater)** · 5 pts · **Answer: B**

c = 3,600 / 45 = **80 sec** · TM = ⌈210/80⌉ = ⌈2.625⌉ = **3 stations**

Efficiency = 210 / (3 × 80) = **87.5%** · Balance Delay = **12.5%**

> Option A trap: student uses 45 directly as cycle time instead of 3,600/45.

---

**Q25 — Line Balancing Shortest Task Time** · 7 pts · **Answer: B**

c = 3,600 / 45 = **80 sec** · TM = ⌈363/80⌉ = ⌈4.54⌉ = **5 stations**

Shortest task time assignments:
- S1: A(35), H(26), I(15) → 76 sec
- S2: B(75) → 75 sec
- S3: E(13), C(20), D(40) → 73 sec ← **Station 3 answer**
- S4: G(53), J(8) → 61 sec
- S5: F(65), K(13) → 78 sec

Efficiency = 363 / (5 × 80) = **90.8%** · Balance Delay = **9.2%**

> Distractor trap: Option A (G and C) is what the **longest task time** rule produces for Station 3 — students who mix up the rules will pick this.

---

*MGMT 339 · Exam 2 · Spring 2026 — Internal Use Only*
