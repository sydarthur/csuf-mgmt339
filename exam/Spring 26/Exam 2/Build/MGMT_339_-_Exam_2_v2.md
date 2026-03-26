# MGMT 339 — Exam 2

**Date:** March 2026

**Name:** __________________

**CWID:** __________________

The exam contains 25 questions covering concepts, applications, and problem-solving.

- 10 Conceptual Questions, 3 pts each
- 14 Quantitative Questions, with varying point values (refer to each question for details)
- 1 Short Essay (not more than 2 sentences per framework), 3 pts

**Total = 100 points (20% of the final grade)**

---

## FORMULA REFERENCE

*All formulas you may need are provided below. Focus on knowing when and how to apply them.*

---

### Process Analysis

| Measure | Formula |
|---|---|
| Labor Productivity | Output (units) ÷ Labor hours |
| Multifactor Productivity (MFP) | Output value ($) ÷ (Labor + Materials + Overhead) |

*All inputs must be converted to dollars before computing MFP.*

---

### Quality Management

**X̄ and R Chart**

| Measure | Formula |
|---|---|
| Sample mean (X̄) | (x₁ + x₂ + ··· + xₙ) ÷ n |
| Sample range (R) | x~max~ − x~min~ |
| Grand mean (X̄̄) | ΣX̄ ÷ k |
| Average range (R̄) | ΣR ÷ k |
| X̄ chart UCL / LCL | X̄̄ ± A₂R̄ |
| R chart UCL | D₄ × R̄ |
| R chart LCL | D₃ × R̄ |

*n = observations per sample (used to look up A₂, D₃, D₄). k = number of samples.*

| n | A₂ | D₃ | D₄ |
|---|---|---|---|
| 2 | 1.880 | 0 | 3.267 |
| 3 | 1.023 | 0 | 2.575 |
| 4 | 0.729 | 0 | 2.282 |
| 5 | 0.577 | 0 | 2.115 |
| 6 | 0.483 | 0 | 2.004 |

**p-Chart**

| Measure | Formula |
|---|---|
| Defect rate per sample | p~i~ = defects ÷ n |
| Overall proportion (p̄) | Total defects ÷ Total observations |
| Standard deviation (σ~p~) | √[ p̄(1 − p̄) ÷ n ] |
| UCL / LCL | p̄ ± 3σ~p~ (set LCL = 0 if negative) |

**Process Capability**

| Measure | Formula | What It Tells You |
|---|---|---|
| C~p~ | (USL − LSL) ÷ 6σ | Is the spread narrow enough? (ignores centering) |
| C~pk~ | min[ (USL − μ) ÷ 3σ, (μ − LSL) ÷ 3σ ] | Is the process centered and capable? |

| C~pk~ Value | Interpretation |
|---|---|
| < 1.00 | Not capable |
| 1.00 – 1.33 | Barely capable (3σ) |
| 1.33 – 1.67 | Good (4σ) |
| ≥ 2.00 | Excellent (6σ) |

---

### Lean Systems

| Measure | Formula |
|---|---|
| Takt Time | Available production time per day ÷ Daily demand |
| Production Lead Time | Σ (WIP~i~ ÷ Daily demand) — convert each buffer to days |
| Process Cycle Efficiency (PCE) | (Total processing time ÷ Production lead time) × 100% |

**Kanban:** k = [ d × (v + r) × (1 + a) ] ÷ c — always round **up**

| Variable | Meaning |
|---|---|
| k | Number of containers (round up) |
| d | Daily demand (units/day) |
| v | Waiting/handling time (days) |
| r | Processing time per container (days) |
| a | Safety factor (e.g., 0.10 = 10%) |
| c | Units per container |

---

### Theory of Constraints

| Measure | Formula |
|---|---|
| Contribution Margin | Price − Raw Material Cost (labor is fixed — exclude it) |
| CM per Bottleneck Minute | Contribution Margin ÷ Time at bottleneck (min/unit) |

---

### Line Balancing

| Measure | Formula |
|---|---|
| Cycle time (c) | Available time ÷ Demand rate — max allowed time per station |
| Theoretical Minimum (TM) | Total task time ÷ c — round **up** |
| Efficiency | (Total task time ÷ (Stations × c)) × 100% |
| Balance Delay | 1 − Efficiency |
| Idle time per station | c − sum of assigned task times at that station |

---

### Capacity

**M = Σ [ (D~p~ × p~p~) + (D~p~ ÷ Q~p~) × s~p~ ] ÷ [ N × (1 − c/100) ] — round up**

| Variable | Meaning |
|---|---|
| M | Number of machines required |
| D~p~ | Annual demand for product p |
| p~p~ | Processing time per unit (minutes) |
| N | Available time per machine per year (minutes) |
| Q~p~ | Lot size for product p |
| s~p~ | Setup time per lot (minutes) |
| c | Desired capacity cushion (%) |

---



## CONCEPTUAL QUESTIONS — OBJECTIVE (10 Questions)



### **Question 1 (3 points) - Multiple Choice**

A hospital emergency department sees a highly varied mix of patients — some need a quick prescription refill while others require complex trauma care. The department uses flexible staffing, allows considerable nurse discretion, and workflows differ patient to patient. A consultant recommends standardizing processes into fixed protocols to improve efficiency.

Which of the following best describes the risk of this recommendation?

- [ ] A) Standardizing will increase capital intensity, which is always too expensive for service settings

- [ ] B) The recommendation would push the department off the strategic diagonal — imposing low-divergence structure on a high-contact, high-customization process

- [ ] C) Fixed protocols will increase resource flexibility, which conflicts with lean principles

- [ ] D) Standardization always leads to diseconomies of scale in service settings



---



### **Question 2 (3 points) - Multiple Choice**

A regional bakery has grown rapidly and now supplies 300 grocery stores. The owner is considering investing $2 million in a fully automated bread line that can produce only one product type at a constant rate.

Which of the following is the most accurate concern about this decision?

- [ ] A) Automation always creates diseconomies of scale, so the investment is never justified

- [ ] B) Fixed automation requires high, stable volume — if demand is variable or the product mix shifts, the investment loses its economic justification

- [ ] C) Flexible automation would be worse here because it cannot handle high volume

- [ ] D) The bakery should remain a job process to preserve customer involvement



---



### **Question 3 (3 points) - Multiple Choice**

CrestBrew, a regional craft beer company, has grown rapidly and is now evaluating whether to build a single large 120,000 sq ft brewing facility or stick with their current two smaller 60,000 sq ft facilities. The COO pushes back on the expansion plan, warning: *"At that scale, diseconomies of scale may start to creep in — we should think carefully before going bigger."*

What does the COO most likely mean by this warning?

- [ ] A) Doubling facility size doubles both fixed and variable costs, so average cost per unit stays constant — the expansion offers no real efficiency gain

- [ ] B) Beyond an optimal scale, average cost per unit begins to rise as coordination complexity, management overhead, and operational inefficiencies outweigh the benefits of size

- [ ] C) Concentrating all production in one large facility raises fixed costs significantly, so any drop in demand will sharply increase the cost per unit

- [ ] D) At that scale, the plant will require highly specialized brewing equipment, making it harder to adapt to new product lines or recipe changes



---



### **Question 4 (3 points) - Multiple Choice**

A paint shop tracks the number of surface defects per car body coming off the line. Each day, one car body is fully inspected and the total number of surface defects is counted.

Which control chart should be used, and why?

- [ ] A) X̄ and R chart — because paint quality is a continuous measurement taken in groups

- [ ] B) p-chart — because each car body either passes or fails inspection

- [ ] C) c-chart — because we are counting the number of defects on a single inspected unit, and one unit can have multiple defects

- [ ] D) p-chart — because sample sizes at automotive plants are always large



---



### **Question 5 (3 points) - Matching**

At Imroze Bakery, the operations manager has been conducting waste walks across the production floor. Match each observed situation to the correct type of waste.

| # | Observation | Waste Type |
|---|---|---|
| 1 | Roughly 9% of loaves are rejected after cooling due to underbaking and must be discarded or repurposed, consuming labor and ingredients. | _______________ |
| 2 | Baked loaves are held in large staging bins for hours before packaging begins, tying up floor space and making batch tracking difficult. | _______________ |
| 3 | Bakers frequently walk to the far end of the kitchen to retrieve ingredient bins that are not stored at their workstation. | _______________ |
| 4 | The packaging line can wrap 200 loaves per hour, but the oven only outputs 120 loaves per hour, leaving packaging staff idle. | _______________ |

**Options:** Inventory · Motion · Waiting · Defects · Transportation



---



### **Question 6 (3 points) - Multiple Choice**

Harvest Fresh, a large-scale food packaging company, has been struggling with throughput limitations on its canning line. The newly hired operations director, Marcus Webb, presents his improvement roadmap to the executive team:

*"Here is our plan. First, we identify which station on the canning line is limiting our output. Second, we squeeze every unit of capacity we can out of that station without new investment. Third, we align everything else in the plant to support that station's pace. Fourth, if it's still the constraint after all that, we invest in additional capacity to break the limit. This is our TOC implementation plan."*

Marcus's plan represents the complete TOC methodology.

- [ ] A) True

- [ ] B) False



---



### **Question 7 (3 points) - Multiple Choice**

NeoZapato is comparing two product mix strategies. Under the bottleneck method, the mix shifts toward products with lower total contribution margin per unit but better contribution margin per bottleneck minute.

A student argues: *"The traditional method must be better because it prioritizes the highest contribution margin per unit."* What is the flaw in this reasoning?

- [ ] A) The traditional method actually minimizes contribution margin — the student has it backwards

- [ ] B) When a resource is constrained, what matters is margin generated per unit of the scarce resource, not per unit of product — the bottleneck method maximizes total weekly profit even when some individual product margins are lower

- [ ] C) The student is correct — contribution margin per unit always produces the highest total profit regardless of constraints

- [ ] D) The bottleneck method only applies when all products use the same workstation



---



### **Question 8 (3 points) - Multiple Choice**

In a DBR system, the mechanism that controls the rate at which the bottleneck dictates the throughput of the entire plant by syncing with the materials release schedule is called the:

- [ ] A) Drum

- [ ] B) Buffer

- [ ] C) Kanban

- [ ] D) Rope



---



### **Question 9 (3 points) - Multiple Choice**

VineRidge Winery has been producing premium California wines for over two decades. When two of its largest rivals — Sonoma Hills and Pacific Crest Vineyards — each announced plans to expand their bottling and storage facilities by 35%, VineRidge's board quickly approved a comparable expansion, despite internal forecasts showing current capacity is still sufficient for the next two years.

Which capacity timing strategy is VineRidge following?

- [ ] A) Expansionist

- [ ] B) Follow the leader

- [ ] C) Wait-and-see

- [ ] D) Theory of Constraints



---



### **Question 10 (3 points) - Multiple Choice**

A control chart shows one point falling below the Lower Control Limit on a p-chart. The operations manager says: *"That's good news — fewer defects than expected. No action needed."*

What is the most accurate response?

- [ ] A) She is correct — points below the LCL always indicate process improvement and require no investigation

- [ ] B) She is incorrect — a point outside either limit, including below the LCL, signals an assignable cause. An unusually low defect rate could reflect a genuine improvement, but it could also mean a recording error or sampling problem. Both warrant investigation

- [ ] C) She is partially correct — points below the LCL are only concerning if they occur in two consecutive shifts

- [ ] D) p-charts do not have a Lower Control Limit, so the observation should be excluded from the chart



---



## PART B: QUANTITATIVE PROBLEMS AND SHORT ESSAY (15 Questions)


### **Question 11 (3 points) - Select All That Apply**

VeloShip Fulfillment's operations manager tracked customer complaints over the last quarter:

| Cause | Frequency |
|---|---|
| Wrong item shipped | 48 |
| Late delivery | 35 |
| Damaged packaging | 22 |
| Missing item in order | 11 |
| Incorrect address label | 4 |
| **Total** | **120** |

Using Pareto analysis, **select all causes VeloShip should prioritize** to address at least 80% of complaints.

- [ ] A) Wrong item shipped

- [ ] B) Late delivery

- [ ] C) Damaged packaging

- [ ] D) Missing item in order

- [ ] E) Incorrect address label



---



### **Question 12 (3 points) - Matching** — Fishbone / Cause-and-Effect

The manager of Smith, Schroeder, and Torn is investigating root causes of customer complaints following a series of problem deliveries. Issues identified include: truck broke down, ran out of packing boxes, multiple deliveries in one day caused the truck to be late, no furniture pads, employee dropped several items, driver got lost en route, ramp into truck was bent, no packing tape, new employee doesn't know how to pack, moving dolly has a broken wheel, and employee was late to work.

The cause-and-effect diagram below organizes these issues into four categories — **Manpower, Machinery, Material, Methods** — as labeled on the diagram.

![Fishbone diagram — Smith, Schroeder & Torn](images/fishbone.png)

Match each cause to its correct category number.

| # | Cause | Category |
|---|---|---|
| 1 | New employee doesn't know how to pack | _______________ |
| 2 | Moving dolly has a broken wheel | _______________ |
| 3 | Multiple deliveries scheduled on one trip | _______________ |
| 4 | No packing tape available | _______________ |

**Options:** 1 · 2 · 3 · 4



---



*NeoZapato operates two production facilities. Last week's data is summarized below. Each pair of sandals sells for $40.*

| | Tijuana Facility | Los Angeles Facility |
|---|---|---|
| Pairs produced | 1,600 | 2,100 |
| Labor hours worked | 320 | 350 |
| Labor cost per hr. (\$) | 12/hr | 45/hr |
| Materials cost (\$) | 2,800 | 5,200 |
| Overhead cost (\$) | 1,200 | 3,000 |



### **Question 13 (4 points)**

**1.** Which facility has higher **labor productivity** (units/hr)?

- [ ] A) Tijuana Facility
- [ ] B) LA Facility

**2.** Which facility has higher **multifactor productivity**?

- [ ] A) Tijuana Facility
- [ ] B) LA Facility



---



*TechAssemble's quality inspector selects 4 motherboards per shift and measures a critical dimension (mm). Data from 5 shifts shown below. Constants for n = 4: A₂ = 0.729, D₃ = 0, D₄ = 2.282.*

| Shift | x₁ | x₂ | x₃ | x₄ | Sample Mean | Sample Range |
|---|---|---|---|---|---|---|
| 1 | 10.4 | 10.2 | 10.5 | 10.3 | 10.35 | 0.3 |
| 2 | 10.1 | 9.8 | 10.3 | 10.2 | 10.1 | 0.5 |
| 3 | 10.6 | 10.7 | 10.4 | 10.5 | 10.55 | _____ |
| 4 | 10.2 | 10.3 | 10.1 | 10.4 | 10.25 | 0.3 |
| 5 | 10.5 | 10.3 | 10.4 | 10.6 | _____ | 0.3 |



### **Question 14 (4 points) - Multiple Choice**

Calculate the X̄-chart control limits.

- [ ] A) UCL = 10.588, LCL = 10.092

- [ ] B) UCL = 10.593, LCL = 10.067

- [ ] C) UCL = 10.528, LCL = 10.032

- [ ] D) UCL = 10.632, LCL = 10.048



---



### **Question 15 (3 points) - Short Answer**

Three frameworks — TQM, Lean, and TOC — are all aimed at improving operations, but each takes a fundamentally different approach.

In one to two sentences each, explain what distinguishes each framework. What does each one prioritize, and where does it direct improvement efforts?

---



### **Question 16 (6 points) - Matching**

Precision Parts Co. manufactures aerospace fastener brackets with tightly controlled mounting hole spacing. The design team has set a specification of **105.5 ± 0.3 mm** for this dimension. During a recent process audit, the quality engineer measured the following:

- Process mean (μ): **105.6 mm**
- Process standard deviation (σ): **0.09 mm**

Match each measure with its correct value.

| # | Measure | Value |
|---|---|---|
| 1 | Process Capability Ratio ($C_p$) | _______________ |
| 2 | Process Capability Index ($C_{pk}$) | _______________ |
| 3 | Maximum σ required to achieve 4-sigma capability (given current mean) | _______________ |

**Options:** 0.050 mm · 0.075 mm · 0.74 · 1.11 · 1.48 · 2.22



---



### **Question 17 (4 points) - Multiple Choice**

TechAssemble's quality team inspects a random sample of 150 motherboards per shift and records the number of defective units. Results from the last 10 shifts are shown below.

| Shift | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Defectives | 5 | 3 | 8 | 2 | 6 | 16 | 4 | 2 | 7 | 7 |

Select the appropriate chart type, calculate the control limits, and determine whether any shift is out of control.

- [ ] A) UCL = 0.096, LCL = 0; all shifts in control

- [ ] B) UCL = 0.088, LCL = 0; Shift 6 is out of control

- [ ] C) UCL = 0.088, LCL = 0; all shifts in control

- [ ] D) UCL = 0.092, LCL = 0; Shift 6 is out of control



---



### **Question 18 (4 points) - Multiple Choice**

Riverside Medical Center processes patient discharges through four sequential steps. The discharge unit operates one 10-hour shift per day and handles 40 discharges per day.

| Step | Cycle Time | WIP (patients waiting) |
|---|---|---|
| Medical Assessment | 8 min | 8 patients |
| Discharge Planning | 10 min | 12 patients |
| Pharmacy & Scripts | 6 min | 20 patients |
| Final Clearance | 5 min | 16 patients |

Calculate the takt time, total processing time, and total production lead time.

- [ ] A) Takt = 12 min; Total PT = 29 min; Total Lead Time = 1.40 days

- [ ] B) Takt = 15 min; Total PT = 29 min; Total Lead Time = 1.40 days

- [ ] C) Takt = 12 min; Total PT = 29 min; Total Lead Time = 1.75 days

- [ ] D) Takt = 15 min; Total PT = 29 min; Total Lead Time = 1.00 days



---



SunCrest Bakery produces artisan sourdough loaves for wholesale grocery distribution. The operations manager, Maya Chen, has mapped the current state of the production line to identify waste and opportunities for improvement. The bakery runs one shift per day with 27,000 seconds of available production time. Customer demand is 480 loaves per day.

The production process flows through four sequential steps — Mixing, Proofing, Baking, and Packaging — before loaves are staged for shipping. Inventory levels between steps, cycle times, changeover times, and uptime percentages are shown in the value stream map below.

![VSM Figure B — SunCrest Bakery](images/suncrest-vsm.png)

### **Question 19 (6 points) - Multiple Choice**

**Part a (2 pts)** — What is the total processing time?

- [ ] A) 100 sec
- [ ] B) 113 sec
- [ ] C) 123 sec
- [ ] D) 133 sec

**Part b (2 pts)** — What is the total production lead time?

- [ ] A) 7.5 days
- [ ] B) 9.5 days
- [ ] C) 11.5 days
- [ ] D) 13.0 days

**Part c (2 pts)** — What is the process cycle efficiency (PCE)?

- [ ] A) 0.02%
- [ ] B) 0.05%
- [ ] C) 0.08%
- [ ] D) 0.12%



---



### **Question 20 (4 points) - Multiple Choice**

VeloShip Fulfillment runs a Kanban loop between its Pick & Pack station and Quality Check station. The Quality Check team consumes 480 orders per day. Once an empty container is sent back to Pick & Pack, it sits on the transfer cart and waits in the queue for 2 hours before anyone begins refilling it. Once work begins, it takes 30 minutes to process and fill one container. Each container holds 24 orders. Management applies a 10% safety factor to account for demand variability. The facility runs one 8-hour shift per day.

How many Kanban containers should circulate in this loop?

- [ ] A) 5 containers

- [ ] B) 6 containers

- [ ] C) 7 containers

- [ ] D) 8 containers



---



*York-Perry Industries (YPI) manufactures three guitar models — A, B, and C — across four workstations (W, X, Y, Z). Each workstation has 2,400 minutes available per week. Product routings, processing times, prices, and weekly demand are shown below.*

![YPI — Product Routings & Workstation Data](images/yp-bottleneck.png)



### **Question 21 (6 points) - Multiple Choice**

If all products are made at maximum demand, which workstation is the bottleneck, and what is its total weekly workload?

- [ ] A) Workstation X, with a total load of 1,869 minutes

- [ ] B) Workstation W, with a total load of 2,436 minutes

- [ ] C) Workstation W, with a total load of 2,520 minutes

- [ ] D) Workstation Y, with a total load of 2,652 minutes



---



### **Question 22 (6 points) - Multiple Choice**

*Ridgeline Furniture allocates production time on its constrained CNC router (2,400 min/week) across three product lines.*

| Product | Contribution Margin | Bottleneck Time (min/unit) | Weekly Demand |
|---|---|---|---|
| Dining Table | $76 | 11 | 79 units |
| Bookshelf | $72 | 8 | 80 units |
| Cabinet | $80 | 17 | 60 units |

Using the bottleneck method, how many units of each product should Ridgeline produce weekly?

- [ ] A) Bookshelf = 80, Dining Table = 79, Cabinet = 52

- [ ] B) Cabinet = 60, Dining Table = 79, Bookshelf = 63

- [ ] C) Bookshelf = 80, Dining Table = 68, Cabinet = 60

- [ ] D) Cabinet = 60, Bookshelf = 80, Dining Table = 71



---



*PeakForm Athletic manufactures two lines of yoga mats on identical molding machines. The plant runs one 8-hour shift per day, 250 days per year, and maintains a 25% capacity cushion.*

| | Standard Mat | Pro Mat |
|---|---|---|
| Annual Demand | 15,000 units | 7,000 units |
| Processing Time | 8 min/unit | 18 min/unit |
| Average Lot Size | 50 units/lot | 35 units/lot |
| Setup Time per Lot | 30 min/lot | 60 min/lot |



### **Question 23 (5 points) - Multiple Choice**

How many machines does PeakForm require?

- [ ] A) 2 machines

- [ ] B) 3 machines

- [ ] C) 4 machines

- [ ] D) 5 machines



*Clearwater Instruments assembles a flow meter with 7 work elements. The table below shows task times and precedence relationships. The line must produce 45 units per hour.*

| Work Element | Time (sec) | Immediate Predecessor(s) |
|---|---|---|
| A | 40 | — |
| B | 30 | A |
| C | 50 | A |
| D | 25 | B |
| E | 20 | B |
| F | 30 | C |
| G | 15 | D, E, F |
| **Total** | **210 sec** | |

### **Question 24 (5 points) - Multiple Choice**

Calculate the cycle time, theoretical minimum stations, efficiency, and balance delay for this line.

- [ ] A) c = 45 sec; TM = 5 stations; Efficiency = 93.3%; Balance Delay = 6.7%

- [ ] B) c = 80 sec; TM = 3 stations; Efficiency = 87.5%; Balance Delay = 12.5%

- [ ] C) c = 80 sec; TM = 4 stations; Efficiency = 65.6%; Balance Delay = 34.4%

- [ ] D) c = 80 sec; TM = 3 stations; Efficiency = 75.0%; Balance Delay = 25.0%



---



### **Question 25 (7 points) - Multiple Choice**

ClearFlow Manufacturing assembles industrial filtration units on an assembly line. Each unit requires 11 work elements (A through K), totaling 363 seconds of work. The table and precedence diagram below describe the task times and sequencing requirements.

| Work Element | Time (sec) | Immediate Predecessor(s) |
|---|---|---|
| A | 35 | — |
| B | 75 | A |
| C | 20 | B |
| D | 40 | C |
| E | 13 | B |
| F | 65 | E |
| G | 53 | B |
| H | 26 | A |
| I | 15 | H |
| J | 8 | I, G |
| K | 13 | D, J, F |
| **Total** | **363 sec** | |

The line must produce 45 units per hour. Engineering has confirmed the cycle time is 80 seconds. Using the **shortest work element** rule, which tasks are assigned to each workstation?

- [ ] A) S1={A,H,I} · S2={B} · S3={E,C,D} · S4={G,J} · S5={F,K}

- [ ] B) S1={A,H,I} · S2={B} · S3={G,C} · S4={D,E,J} · S5={F,K}

- [ ] C) S1={A,B} · S2={C,H,I} · S3={E,G} · S4={D,J,F} · S5={K}

- [ ] D) S1={A,H,I} · S2={B} · S3={E,D} · S4={J,G} · S5={C,K,F}







*MGMT 339 · Exam 2 · Spring 2026*
