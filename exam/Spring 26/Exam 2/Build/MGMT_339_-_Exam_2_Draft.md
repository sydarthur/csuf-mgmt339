---
title: MGMT 339 — Exam 2
author: Sid Yamalakonda | Spring 2026
---

# MGMT 339 — Exam 2
**Spring 2026 | 75 minutes | 25 Questions | 105 points**
Closed book. One page cheat sheet (front and back) permitted. Calculator allowed.

---

## Part 1 — Conceptual Questions (10 questions × 3 pts = 30 pts)

---

**Question 1** *(3 pts)*

A hospital emergency department sees a highly varied mix of patients — some need a quick prescription refill while others require complex trauma care. The department uses flexible staffing, allows considerable nurse discretion, and workflows differ patient to patient. A consultant recommends standardizing processes into fixed protocols to improve efficiency.

Which of the following best describes the risk of this recommendation?

- A) Standardizing will increase capital intensity, which is always too expensive for service settings
- B) The recommendation would push the department off the strategic diagonal — imposing low-divergence structure on a high-contact, high-customization process
- C) Fixed protocols will increase resource flexibility, which conflicts with lean principles
- D) Standardization always leads to diseconomies of scale in service settings

---

**Question 2** *(3 pts)*

A regional bakery has grown rapidly and now supplies 300 grocery stores. The owner is considering investing $2 million in a fully automated bread line that can produce only one product type at a constant rate.

Which of the following is the most accurate concern about this decision?

- A) Automation always creates diseconomies of scale, so the investment is never justified
- B) Fixed automation requires high, stable volume — if demand is variable or the product mix shifts, the investment loses its economic justification
- C) Flexible automation would be worse here because it cannot handle high volume
- D) The bakery should remain a job process to preserve customer involvement

---

**Question 3** *(3 pts)*

A process has a Cp of 1.45 and a Cpk of 0.79. Which of the following is the most accurate interpretation?

- A) The process is incapable because the spread is too wide to fit within the spec limits
- B) The process meets 4-sigma capability standards since Cp exceeds 1.33
- C) The process spread could fit within the specification, but the process is significantly off-center — centering is the primary problem, not variability
- D) A Cpk of 0.79 means the process produces defects on 79% of units

---

**Question 4** *(3 pts)*

A paint shop tracks the number of surface defects per car body coming off the line. Each day, one car body is fully inspected and the total number of surface defects is counted.

Which control chart should be used, and why?

- A) X̄ and R chart — because paint quality is a continuous measurement taken in groups
- B) p-chart — because each car body either passes or fails inspection
- C) c-chart — because we are counting the number of defects on a single inspected unit, and one unit can have multiple defects
- D) p-chart — because sample sizes at automotive plants are always large

---

**Question 5** *(3 pts)*

A value stream map for VeloShip's fulfillment center shows a production lead time of 9.2 days and a total processing time of 84 seconds. A manager proposes investing in faster conveyor equipment to reduce processing time by 30 seconds.

What does the VSM data tell you about this proposal?

- A) It is well-targeted — reducing processing time directly reduces lead time proportionally
- B) Cutting 30 seconds from processing time will have a measurable impact because processing time is the primary driver of lead time
- C) The investment attacks the wrong problem — with only 84 seconds of value-added time in 9.2 days, nearly all lead time is waiting. The opportunity is in attacking WIP and queues, not processing speed
- D) The investment is justified only if the conveyor is the bottleneck step

---

**Question 6** *(3 pts)*

Under the Theory of Constraints, a plant manager notices the bottleneck workstation runs at 100% utilization while all other workstations run at 60–70%. She decides to improve the efficiency of the non-bottleneck stations so they can produce faster.

What is the most likely outcome?

- A) System throughput will increase because more capacity is available upstream
- B) The bottleneck will be relieved because upstream stations now feed it more quickly
- C) WIP will pile up in front of the bottleneck faster — lead time increases without any improvement in output
- D) Process cycle efficiency will decrease because the non-bottleneck stations now have higher utilization

---

**Question 7** *(3 pts)*

NeoZapato is comparing two product mix strategies. Under the bottleneck method, the mix shifts toward products with lower total contribution margin per unit but better contribution margin per bottleneck minute.

A student argues: *"The traditional method must be better because it prioritizes the highest contribution margin per unit."* What is the flaw in this reasoning?

- A) The traditional method actually minimizes contribution margin — the student has it backwards
- B) When a resource is constrained, what matters is margin generated per unit of the scarce resource, not per unit of product — the bottleneck method maximizes total weekly profit even when some individual product margins are lower
- C) The student is correct — contribution margin per unit always produces the highest total profit regardless of constraints
- D) The bottleneck method only applies when all products use the same workstation

---

**Question 8** *(3 pts)*

A line-balancing solution assigns tasks to 6 workstations with a cycle time of 50 seconds. Total task time across all work elements is 252 seconds.

Which of the following is true?

- A) The theoretical minimum is 6 stations, so the current solution is already optimal — remaining idle time cannot be eliminated without changing the cycle time or task structure
- B) Eliminating all idle time is always possible by switching assignment rules
- C) The theoretical minimum is 5 stations, so a better solution with fewer stations must exist
- D) The theoretical minimum is 4 stations; the current solution is significantly suboptimal

---

**Question 9** *(3 pts)*

A Kanban system currently authorizes 12 containers between two workstations. An industrial engineer proposes a layout change that would cut materials handling and waiting time (v) by 40%, with no change to processing time, demand, or container size.

Without calculating, which prediction is most accurate?

- A) The number of authorized containers will increase because the loop now moves faster
- B) The number of authorized containers will decrease — less lead time means less demand accumulates during the replenishment window, so fewer containers are needed
- C) The number of containers is unaffected because container size and demand are unchanged
- D) The safety factor must increase to compensate for the faster loop

---

**Question 10** *(3 pts)*

A control chart shows one point falling below the Lower Control Limit on a p-chart. The operations manager says: *"That's good news — fewer defects than expected. No action needed."*

What is the most accurate response?

- A) She is correct — points below the LCL always indicate process improvement and require no investigation
- B) She is incorrect — a point outside either limit, including below the LCL, signals an assignable cause. An unusually low defect rate could reflect a genuine improvement, but it could also mean a recording error or sampling problem. Both warrant investigation
- C) She is partially correct — points below the LCL are only concerning if they occur in two consecutive shifts
- D) p-charts do not have a Lower Control Limit, so the observation should be excluded from the chart

---

## Part 2 — Quantitative Problems (15 questions = 75 pts)

---

### Process Analysis *(8 pts)*

**Questions 11–12** | *NeoZapato operates two production facilities. Last week's data is summarized below. Each pair of sandals sells for $40.*

| | Tijuana Facility | Los Angeles Facility |
|---|---|---|
| Pairs produced | 1,600 | 2,100 |
| Labor hours worked | 320 | 350 |
| Labor cost ($) | $3,840 | $15,750 |
| Materials cost ($) | $2,800 | $5,200 |
| Overhead cost ($) | $1,200 | $3,000 |

---

**Question 11** *(3 pts)*

Which facility has higher **labor productivity** (pairs per labor hour)?

- A) Tijuana — 5.00 pairs/hr vs. Los Angeles — 4.00 pairs/hr
- B) Los Angeles — 6.00 pairs/hr vs. Tijuana — 5.00 pairs/hr
- C) Tijuana — 6.00 pairs/hr vs. Los Angeles — 5.00 pairs/hr
- D) Both facilities have equal labor productivity

---

**Question 12** *(5 pts)*

Which facility has higher **multifactor productivity**, and what does the comparison reveal about the two operations?

- A) Los Angeles (MFP = 3.51) outperforms Tijuana (MFP = 8.16); higher output drives higher MFP
- B) Tijuana (MFP = 8.16) outperforms Los Angeles (MFP = 3.51); despite lower labor productivity, Tijuana's far lower input costs generate more output value per dollar spent
- C) Los Angeles (MFP = 4.50) outperforms Tijuana (MFP = 3.20); higher labor productivity always leads to higher MFP
- D) Both facilities have the same MFP because they sell sandals at the same price

---

### Quality Management *(22 pts)*

**Questions 13–14** | *TechAssemble's quality inspector selects 4 motherboards per shift and measures a critical dimension (mm). Data from 5 shifts shown below. Constants for n = 4: A₂ = 0.729, D₃ = 0, D₄ = 2.282.*

| Shift | x₁ | x₂ | x₃ | x₄ |
|---|---|---|---|---|
| 1 | 10.4 | 10.2 | 10.5 | 10.3 |
| 2 | 10.1 | 9.8 | 10.3 | 10.2 |
| 3 | 10.6 | 10.7 | 10.4 | 10.5 |
| 4 | 10.2 | 10.3 | 10.1 | 10.4 |
| 5 | 10.5 | 10.3 | 10.4 | 10.6 |

---

**Question 13** *(5 pts)*

Calculate $\bar{\bar{X}}$, $\bar{R}$, and the X̄ chart control limits. Round to 3 decimal places.

- A) $\bar{\bar{X}}$ = 10.340, $\bar{R}$ = 0.340 → UCL = 10.588, LCL = 10.092
- B) $\bar{\bar{X}}$ = 10.330, $\bar{R}$ = 0.360 → UCL = 10.593, LCL = 10.067
- C) $\bar{\bar{X}}$ = 10.280, $\bar{R}$ = 0.340 → UCL = 10.528, LCL = 10.032
- D) $\bar{\bar{X}}$ = 10.340, $\bar{R}$ = 0.400 → UCL = 10.632, LCL = 10.048

---

**Question 14** *(3 pts)*

Using the limits from Question 13, is the process in control? What is the UCL for the R chart?

- A) All shifts in control; UCL_R = 0.776
- B) Shift 2 is out of control on the X̄ chart; UCL_R = 0.776
- C) Shift 3 is out of control on the X̄ chart; UCL_R = 0.776
- D) All shifts in control; UCL_R = 0.822

---

**Question 15** *(6 pts)*

*Specification for a valve stem diameter: 12.00 ± 0.30 mm. Process data: μ = 12.15 mm, σ = 0.09 mm.*

Calculate Cp and Cpk. Does this process meet 4-sigma capability (Cpk ≥ 1.33)?

- A) Cp = 1.11, Cpk = 0.56; does not meet 4-sigma
- B) Cp = 1.11, Cpk = 0.83; does not meet 4-sigma
- C) Cp = 1.11, Cpk = 1.11; meets 4-sigma
- D) Cp = 1.67, Cpk = 0.56; does not meet 4-sigma

---

**Question 16** *(8 pts)*

*NeoZapato inspects batches of 200 sandal pairs per shift. Defective counts over 10 shifts:*

| Shift | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Defectives | 8 | 5 | 12 | 3 | 9 | 14 | 6 | 4 | 10 | 9 |

Calculate $\bar{p}$, σ_p, UCL, and LCL (set to 0 if negative). Which shift, if any, is out of control?

- A) $\bar{p}$ = 0.040, UCL = 0.082, LCL = 0; Shift 6 is out of control
- B) $\bar{p}$ = 0.040, UCL = 0.082, LCL = 0; all shifts in control
- C) $\bar{p}$ = 0.040, UCL = 0.096, LCL = 0; all shifts in control
- D) $\bar{p}$ = 0.045, UCL = 0.090, LCL = 0; Shift 6 is out of control

---

### Lean Systems *(16 pts)*

**Questions 17–19** | *VeloShip Fulfillment processes orders through 4 sequential steps. Available time: 1 shift × 8 hours/day. Daily demand: 480 orders.*

| Step | Cycle Time | Uptime | WIP Before Step |
|---|---|---|---|
| Receive & Sort | 20 sec | 100% | 1,200 orders |
| Pick & Pack | 45 sec | 90% | 2,880 orders |
| Quality Check | 30 sec | 100% | 960 orders |
| Label & Ship | 25 sec | 100% | 480 orders |

---

**Question 17** *(4 pts)*

What is takt time, and which step is the bottleneck? Use effective C/T = cycle time ÷ uptime.

- A) Takt = 60 sec; bottleneck is Pick & Pack (effective C/T = 50 sec); line CAN meet demand
- B) Takt = 60 sec; bottleneck is Quality Check (30 sec); line CAN meet demand
- C) Takt = 57.6 sec; bottleneck is Pick & Pack (effective C/T = 50 sec); line CANNOT meet demand
- D) Takt = 60 sec; bottleneck is Pick & Pack (effective C/T = 50 sec); line CANNOT meet demand

---

**Question 18** *(4 pts)*

What is the production lead time?

- A) 7.5 days
- B) 9.5 days
- C) 11.5 days
- D) 13.0 days

---

**Question 19** *(8 pts)*

*Kanban loop between Pick & Pack and Quality Check: d = 480 orders/day, waiting/handling time v = 2 hours, processing time per container r = 0.5 hours, safety factor a = 10%, container size c = 20 orders. Workday = 8 hours. Convert v and r to days before solving.*

How many containers should be authorized?

- A) 5 containers
- B) 6 containers
- C) 7 containers
- D) 8 containers

---

### Constraints *(20 pts)*

**Questions 20–22** | *Metcalf Inc. produces three products through four workstations. Available: 2,400 min/week per workstation. Fixed labor: $3,200/week. Overhead: $4,000/week.*

| Product | Price | Raw Material | Weekly Demand | A (min) | B (min) | C (min) | D (min) |
|---|---|---|---|---|---|---|---|
| X | $90 | $30 | 80 units | 10 | — | 15 | 10 |
| Y | $75 | $20 | 60 units | — | 20 | 10 | 15 |
| Z | $60 | $15 | 100 units | 8 | 12 | 8 | — |

---

**Question 20** *(4 pts)*

If all products are made at maximum demand, what is the total workload at each workstation, and which is the bottleneck?

- A) A = 1,600, B = 2,400, C = 2,600, D = 1,700; bottleneck is C
- B) A = 1,600, B = 2,400, C = 2,600, D = 1,700; bottleneck is B (tied with available capacity)
- C) A = 2,000, B = 2,400, C = 2,600, D = 1,700; bottleneck is C
- D) A = 1,600, B = 1,920, C = 2,600, D = 1,700; bottleneck is C

---

**Question 21** *(6 pts)*

Calculate contribution margin per bottleneck minute for each product. Which ranking and optimal mix is correct?

- A) Y ($5.50/min) > Z ($5.625/min) > X ($4.00/min); optimal: Y = 60, Z = 100, X = 66
- B) Z ($5.625/min) > Y ($5.50/min) > X ($4.00/min); optimal: Z = 100, Y = 60, X = 66
- C) X ($4.00/min) > Y ($5.50/min) > Z ($5.625/min); optimal: X = 80, Y = 60, Z = 75
- D) Z ($5.625/min) > Y ($5.50/min) > X ($4.00/min); optimal: Z = 100, Y = 60, X = 80

---

**Question 22** *(10 pts)*

Calculate weekly profit under both the traditional method (rank by CM per unit) and the bottleneck method. What is the profit improvement?

- A) Traditional profit = $4,275; Bottleneck profit = $4,560; improvement = $285/week
- B) Traditional profit = $3,980; Bottleneck profit = $5,200; improvement = $1,220/week
- C) Traditional profit = $4,275; Bottleneck profit = $4,275; no improvement
- D) Traditional profit = $5,200; Bottleneck profit = $4,275; traditional method wins

---

### Capacity *(9 pts)*

**Questions 23–25** | *Tuff-Rider Inc. makes Touring and Mountain bikes. Shop: 1 shift × 8 hrs/day, 5 days/week, 48 weeks/year. Capacity cushion: 15%.*

| Product | Annual Demand | Processing Time | Setup Time | Lot Size |
|---|---|---|---|---|
| Touring | 5,000 units | 0.20 hr/unit | 2 hr/lot | 90 units |
| Mountain | 10,000 units | 0.25 hr/unit | 3 hr/lot | 100 units |

---

**Question 23** *(3 pts)*

What is the total annual available time per workstation before applying the capacity cushion?

- A) 1,600 hours
- B) 1,920 hours
- C) 2,400 hours
- D) 1,536 hours

---

**Question 24** *(3 pts)*

What is the total annual time required (run time + setup time) across both products?

- A) 3,500 hours
- B) 3,611 hours
- C) 3,911 hours
- D) 4,200 hours

---

**Question 25** *(3 pts)*

How many workstations are required after applying the 15% cushion? Round up.

- A) 2 workstations
- B) 3 workstations
- C) 4 workstations
- D) 5 workstations

---

*MGMT 339 · Exam 2 · Spring 2026 · Sid Yamalakonda*
