

## The Idea

A Value Stream Map captures the entire flow of a product from raw material to customer. But the map isn't just a picture — it produces **five key numbers** that tell you how the system is actually performing:

|Measure|What It Tells You|
|---|---|
|**Takt Time**|How fast must we produce to keep up with the customer?|
|**Bottleneck**|Which step is the slowest — the constraint on the whole system?|
|**Total Processing Time**|How much actual work (value-added time) touches the product?|
|**Production Lead Time**|How long does a unit spend in the system from start to finish?|
|**Process Cycle Efficiency**|What percentage of the total time is actual work vs. waiting?|

---

## Example Scenario: Metcalf, Inc.

Metcalf manufactures engine assembly brackets for automotive customers. The process has four sequential steps: Forming → Drilling → Grinding → Packaging, after which brackets are staged for shipping.

### Overall Process Data

|Attribute|Value|
|---|---|
|Average demand|2,700 units/day|
|Batch size|50 units|
|Number of shifts per day|2|
|Availability per shift|8 hours|

### Process Step Data

| |Forming|Drilling|Grinding|Packaging|
|---|---|---|---|---|
|Cycle time|11 sec|10 sec|17 sec|15 sec|
|Setup time|3 min|2 min|0 sec|0 sec|
|Uptime|100%|90%|100%|100%|
|Operators|1|1|1|1|

### WIP (Inventory Between Steps)

|Location|WIP|
|---|---|
|Before Forming|4,000 units|
|Before Drilling|5,000 units|
|Before Grinding|2,000 units|
|Before Packaging|1,600 units|

### Information Flow

- All communications with customers are electronic
- Weekly order release for Forming
- All material is pushed

---

## Calculation 1: Takt Time

### What Is It?

Takt time is the **pace of customer demand** — the maximum time you can spend on each unit and still keep up. It's not how fast you _are_ producing; it's how fast you _need to_ produce.

Think of it as a metronome. If takt time is 21 seconds, then the customer expects one finished bracket to come off the line every 21 seconds, all day long.

### The Formula

$$\text{Takt Time} = \frac{\text{Available Production Time per Day}}{\text{Daily Demand}}$$

### Step-by-Step

**Step 1: Calculate available production time per day**

We have 2 shifts, each 8 hours long.

$$2 \text{ shifts} \times 8 \text{ hours/shift} = 16 \text{ hours/day}$$

Convert to seconds (since cycle times are in seconds):

$$16 \text{ hours} \times 3{,}600 \text{ sec/hour} = 57{,}600 \text{ seconds/day}$$

**Step 2: Divide by daily demand**

$$\text{Takt Time} = \frac{57{,}600 \text{ sec}}{2{,}700 \text{ units}} = 21.33 \text{ seconds/unit}$$

### Answer: 21.3 seconds per unit

This means one bracket must be completed every 21.3 seconds to match customer demand. Any step with a cycle time above 21.3 seconds would be unable to keep up.

---

## Calculation 2: Identify the Bottleneck

### What Is It?

The bottleneck is the **slowest step** in the process — the one with the longest cycle time. It limits the output of the entire system, because no downstream step can process faster than the bottleneck feeds it.

### Step-by-Step

Look at the cycle times for each step:

|Step|Cycle Time|
|---|---|
|Forming|11 seconds|
|Drilling|10 seconds|
|**Grinding**|**17 seconds**|
|Packaging|15 seconds|

### Answer: Grinding (17 seconds)

Grinding has the longest cycle time at 17 seconds per unit. The entire line can produce no faster than one bracket every 17 seconds, regardless of how fast the other steps are.

### Is the Bottleneck a Problem?

Compare the bottleneck cycle time to the takt time:

- Bottleneck (Grinding): 17 seconds
- Takt time: 21.3 seconds

17 < 21.3 — the bottleneck is **faster** than the required pace. This means the line _can_ keep up with demand. If the bottleneck cycle time exceeded the takt time, the line would fall behind.

### A Note on Uptime

Drilling has only 90% uptime. Its _effective_ cycle time is:

$$\frac{10 \text{ sec}}{0.90} = 11.1 \text{ seconds}$$

Even adjusted for downtime, Drilling (11.1 sec) is still faster than Grinding (17 sec). Grinding remains the bottleneck. However, if you're asked to consider uptime in bottleneck identification, always check the effective cycle time: divide the nominal cycle time by the uptime percentage.

---

## Calculation 3: Total Processing Time

### What Is It?

Total processing time is the sum of all **value-added cycle times** — the actual hands-on work that transforms the product. It answers: _if you could magically eliminate all waiting, how long would it take to make one bracket?_

This number goes in the **low valleys** of the VSM timeline.

### The Formula

$$\text{Total Processing Time} = \sum \text{(all cycle times)}$$

### Step-by-Step

$$11 + 10 + 17 + 15 = 53 \text{ seconds}$$

|Step|Cycle Time|
|---|---|
|Forming|11 sec|
|Drilling|10 sec|
|Grinding|17 sec|
|Packaging|15 sec|
|**Total**|**53 seconds**|

### Answer: 53 seconds

It takes just 53 seconds of actual work to make one bracket. Less than a minute. Keep this number in mind — we're about to compare it to how long the bracket _actually_ spends in the system.

---

## Calculation 4: Production Lead Time

### What Is It?

Production lead time is the **total time a unit spends in the system** from the moment raw material arrives to the moment the finished product is ready for shipping. It includes all the waiting time — sitting in WIP piles between stations.

This is the number the _customer_ experiences. It goes in the **high peaks** of the VSM timeline.

### The Formula

To convert a WIP pile into waiting time (days), divide the inventory by the daily demand:

$$\text{Wait Time (days)} = \frac{\text{WIP (units)}}{\text{Daily Demand (units/day)}}$$

Then sum all the wait times to get total lead time. (Processing time is so small relative to days that it's typically treated as negligible in the total.)

### Step-by-Step

**Step 1: Convert each WIP buffer to days**

|Location|WIP|÷ Daily Demand|= Wait Time|
|---|---|---|---|
|Before Forming|4,000 units|÷ 2,700|**1.48 days**|
|Before Drilling|5,000 units|÷ 2,700|**1.85 days**|
|Before Grinding|2,000 units|÷ 2,700|**0.74 days**|
|Before Packaging|1,600 units|÷ 2,700|**0.59 days**|

**Step 2: Sum all wait times**

$$1.48 + 1.85 + 0.74 + 0.59 = 4.67 \text{ days}$$

**Step 3: Add processing time (optional precision)**

The 53 seconds of processing time is negligible compared to 4.67 days (a day has 57,600 working seconds), so:

$$\text{Production Lead Time} \approx 4.67 \text{ days}$$

### Answer: 4.7 days

A bracket sits in the Metcalf system for nearly 5 days — but only 53 seconds of that is actual work.

---

## Calculation 5: Process Cycle Efficiency (Bonus)

### What Is It?

Process Cycle Efficiency (PCE) answers the ultimate Lean question: what percentage of the total lead time is actual value-added work?

$$\text{PCE} = \frac{\text{Total Processing Time}}{\text{Production Lead Time}} \times 100$$

### Step-by-Step

First, convert both numbers to the same unit. Let's put lead time in seconds:

$$4.67 \text{ days} \times 57{,}600 \text{ sec/day} = 269{,}030 \text{ seconds}$$

$$\text{PCE} = \frac{53}{269{,}030} \times 100% = 0.02%$$

### Answer: ~0.02%

Out of the 4.7 days a bracket spends in the system, only 53 seconds — 0.02% — is real work. The other 99.98% is **pure waiting**.

This is the number that hits like a ton of bricks. A traditional manager would spend money on a faster grinding machine to shave 2 seconds off the cycle time. A Lean manager looks at 4.7 days of waiting time and asks: _"Why is there a pile of 5,000 brackets sitting in front of the drill?"_

---

## The VSM Timeline — Putting It All Together

The bottom of a Value Stream Map shows the staircase timeline. Here's what Metcalf's looks like:

```
HIGH PEAKS (Waiting — NVA)           LOW VALLEYS (Processing — VA)
─────────────────────────            ─────────────────────────────
1.48 days (before Forming)           11 sec (Forming)
1.85 days (before Drilling)          10 sec (Drilling)
0.74 days (before Grinding)          17 sec (Grinding)
0.59 days (before Packaging)         15 sec (Packaging)
─────────────────────────            ─────────────────────────────
= 4.67 days                         = 53 seconds
```

The contrast between the peaks and valleys is the entire point of the map. Days vs. seconds. That visual gap tells you exactly where to focus your improvement efforts — and it's never on the seconds.

---

## Summary of Key Formulas

|Measure|Formula|Metcalf Answer|
|---|---|---|
|**Takt Time**|Available time ÷ Demand|57,600 ÷ 2,700 = **21.3 sec**|
|**Bottleneck**|Step with longest cycle time|**Grinding (17 sec)**|
|**Total Processing Time**|Sum of all cycle times|11 + 10 + 17 + 15 = **53 sec**|
|**Production Lead Time**|Sum of (WIP ÷ Demand) for each buffer|4,000 + 5,000 + 2,000 + 1,600 all ÷ 2,700 = **4.7 days**|
|**Process Cycle Efficiency**|Processing time ÷ Lead time|53 sec ÷ 4.67 days ≈ **0.02%**|

---

## Common Mistakes to Avoid

**1. Forgetting to use both shifts for takt time.** If there are 2 shifts at 8 hours each, available time is 16 hours — not 8. The most common error is dividing 28,800 (one shift) by demand instead of 57,600 (two shifts).

**2. Confusing cycle time with takt time.** Cycle time is how fast a step _actually works_. Takt time is how fast it _needs to_ work. They're not the same thing. If cycle time > takt time at any step, you can't meet demand.

**3. Using processing time in lead time.** When calculating production lead time, the WIP wait times (measured in days) dominate. The processing time (measured in seconds) is negligible. Don't convert 53 seconds to days and add it — it won't change the answer.

**4. Including setup time in processing time.** Total processing time is the sum of **cycle times only** — the per-unit value-added work. Setup time is a per-batch cost and is not included in the per-unit processing time calculation on the VSM timeline.

**5. Not checking uptime for bottleneck.** A step with a low cycle time but poor uptime might have a higher _effective_ cycle time than it appears. Always check: effective C/T = nominal C/T ÷ uptime. In Metcalf's case, Drilling's effective C/T = 10 ÷ 0.90 = 11.1 sec — still not the bottleneck, but worth checking.