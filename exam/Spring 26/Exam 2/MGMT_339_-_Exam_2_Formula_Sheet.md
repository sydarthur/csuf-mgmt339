---
title: MGMT 339 - Exam 2 Formula Sheet
author: Sid Yamalakonda | Spring 2026
---

# Formula Sheet — Quantitative Reference

---

## Process Analysis

### Productivity

| Measure | Formula |
|---|---|
| Labor Productivity | $\dfrac{\text{Output (units or \$)}}{\text{Labor hours}}$ |
| Multifactor Productivity (MFP) | $\dfrac{\text{Output value (\$)}}{\text{Labor} + \text{Materials} + \text{Overhead}}$ |

> All inputs must be converted to dollars before computing MFP.

### Learning Curve

$$T_n = T_1 \cdot n^{\,b} \qquad \text{where} \quad b = \frac{\ln(r)}{\ln(2)}$$

- $T_n$ = time for the $n$th unit
- $T_1$ = time for the first unit
- $r$ = learning rate (e.g., 0.80 for an 80% curve)

**Doubling shortcut:** Multiply by $r$ each time cumulative output doubles: Unit 1 → 2 → 4 → 8 → …

---

## Quality Management

### Control Charts — X̄ and R Chart

| Step | Measure | Formula |
|---|---|---|
| Sample mean | $\bar{X}$ per sample | $\dfrac{x_1 + x_2 + \cdots + x_n}{n}$ |
| Sample range | $R$ per sample | $x_{\max} - x_{\min}$ |
| Grand mean | $\bar{\bar{X}}$ | $\dfrac{\sum \bar{X}}{k}$ |
| Average range | $\bar{R}$ | $\dfrac{\sum R}{k}$ |
| X̄ chart limits | UCL / LCL | $\bar{\bar{X}} \pm A_2 \bar{R}$ |
| R chart limits | UCL | $D_4 \bar{R}$ |
| R chart limits | LCL | $D_3 \bar{R}$ |

> $n$ = observations per sample (use to look up $A_2$, $D_3$, $D_4$). $k$ = number of samples.

**Common constants (provided on exam):**

| $n$ | $A_2$ | $D_3$ | $D_4$ |
|---|---|---|---|
| 2 | 1.880 | 0 | 3.267 |
| 3 | 1.023 | 0 | 2.575 |
| 4 | 0.729 | 0 | 2.282 |
| 5 | 0.577 | 0 | 2.115 |

### Control Charts — p-Chart

| Step | Formula |
|---|---|
| Defect rate per sample | $p_i = \dfrac{\text{defects}}{n}$ |
| Overall proportion | $\bar{p} = \dfrac{\text{total defects}}{\text{total observations}}$ |
| Standard deviation | $\sigma_p = \sqrt{\dfrac{\bar{p}(1-\bar{p})}{n}}$ |
| Control limits | $UCL = \bar{p} + 3\sigma_p \quad LCL = \bar{p} - 3\sigma_p$ |

> If LCL < 0, set LCL = 0.

### Control Charts — c-Chart

| Step | Formula |
|---|---|
| Average defects per unit | $\bar{c} = \dfrac{\sum c}{k}$ |
| Standard deviation | $\sigma = \sqrt{\bar{c}}$ |
| Control limits | $UCL = \bar{c} + 3\sqrt{\bar{c}} \quad LCL = \bar{c} - 3\sqrt{\bar{c}}$ |

> If LCL < 0, set LCL = 0.

### Which Chart to Use

| Data Type | Question | Chart |
|---|---|---|
| Continuous measurements, small groups | How consistent is my output? | X̄ & R |
| Proportion defective across a batch | What fraction is bad? | p-chart |
| Count of defects on one unit | How many defects per unit? | c-chart |

### Process Capability

| Measure | Formula | What It Tells You |
|---|---|---|
| $C_p$ | $\dfrac{USL - LSL}{6\sigma}$ | Is the spread narrow enough to fit within spec? (ignores centering) |
| $C_{pk}$ | $\min\!\left(\dfrac{USL - \mu}{3\sigma},\ \dfrac{\mu - LSL}{3\sigma}\right)$ | Is the process actually performing within spec? (accounts for centering) |

**Interpretation:**

| $C_{pk}$ | Meaning |
|---|---|
| < 1.00 | Not capable |
| 1.00 – 1.33 | Barely capable (3$\sigma$) |
| 1.33 – 1.67 | Good (4$\sigma$) |
| ≥ 2.00 | Excellent (6$\sigma$) |

> $C_{pk} \leq C_p$ always. $C_{pk} = C_p$ only when perfectly centered.

---

## Lean Systems

### Takt Time

$$\text{Takt Time} = \frac{\text{Available production time per day}}{\text{Daily demand}}$$

### Production Lead Time

$$\text{Lead Time} = \sum \frac{\text{WIP}_i}{\text{Daily demand}}$$

Convert each inventory buffer to days; processing time is typically negligible.

### Process Cycle Efficiency

$$\text{PCE} = \frac{\text{Total processing time}}{\text{Production lead time}} \times 100\%$$

### Kanban Container Formula

$$k = \frac{d\,(v + r)\,(1 + a)}{c}$$

| Variable | Meaning |
|---|---|
| $k$ | Number of containers (round **up**) |
| $d$ | Daily demand (units/day) |
| $v$ | Waiting / handling time (days) — non-value-added |
| $r$ | Processing time per container (days) — value-added |
| $a$ | Safety factor (e.g., 0.10 = 10%) |
| $c$ | Units per container |

> $(v + r)$ = total replenishment lead time. Always round $k$ **up**.

---

## Constraints

### TOC Product Mix

$$\text{Contribution Margin} = \text{Price} - \text{Raw Material Cost}$$

$$\text{CM per Bottleneck Minute} = \frac{\text{Contribution Margin}}{\text{Time at bottleneck (min/unit)}}$$

**Bottleneck method sequence:**
1. Products that **do not use** the bottleneck → make all (first priority, "free")
2. Rank remaining products by CM per bottleneck minute, highest to lowest
3. Allocate bottleneck capacity in that order until it runs out

> Labor is a **fixed cost** in TOC — exclude it from contribution margin.

### Line Balancing

| Measure | Formula |
|---|---|
| Desired output rate | $r = \dfrac{\text{Demand}}{\text{Available time}}$ |
| Cycle time | $c = \dfrac{\text{Available time}}{\text{Demand}}$ |
| Theoretical minimum stations | $TM = \dfrac{\text{Total task time}}{c}$ + round **up** |
| Efficiency | $\dfrac{\text{Total task time}}{\text{Stations} \times c} \times 100\%$ |
| Balance delay | $1 - \text{Efficiency}$ |
| Idle time per station | $c - \text{sum of assigned task times at that station}$ |

> Cycle time in line balancing = **maximum allowed time per station** (set by demand). Not the same as VSM cycle time.

---

## Capacity

### Capacity Requirement (Input Measure)

$$M = \frac{\displaystyle\sum_{p} \left[\frac{D_p \times p_p}{N} + \frac{D_p}{Q_p} \times s_p\right]}{1 - \dfrac{c}{100}}$$

| Variable | Meaning |
|---|---|
| $M$ | Number of machines (or workers) required |
| $D_p$ | Annual demand for product $p$ |
| $p_p$ | Processing time per unit of product $p$ (hours) |
| $N$ | Total available time per machine per year (hours) |
| $Q_p$ | Lot size for product $p$ |
| $s_p$ | Setup time per lot for product $p$ (hours) |
| $c$ | Desired capacity cushion (%) |

> Round $M$ **up** to the nearest whole machine.

---

*MGMT 339 · Exam 2 · Spring 2026*
