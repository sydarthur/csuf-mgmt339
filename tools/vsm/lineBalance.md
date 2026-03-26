# Line Balancing — Step-by-Step Walkthrough

## The Big Idea

Imagine you're managing an assembly line that makes fertilizer spreaders. The total work to assemble one spreader takes 244 seconds. You have multiple workers, each at their own workstation, and the product moves from one station to the next.

Here's the problem: **how do you divide 244 seconds of work across your workstations so that nobody is overloaded, nobody is sitting idle, and the line keeps pace with customer demand?**

That's line balancing.

---

## The Key Terms

Before we get into the method, we need five terms. Each one builds on the previous.

### 1. Desired Output Rate (r)

This is how many units the line needs to produce per hour (or per day, per week, etc.) to meet demand.

$$
r = \frac{\text{Demand}}{\text{Available production time}}
$$

**Example:** If demand is 2,440 units per week and the line operates 40 hours per week:

$$
r = \frac{2440}{40} = 61 \text{ units/hour} \approx 60 \text{ units/hour}
$$

### 2. Cycle Time (c)

In line balancing, cycle time is the **maximum time allowed at each workstation**. It's the inverse of the output rate — the time between one finished unit and the next rolling off the line.

$$
c = \frac{1}{r} = \frac{\text{Available time}}{\text{Desired output}}
$$

**Example:** If we need 60 units per hour:

$$
c = \frac{3600 \text{ sec/hr}}{60 \text{ units/hr}} = 60 \text{ seconds per unit}
$$

This means no workstation can have more than 60 seconds of assigned work. If a station's total task time exceeds 60 seconds, the line can't keep up.

> **Important:** This is _not_ the same "cycle time" from the VSM. On a VSM, cycle time is how long a step actually takes. In line balancing, cycle time is the maximum allowed time — it's set by demand, not by the process.

### 3. Theoretical Minimum (TM)

The minimum number of workstations you'd need if you could divide the work perfectly evenly.

$$
TM = \left\lceil \frac{\text{Total task time}}{\text{Cycle time}} \right\rceil
$$

**Example:** Total task time = 244 seconds, cycle time = 60 seconds:

$$
TM = \left\lceil \frac{244}{60} \right\rceil = \lceil 4.07 \rceil = 5 \text{ stations}
$$

You can't have 0.07 of a station, so round up. This is the _best case_ — in practice, you'll often need the same number or one more due to precedence constraints.

### 4. Efficiency

How well did we use the available capacity?

$$
\text{Efficiency} = \frac{\text{Total task time}}{N \times c} \times 100\%
$$

**Example:** If we end up with 5 stations at 60 seconds each:

$$
\text{Efficiency} = \frac{244}{5 \times 60} = \frac{244}{300} = 81.3\%
$$

The remaining 18.7% is idle time — seconds where workers are waiting for the next unit to arrive.

### 5. Idle Time and Balance Delay

**Idle time** at a station = cycle time − sum of assigned task times at that station.

**Balance delay** = 1 − Efficiency. It represents the percentage of time the line is idle across all stations.

$$
\text{Balance Delay} = 1 - 0.813 = 18.7\%
$$

---

## The Scenario: Green Grass Fertilizer Spreader

A company assembles a fertilizer spreader with 9 work elements (A through I). Here's the data:

| Work Element | Description | Time (sec) | Immediate Predecessor(s) |
| --- | --- | --- | --- |
| A | Bolt leg frame to hopper | 40 | None |
| B | Insert impeller shaft | 30 | A |
| C | Attach axle | 50 | A |
| D | Attach agitator | 40 | B |
| E | Attach drive wheel | 6 | B |
| F | Attach free wheel | 25 | C |
| G | Mount lower post | 15 | C |
| H | Attach controls | 20 | D, E |
| I | Mount nameplate | 18 | F, G |
| **Total** | | **244 sec** | |

**Given:**

- Desired output rate: 60 units/hour
- Cycle time: 60 seconds/unit

---

## Step 1: Draw the Precedence Diagram

### Why Do We Need This?

You can't just randomly assign tasks to stations. Some tasks must come before others — you can't attach the agitator (D) until the impeller shaft (B) is installed, and B can't happen until the leg frame (A) is bolted.

The **precedence diagram** shows these dependencies visually so you can see which tasks are available to assign at any point.

### How to Read the Predecessor Column

- **"None"** means the task can start immediately — it has no prerequisites.
- **"A"** means task A must be finished before this task can begin.
- **"D, E"** means _both_ D and E must be finished first.

### The Diagram

```
        ┌── B (30) ──┬── D (40) ──┐
        │            │            ├── H (20)
A (40) ─┤            └── E (6) ───┘
        │
        └── C (50) ──┬── F (25) ──┐
                     │            ├── I (18)
                     └── G (15) ──┘
```

Reading the diagram:

- **A** is the starting point (no predecessors)
- After A, two parallel paths open: **B** and **C**
- B leads to D and E; both D and E must finish before H
- C leads to F and G; both F and G must finish before I
- H and I are the final tasks (no successors)

---

## Step 2: Choose an Assignment Rule

When building workstations, you'll often have multiple tasks that are eligible for assignment (their predecessors are done and they fit within the remaining cycle time). You need a **tiebreaker rule** to decide which one to assign first.

Common rules:

| Rule | Logic |
| --- | --- |
| **Longest task time** | Assign the biggest task first — it's hardest to fit later |
| **Most followers** | Assign the task with the most downstream dependents — keeps options open |
| Shortest task time | Opposite of longest — fills gaps with small tasks |
| Fewest followers | Opposite of most followers |

No single rule guarantees the best solution. We'll use **longest task time** for this example — it's the most commonly taught rule and tends to work well in practice.

---

## Step 3: Assign Tasks to Workstations

### The Algorithm

For each station, repeat this process:

1. **List candidates** — tasks whose predecessors have ALL been assigned already
2. **Check fit** — only candidates whose task time ≤ remaining time at this station
3. **Apply the rule** — pick the candidate with the longest task time
4. **Assign it** — subtract its time from the station's remaining time
5. **Repeat** until no more candidates fit, then start a new station

### Let's Go

**Cycle time = 60 seconds per station.**

---

#### Workstation S1

_Remaining time: 60 seconds_

**Candidates:** Only **A** (40 sec) — it's the only task with no predecessors.

- Assign **A** (40 sec) → Remaining: 60 − 40 = **20 sec**

**New candidates now that A is done:** B (30 sec) and C (50 sec). But B needs 30 sec and C needs 50 sec — neither fits in 20 sec remaining.

Any other unassigned tasks? None are eligible (all depend on A, B, or C).

**S1 = { A } — Total: 40 sec — Idle: 20 sec**

---

#### Workstation S2

_Remaining time: 60 seconds_

**Candidates:** B (30 sec) and C (50 sec) — both have predecessor A completed.

Apply rule (longest time): **C (50 sec)** wins over B (30 sec).

- Assign **C** (50 sec) → Remaining: 60 − 50 = **10 sec**

**New candidates:** B (30 sec) — still available, but needs 30 sec (doesn't fit in 10). F (25 sec) and G (15 sec) become eligible now that C is done — F needs 25 (doesn't fit), G needs 15 (doesn't fit).

**S2 = { C } — Total: 50 sec — Idle: 10 sec**

---

#### Workstation S3

_Remaining time: 60 seconds_

**Candidates:** B (30 sec), F (25 sec), G (15 sec)

Apply rule (longest time): **B (30 sec)** is longest.

- Assign **B** (30 sec) → Remaining: 60 − 30 = **30 sec**

**New candidates now that B is done:** D (40 sec) and E (6 sec) become eligible. Plus F (25 sec) and G (15 sec) are still available.

Candidates that fit (≤ 30 sec): **F (25)**, **G (15)**, **E (6)**. (D needs 40 — too big.)

Apply rule (longest time): **F (25 sec)** is longest.

- Assign **F** (25 sec) → Remaining: 30 − 25 = **5 sec**

Candidates that fit (≤ 5 sec): None. E needs 6, G needs 15, D needs 40.

**S3 = { B, F } — Total: 55 sec — Idle: 5 sec**

---

#### Workstation S4

_Remaining time: 60 seconds_

**Candidates:** D (40 sec), E (6 sec), G (15 sec)

Apply rule (longest time): **D (40 sec)** is longest.

- Assign **D** (40 sec) → Remaining: 60 − 40 = **20 sec**

Candidates that fit (≤ 20 sec): **G (15)**, **E (6)**.

Apply rule (longest time): **G (15 sec)** is longest.

- Assign **G** (15 sec) → Remaining: 20 − 15 = **5 sec**

Candidates that fit (≤ 5 sec): None. E needs 6 — doesn't fit by 1 second!

**S4 = { D, G } — Total: 55 sec — Idle: 5 sec**

---

#### Workstation S5

_Remaining time: 60 seconds_

**Candidates:** E (6 sec) — predecessor B is done ✓. I (18 sec) — predecessors F and G are both done ✓.

Apply rule (longest time): **I (18 sec)** wins over E (6 sec).

- Assign **I** (18 sec) → Remaining: 60 − 18 = **42 sec**

Candidates that fit: E (6 sec).

- Assign **E** (6 sec) → Remaining: 42 − 6 = **36 sec**

**New candidates now that both D and E are done:** H (20 sec) — predecessors D and E are both complete ✓.

- Assign **H** (20 sec) → Remaining: 36 − 20 = **16 sec**

No more unassigned tasks.

**S5 = { I, E, H } — Total: 44 sec — Idle: 16 sec**

---

## Step 4: The Final Assignment Summary

| Station | Tasks | Task Times | Station Total | Idle Time |
| --- | --- | --- | --- | --- |
| S1 | A | 40 | 40 sec | 20 sec |
| S2 | C | 50 | 50 sec | 10 sec |
| S3 | B, F | 30 + 25 | 55 sec | 5 sec |
| S4 | D, G | 40 + 15 | 55 sec | 5 sec |
| S5 | I, E, H | 18 + 6 + 20 | 44 sec | 16 sec |
| **Total** | | | **244 sec** | **56 sec** |

---

## Step 5: Calculate Efficiency

$$
\text{Efficiency} = \frac{\text{Total task time}}{N \times c} = \frac{244}{5 \times 60} = \frac{244}{300} = 81.3\%
$$

$$
\text{Balance Delay} = 1 - 0.813 = 18.7\%
$$

**Interpretation:** 81.3% of the available line capacity is being used for actual work. The remaining 18.7% is idle time spread across the five stations. The heaviest idle time is at S1 (20 sec) and S5 (16 sec).

---

## Why Does This Matter?

### Connection to Cycle Time and Demand

If demand changes, the cycle time changes, and the entire balance shifts:

| Demand | Cycle Time | Min Stations | Efficiency |
| --- | --- | --- | --- |
| 60 units/hr | 60 sec | 5 | 81.3% |
| 40 units/hr | 90 sec | 3 | 90.4% |
| 80 units/hr | 45 sec | 6 | 90.4% |

A longer cycle time means fewer stations and potentially higher efficiency — but only if demand supports the slower pace.

### Connection to TOC

Line balancing and Theory of Constraints both deal with uneven workloads, but from different angles:

| Dimension | Line Balancing | Theory of Constraints |
| --- | --- | --- |
| **Focus** | Distribute work evenly across stations | Identify and improve the single bottleneck |
| **Goal** | Minimize idle time | Maximize system throughput |
| **When to use** | Designing a new line or rebalancing for new demand | Improving an existing line with an identified constraint |

---

## Common Mistakes to Avoid

**1. Assigning a task before its predecessors are done.** Always check the "Immediate Predecessor" column. If D requires B, and B hasn't been assigned yet, D is not a candidate — no matter how much time is left at the station.

**2. Forgetting that BOTH predecessors must be done.** Task H requires D _and_ E. If D is done but E is not, H is not yet eligible. Both must be assigned before H becomes a candidate.

**3. Confusing "cycle time" across contexts.** In VSM, cycle time = how fast a step works. In line balancing, cycle time = maximum allowed time per station (set by demand). They use the same term but mean different things.

**4. Rounding the theoretical minimum down.** TM = 244/60 = 4.07. The answer is 5, not 4. You always round up — you can't build 0.07 of a workstation.

**5. Stopping too early at a station.** After assigning a task, always re-check if any other eligible candidates fit in the remaining time. Students often move to a new station when there was still room to squeeze in a small task like E (6 sec).

**6. Thinking one rule is always best.** The "longest task time" rule is a heuristic — it usually works well, but it doesn't guarantee the optimal solution. Different rules may produce different (sometimes better) balances for the same problem.
