---
title: MGMT 339 — Exam 2
author: Spring 2026 | Sid Yamalakonda
---

# MGMT 339 — Operations Management
## Exam 2 · Spring 2026

**Name:** _________________________ **Section:** _____________

**Instructions:**
- Formula sheet is provided separately. No other notes permitted.
- Show all work on quantitative questions — answers without work receive no credit.
- Round final answers to two decimal places unless otherwise specified.
- For kanban and machine counts, always round **up**.

---

**Point Summary**

| Section | Questions | Points |
|---|---|---|
| A — Conceptual | 1–10 | 30 pts (3 each) |
| B — Quality Management | 11–14 | 16 pts |
| C — Lean & Value Stream | 15–17 | 15 pts |
| D — Theory of Constraints | 18–20 | 16 pts |
| E — Line Balancing | 21–23 | 14 pts |
| F — Capacity Planning | 24–25 | 9 pts |
| **Total** | | **100 pts** |

---

## Case Background — NovaBike Manufacturing

NovaBike Manufacturing assembles electric bicycles at their Fullerton, CA facility. The company produces two product lines: the **Commuter** (lightweight city e-bike) and the **Trail** (heavy-duty e-MTB). Questions throughout this exam draw on data from NovaBike's operations.

---

## Section A — Conceptual Questions (30 pts)

*Choose the single best answer. 3 points each.*

---

**Question 1**

A small artisan workshop builds fully custom handmade guitars — each one designed and built to the individual buyer's specifications in batches of one or two at a time. On the product-process matrix, which manufacturing process type best describes this operation?

- [ ] A) Continuous flow
- [ ] B) Line process
- [ ] C) Batch process
- [ ] D) Job process

---

**Question 2**

NovaBike's quality team wants to monitor whether the *proportion* of finished bikes failing final inspection changes from shift to shift. Samples of 100 bikes are drawn each shift. Which control chart is appropriate?

- [ ] A) X̄ and R chart
- [ ] B) p-chart
- [ ] C) c-chart
- [ ] D) Any of the above — all are equivalent for this purpose

---

**Question 3**

A process has $C_p = 1.42$ and $C_{pk} = 0.78$. Which statement best describes this situation?

- [ ] A) The process is both capable and well-centered; no action needed
- [ ] B) The process spread is too wide to fit within specifications
- [ ] C) The process spread is adequate, but the mean is shifted away from the center of the spec
- [ ] D) $C_p$ and $C_{pk}$ cannot differ this much — the data is likely incorrect

---

**Question 4**

Takt time is best described as:

- [ ] A) The fastest any single process step can produce one unit
- [ ] B) The rate at which the customer demands output — how often one unit must be completed
- [ ] C) The longest cycle time observed across all process steps in the value stream
- [ ] D) The average time for a unit to travel through the entire production system

---

**Question 5**

In a kanban system, if the safety factor $a$ is increased from 0.10 to 0.20 — with all other variables held constant — what happens to the number of kanban containers authorized?

- [ ] A) Decreases
- [ ] B) Stays the same
- [ ] C) Increases
- [ ] D) Cannot be determined without knowing container size

---

**Question 6**

In the Theory of Constraints product mix method, why is labor treated as a **fixed cost** when computing contribution margin?

- [ ] A) Labor is always the bottleneck resource in manufacturing
- [ ] B) Workers are paid for the week regardless of what or how much they produce, so the product mix decision does not change total labor cost
- [ ] C) Variable overhead already accounts for labor in the TOC framework
- [ ] D) The TOC method is only valid for fully automated facilities where labor is minimal

---

**Question 7**

In line balancing, "cycle time" is defined as:

- [ ] A) The actual processing time at the slowest workstation on the line
- [ ] B) The maximum time allowed per workstation, determined by customer demand
- [ ] C) The total task time divided by the number of workstations
- [ ] D) The time interval between successive quality inspections

---

**Question 8**

NovaBike is producing a new battery pack assembly for the first time. The first unit took 120 minutes. The company operates on an **80% learning curve**.

Approximately how long will the **4th unit** take?

- [ ] A) 120.0 min
- [ ] B) 96.0 min
- [ ] C) 76.8 min
- [ ] D) 61.4 min

---

**Question 9**

A line balancing solution uses **5 workstations** with a cycle time of **50 seconds**. The balance delay is **15%**. What is the total task time across all work elements?

- [ ] A) 200.0 sec
- [ ] B) 212.5 sec
- [ ] C) 225.5 sec
- [ ] D) 287.5 sec

---

**Question 10**

Process Cycle Efficiency (PCE) is almost always a very small percentage in real manufacturing environments. The primary reason is:

- [ ] A) Processing times per unit are too long relative to takt time
- [ ] B) The vast majority of production lead time is inventory sitting and waiting — not value-added work
- [ ] C) Defect rates inflate the measured production lead time significantly
- [ ] D) Setup times between batches dominate over actual processing time

---

## Section B — Quality Management (16 pts)

### Context

NovaBike's final inspection team examines finished bicycles for defects (paint flaws, misaligned components, loose connectors). They inspect **100 bikes per shift** and recorded the following defective counts over 8 shifts:

| Sample | Defective Bikes |
|---|---|
| 1 | 4 |
| 2 | 3 |
| 3 | 6 |
| 4 | 5 |
| 5 | 4 |
| 6 | 7 |
| 7 | 5 |
| 8 | 6 |
| **Total** | **40** |

---

**Question 11 (5 pts)**

Calculate $\bar{p}$, the standard deviation $\sigma_p$, the UCL, and the LCL for a p-chart monitoring NovaBike's defect rate. Use $z = 3$. If LCL < 0, set it to 0. Show all work.

---

**Question 12 (3 pts)**

List the defect proportion ($p_i$) for each of the 8 samples. Is the process in statistical control? Identify any out-of-control points, or state that none exist.

---

### Additional Context — Frame Dimension

NovaBike's aluminum frame must meet a length specification of **580 ± 3 mm**.

The quality team measured the current production process and found:
- Process mean ($\mu$): **581.2 mm**
- Process standard deviation ($\sigma$): **0.85 mm**

---

**Question 13 (4 pts)**

Calculate $C_p$ and $C_{pk}$ for the frame length process. Show all work.

---

**Question 14 (4 pts)**

Based on your $C_p$ and $C_{pk}$ values from Question 13, describe the current state of the frame process. Should NovaBike prioritize **reducing variability** or **recentering the process mean**? Justify your answer using the numbers.

---

## Section C — Lean & Value Stream Mapping (15 pts)

### Context

NovaBike's Commuter line follows a 4-step production sequence. The plant runs **one 8-hour shift per day (28,800 seconds)**. Daily customer demand is **320 bikes/day**.

| Process Step | Cycle Time (sec/bike) | WIP Inventory Before Step |
|---|---|---|
| Frame Welding | 65 | 480 bikes |
| Electronics Install | 45 | 640 bikes |
| Final Assembly | 95 | 320 bikes |
| Quality Inspection | 30 | 160 bikes |
| Finished Goods | — | 960 bikes |

---

**Question 15 (4 pts)**

Calculate the **takt time** for the Commuter line. Which process step(s), if any, **cannot keep up** with customer demand? Explain briefly.

---

**Question 16 (5 pts)**

Calculate the **total production lead time** (in days) for the Commuter line. Then calculate the **Process Cycle Efficiency (PCE)**. Keep your units consistent.

> *Hint: value-added time = sum of the four cycle times in the table above.*

---

**Question 17 (6 pts)**

NovaBike wants to implement a kanban system to pull welded frames from the Frame Welding cell to the Electronics Install station.

**Given:**
- Daily demand ($d$): 320 bikes/day
- Container size ($c$): 40 bikes
- Average wait/handling time ($v$): 0.5 days
- Processing time per container ($r$): 0.25 days
- Safety factor ($a$): 10%

How many kanban containers should be authorized? Show all work and round up to the nearest whole container.

---

## Section D — Theory of Constraints (16 pts)

### Context

NovaBike makes two products: the **Commuter (C)** and the **Trail (T)**. Both flow through three workstations: **Welding (W)**, **Electronics (E)**, and **Paint (P)**.

The plant operates **40 hours/week = 2,400 minutes/week per workstation**.

| | Commuter | Trail |
|---|---|---|
| Selling price | $850 | $1,200 |
| Raw material cost | $320 | $480 |
| Maximum weekly demand | 80 units | 60 units |
| Welding time | 15 min/unit | 25 min/unit |
| Electronics time | 20 min/unit | 12 min/unit |
| Paint time | 10 min/unit | 8 min/unit |

**Fixed costs:** Labor = $5,280/week · Fixed overhead = $12,000/week

---

**Question 18 (4 pts)**

Calculate the total load (in minutes) on each of the three workstations if NovaBike produced at **maximum demand** for both products. Identify the **bottleneck**.

---

**Question 19 (5 pts)**

Using the **traditional method** (rank by contribution margin), determine the product mix and calculate weekly profit. Show the contribution margin for each product and trace through the capacity allocation step by step.

---

**Question 20 (7 pts)**

Using the **bottleneck method** (rank by contribution margin per bottleneck minute), determine the optimal product mix and calculate weekly profit. What is the profit improvement over the traditional method? What explains the difference?

---

## Section E — Line Balancing (14 pts)

### Context

NovaBike is designing an assembly line for a new accessory kit. The work elements are:

| Element | Description | Time (sec) | Predecessors |
|---|---|---|---|
| A | Mount frame bracket | 35 | None |
| B | Install motor unit | 50 | A |
| C | Attach fork assembly | 25 | A |
| D | Mount battery pack | 40 | B |
| E | Route wire harness | 30 | B, C |
| F | Install brake system | 20 | C |
| G | Final torque & check | 15 | D, E, F |
| **Total** | | **215 sec** | |

**Desired output rate:** 60 units per hour.

---

**Question 21 (3 pts)**

Calculate the **cycle time** (in seconds per unit) and the **theoretical minimum number of workstations**. Show work.

---

**Question 22 (7 pts)**

Using the **longest task time** rule, assign all 7 work elements to workstations. For each station, show:
- Which tasks are **candidates** (predecessors complete)
- Which task is **assigned** and why
- The **remaining time** after each assignment

---

**Question 23 (4 pts)**

Based on your station assignments from Question 22:

a) Calculate **line efficiency** and **balance delay**.
b) How many total seconds of **idle time** exist per cycle across all stations?

---

## Section F — Capacity Planning (9 pts)

### Context

NovaBike uses a CNC machining center to produce aluminum frames for both product lines. Relevant data for next year's demand plan:

| Product | Annual Demand | Processing Time | Lot Size | Setup Time per Lot |
|---|---|---|---|---|
| Commuter Frame | 25,000 units | 0.05 hr/unit | 100 units | 2.5 hr/lot |
| Trail Frame | 15,000 units | 0.08 hr/unit | 100 units | 3.0 hr/lot |

The CNC center is available **250 days/year × 8 hr/day = 2,000 hours/machine/year**.
NovaBike maintains a **15% capacity cushion**.

---

**Question 24 (5 pts)**

How many CNC machines does NovaBike need to meet next year's demand? Show all work using the capacity requirement formula.

---

**Question 25 (4 pts)**

Suppose NovaBike invests in a flexible fixturing system that **eliminates all setup time** (i.e., $s_p = 0$ for both products). How many machines would be needed?

What does this result suggest about the **strategic value of setup time reduction**? Answer in 2–3 sentences.

---

*End of Exam*

---
---

# Answer Key — Instructor Only

---

## Section A — Conceptual

| Q | Answer | Key Reasoning |
|---|---|---|
| 1 | **D** | Low volume, fully custom → Job process |
| 2 | **B** | Tracking proportion defective across samples → p-chart |
| 3 | **C** | Cp > 1 means spread fits; Cpk < 1 means mean is shifted off-center |
| 4 | **B** | Takt = available time / demand; it's the customer's drumbeat |
| 5 | **C** | k = d(v+r)(1+a)/c — larger a directly increases k |
| 6 | **B** | Workers paid for the week regardless — labor is sunk for product mix decisions |
| 7 | **B** | Cycle time in line balancing = max allowed time per station = 1/r |
| 8 | **C** | Unit 1=120, Unit 2=96, Unit 4=96×0.80=**76.8** min |
| 9 | **B** | Efficiency = 1−0.15 = 0.85; Total task = 0.85 × (5×50) = **212.5** sec |
| 10 | **B** | PCE is low because WIP wait time >> processing time in virtually all factories |

---

## Section B — Quality Management

### Q11 — p-chart limits

$$\bar{p} = \frac{40}{8 \times 100} = \frac{40}{800} = 0.050$$

$$\sigma_p = \sqrt{\frac{0.050 \times 0.950}{100}} = \sqrt{0.000475} = 0.02179$$

$$UCL = 0.050 + 3(0.02179) = 0.050 + 0.0654 = \mathbf{0.1154}$$

$$LCL = 0.050 - 0.0654 = -0.0154 \rightarrow \text{set to } \mathbf{0}$$

### Q12 — Sample proportions

| Sample | Defectives | $p_i$ | In Control? |
|---|---|---|---|
| 1 | 4 | 0.040 | ✓ |
| 2 | 3 | 0.030 | ✓ |
| 3 | 6 | 0.060 | ✓ |
| 4 | 5 | 0.050 | ✓ |
| 5 | 4 | 0.040 | ✓ |
| 6 | 7 | 0.070 | ✓ |
| 7 | 5 | 0.050 | ✓ |
| 8 | 6 | 0.060 | ✓ |

All samples fall between LCL = 0 and UCL = 0.1154. **Process is in statistical control. No out-of-control points.**

### Q13 — Process Capability

USL = 583 mm, LSL = 577 mm, μ = 581.2 mm, σ = 0.85 mm

$$C_p = \frac{583 - 577}{6 \times 0.85} = \frac{6}{5.1} = \mathbf{1.18}$$

$$C_{pk} = \min\!\left(\frac{583 - 581.2}{3 \times 0.85},\ \frac{581.2 - 577}{3 \times 0.85}\right) = \min\!\left(\frac{1.8}{2.55},\ \frac{4.2}{2.55}\right) = \min(0.706,\ 1.647) = \mathbf{0.71}$$

### Q14 — Interpretation

$C_p = 1.18 > 1.00$ → the process spread (6σ = 5.1 mm) is narrow enough to fit within the 6 mm specification window. Variability itself is not the problem.

$C_{pk} = 0.71 < 1.00$ → the process is **not capable** because the mean (581.2 mm) is shifted toward the upper spec limit. The mean is only 1.8 mm below USL, but 4.2 mm above LSL — highly asymmetric.

**Priority: recenter the process toward 580 mm.** No need to reduce variability; reducing variability while the mean stays at 581.2 mm would still produce off-spec parts at the upper end. Shifting the mean down ~1.2 mm while holding σ = 0.85 would bring $C_{pk}$ to ≈ 1.18, matching $C_p$.

---

## Section C — Lean & Value Stream Mapping

### Q15 — Takt Time

$$\text{Takt} = \frac{28{,}800 \text{ sec}}{320 \text{ bikes}} = 90 \text{ sec/bike}$$

Comparing cycle times to takt:

| Step | Cycle Time | vs. Takt |
|---|---|---|
| Frame Welding | 65 sec | ✓ |
| Electronics Install | 45 sec | ✓ |
| **Final Assembly** | **95 sec** | **✗ — cannot keep up** |
| Quality Inspection | 30 sec | ✓ |

**Final Assembly (95 sec) exceeds takt (90 sec).** This step will fall behind — it is the bottleneck.

### Q16 — Lead Time and PCE

**Production lead time** (WIP ÷ daily demand):

| Buffer | WIP | Days |
|---|---|---|
| Before Welding | 480 | 480/320 = 1.50 |
| Before Electronics | 640 | 640/320 = 2.00 |
| Before Assembly | 320 | 320/320 = 1.00 |
| Before QC | 160 | 160/320 = 0.50 |
| Finished Goods | 960 | 960/320 = 3.00 |
| **Total Lead Time** | | **8.00 days** |

**Value-added processing time** = 65 + 45 + 95 + 30 = 235 seconds

Convert to days: 235 ÷ 28,800 = 0.00816 days

$$PCE = \frac{0.00816}{8.00} \times 100\% = \mathbf{0.10\%}$$

*(Alternatively, work entirely in seconds: Lead time = 8.00 × 28,800 = 230,400 sec; PCE = 235/230,400 = 0.10%)*

Less than 1% of time is spent on value-added work. The rest is inventory waiting.

### Q17 — Kanban Containers

$$k = \frac{d(v + r)(1 + a)}{c} = \frac{320 \times (0.5 + 0.25) \times (1 + 0.10)}{40} = \frac{320 \times 0.75 \times 1.10}{40} = \frac{264}{40} = 6.6 \rightarrow \mathbf{7 \text{ containers}}$$

---

## Section D — Theory of Constraints

### Q18 — Bottleneck Identification

Load at max demand (80 Commuter + 60 Trail):

| Workstation | Commuter Load | Trail Load | Total | Available | Status |
|---|---|---|---|---|---|
| Welding | 80 × 15 = 1,200 | 60 × 25 = 1,500 | **2,700** | 2,400 | **OVERLOADED** |
| Electronics | 80 × 20 = 1,600 | 60 × 12 = 720 | 2,320 | 2,400 | OK |
| Paint | 80 × 10 = 800 | 60 × 8 = 480 | 1,280 | 2,400 | OK |

**Bottleneck = Welding** (2,700 min needed vs. 2,400 available)

### Q19 — Traditional Method

Contribution margins:

| | Commuter | Trail |
|---|---|---|
| Price | $850 | $1,200 |
| − Materials | −$320 | −$480 |
| **CM** | **$530** | **$720** |

Rank by CM: Trail ($720) → Commuter ($530)

**Step 1:** Make 60 Trail. Welding used: 60 × 25 = 1,500 min. Remaining: 2,400 − 1,500 = **900 min**.

**Step 2:** Commuter needs 15 min/unit. 900 ÷ 15 = **60 units** (wanted 80, limited to 60).

Check other workstations — neither Electronics nor Paint is overloaded.

**Traditional product mix: 60 Commuter, 60 Trail**

| | Calculation | Amount |
|---|---|---|
| Revenue | 60×$850 + 60×$1,200 | $123,000 |
| − Materials | 60×$320 + 60×$480 | −$48,000 |
| − Labor | | −$5,280 |
| − Overhead | | −$12,000 |
| **= Profit** | | **$57,720/week** |

### Q20 — Bottleneck Method

CM per bottleneck minute (Welding):

| | Commuter | Trail |
|---|---|---|
| CM | $530 | $720 |
| Welding time | 15 min | 25 min |
| **CM/min** | **$35.33** | **$28.80** |

Rank: Commuter ($35.33) > Trail ($28.80)

**Step 1:** Make 80 Commuter. Welding: 80 × 15 = 1,200 min. Remaining: **1,200 min**.

**Step 2:** Trail: 1,200 ÷ 25 = **48 units** (wanted 60, limited to 48).

**Bottleneck product mix: 80 Commuter, 48 Trail**

| | Calculation | Amount |
|---|---|---|
| Revenue | 80×$850 + 48×$1,200 | $125,600 |
| − Materials | 80×$320 + 48×$480 | −$48,640 |
| − Labor | | −$5,280 |
| − Overhead | | −$12,000 |
| **= Profit** | | **$59,680/week** |

**Improvement: $59,680 − $57,720 = +$1,960/week**

**Why:** The traditional method ranked Trail first because its total CM ($720) is higher. But Trail consumes 25 minutes of the bottleneck per unit — only $28.80/min. The bottleneck method correctly recognizes that every Commuter generates $35.33 per precious welding minute. Filling the Welding station with Commuters first leaves only enough capacity to make 48 Trails, but the overall profit is higher because the bottleneck is used more productively.

---

## Section E — Line Balancing

### Q21 — Cycle Time and TM

$$c = \frac{3{,}600 \text{ sec/hr}}{60 \text{ units/hr}} = 60 \text{ sec/unit}$$

$$TM = \left\lceil \frac{215}{60} \right\rceil = \lceil 3.58 \rceil = \mathbf{4 \text{ stations}}$$

### Q22 — Station Assignments

**Cycle time = 60 sec**

**Station 1** (remaining: 60 sec)
- Candidates: **A (35)** — only task with no predecessors
- Assign A. Remaining: 25 sec
- New candidates: B (50 > 25 ✗), C (25 ≤ 25 ✓)
- Assign C (25). Remaining: 0 sec
- **S1 = {A, C} — 60 sec — 0 sec idle**

**Station 2** (remaining: 60 sec)
- Candidates: B (50, A done ✓), F (20, C done ✓)
- Longest: **B (50)**. Assign B. Remaining: 10 sec
- Candidates that fit: F (20 > 10 ✗). None fit.
- **S2 = {B} — 50 sec — 10 sec idle**

**Station 3** (remaining: 60 sec)
- Candidates: D (40, B done ✓), E (30, B & C done ✓), F (20, C done ✓)
- Longest: **D (40)**. Assign D. Remaining: 20 sec
- Candidates that fit: F (20 ≤ 20 ✓), E (30 > 20 ✗)
- Assign **F (20)**. Remaining: 0 sec
- **S3 = {D, F} — 60 sec — 0 sec idle**

**Station 4** (remaining: 60 sec)
- Candidates: E (30, B & C done ✓). G requires D, E, F — D and F done, E not yet → G not eligible.
- Assign **E (30)**. Remaining: 30 sec
- G now eligible (D ✓, E ✓, F ✓). G (15 ≤ 30 ✓). Assign **G (15)**. Remaining: 15 sec
- No more tasks.
- **S4 = {E, G} — 45 sec — 15 sec idle**

**Summary:**

| Station | Tasks | Total Time | Idle |
|---|---|---|---|
| S1 | A, C | 60 sec | 0 sec |
| S2 | B | 50 sec | 10 sec |
| S3 | D, F | 60 sec | 0 sec |
| S4 | E, G | 45 sec | 15 sec |
| **Total** | | **215 sec** | **25 sec** |

### Q23 — Efficiency

$$\text{Efficiency} = \frac{215}{4 \times 60} = \frac{215}{240} = \mathbf{89.6\%}$$

$$\text{Balance Delay} = 1 - 0.896 = \mathbf{10.4\%}$$

**Total idle time per cycle = 240 − 215 = 25 seconds** (10 sec at S2 + 15 sec at S4)

---

## Section F — Capacity Planning

### Q24 — Machines with Setup

$$M = \frac{\displaystyle\sum_p \left[\frac{D_p \cdot p_p}{N} + \frac{D_p}{Q_p} \cdot \frac{s_p}{N}\right]}{1 - c/100}$$

**Commuter Frame:**

$$\frac{25{,}000 \times 0.05}{2{,}000} + \frac{25{,}000}{100} \times \frac{2.5}{2{,}000} = \frac{1{,}250}{2{,}000} + \frac{250 \times 2.5}{2{,}000} = 0.625 + 0.3125 = 0.9375$$

**Trail Frame:**

$$\frac{15{,}000 \times 0.08}{2{,}000} + \frac{15{,}000}{100} \times \frac{3.0}{2{,}000} = \frac{1{,}200}{2{,}000} + \frac{150 \times 3.0}{2{,}000} = 0.600 + 0.2250 = 0.8250$$

**Sum = 0.9375 + 0.8250 = 1.7625 machines (before cushion)**

$$M = \frac{1.7625}{1 - 0.15} = \frac{1.7625}{0.85} = 2.074 \rightarrow \text{round up to } \mathbf{3 \text{ machines}}$$

### Q25 — Machines Without Setup

Processing only (no setup terms):

$$0.625 + 0.600 = 1.225$$

$$M = \frac{1.225}{0.85} = 1.441 \rightarrow \text{round up to } \mathbf{2 \text{ machines}}$$

**Interpretation:** Setup time reduction eliminates an entire machine — dropping from 3 machines to 2. This represents a significant capital and operating cost savings. More broadly, setup time is a form of non-value-added time that consumes capacity without producing output. Reducing setups (e.g., SMED — Single-Minute Exchange of Die) is a core lean strategy: it frees capacity, enables smaller lot sizes, and reduces WIP — all without adding resources.

---

*MGMT 339 · Exam 2 · Spring 2026 · Instructor Copy*
