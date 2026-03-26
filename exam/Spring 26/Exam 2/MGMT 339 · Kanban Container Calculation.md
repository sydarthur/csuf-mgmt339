
## The Idea

In a Kanban (pull) system, parts move between workstations in **containers** — bins, totes, carts, or racks. When a downstream station uses up a container, the empty container is sent back upstream as a signal: _"I need more."_

The critical question: **How many containers should circulate in the loop?**

- Too few → the downstream station starves (stockouts, idle workers)
- Too many → you've defeated the purpose of pull; WIP piles up just like a push system

The Kanban formula gives you the exact number.

---

## The Formula

$$k = \frac{d(v + r)(1 + a)}{c}$$

|Variable|What It Means|Plain English|
|---|---|---|
|**k**|Number of Kanban containers|The answer — how many bins circulate in the loop|
|**d**|Daily demand (units/day)|How many units does the downstream station consume per day?|
|**v**|Waiting/handling time (days)|How long does the empty container sit on the dock, ride on a truck, or wait in a queue before someone starts refilling it?|
|**r**|Processing time per container (days)|How long does it actually take to process/produce/refill the container once work begins?|
|**a**|Safety factor (decimal)|A buffer for uncertainty — 0.10 means 10% extra|
|**c**|Units per container|How many parts physically fit in one bin?|

---

## Understanding the Formula — Piece by Piece

Before plugging in numbers, let's understand _why_ the formula is built the way it is.

### Piece 1: (v + r) = Total Lead Time

When the downstream station sends an empty container back, two things happen in sequence:

1. **Waiting (v):** The empty bin sits around — on a truck, on a loading dock, in a queue — before anyone starts working on it.
2. **Processing (r):** Someone actually refills the bin with new parts.

Added together, v + r is the **total lead time** — the total time you are _blind_ between sending the empty bin and getting a full one back. During this window, you're living off whatever inventory you still have on hand.

### Piece 2: d × (v + r) = Demand During Lead Time

If you consume **d** units per day, and you're blind for **(v + r)** days, then during that window you'll consume:

> d × (v + r) units

This is the minimum inventory you need to survive the replenishment gap. If you have fewer parts than this, you'll run out before the full container comes back.

### Piece 3: (1 + a) = The Safety Multiplier

Reality is messy. Trucks get flat tires. Demand spikes on random Tuesdays. Machines break down.

The safety factor **a** adds a percentage buffer on top of the calculated need. If a = 0.10, you're adding 10% more inventory as insurance.

> d × (v + r) × (1 + a) = total units needed (with safety buffer)

### Piece 4: Divide by c = Convert Units to Containers

The formula so far gives you a number of **units**. But Kanban doesn't circulate individual units — it circulates **containers**. So we divide by **c** (units per container) to get the number of bins.

> k = total units needed ÷ container size

If the math gives you a decimal, **always round up**. You can't have a fraction of a container.

---

## Example 1: Westerville Auto Parts

### The Scenario

The Westerville Auto Parts Company produces rocker-arm assemblies for steering and suspension systems in four-wheel-drive trucks.

**Given:**

|Variable|Value|Meaning|
|---|---|---|
|d|2,000 units/day|Daily demand for the rocker-arm assembly|
|v|0.08 days|Waiting/handling time per container cycle|
|r|0.02 days|Processing time per container cycle|
|a|0.10 (10%)|Safety stock — management says demand is uncertain enough to warrant 10%|
|c|22 parts|Each container holds 22 rocker-arm assemblies|

### The Calculation

**Step 1: Calculate total lead time**

$$v + r = 0.08 + 0.02 = 0.10 \text{ days}$$

This means from the moment an empty container leaves the downstream station, it takes 0.10 days (about 48 minutes in an 8-hour day) before a full one comes back.

**Step 2: Calculate demand during lead time**

$$d \times (v + r) = 2{,}000 \times 0.10 = 200 \text{ units}$$

During the 0.10-day replenishment window, the downstream station will consume 200 parts. You need at least 200 parts on hand to avoid running out.

**Step 3: Apply the safety factor**

$$200 \times (1 + 0.10) = 200 \times 1.10 = 220 \text{ units}$$

With the 10% buffer, you actually need 220 units of coverage.

**Step 4: Convert to containers**

$$k = \frac{220}{22} = 10 \text{ containers}$$

### Answer: 10 containers

Ten bins of rocker-arm assemblies need to circulate in the Kanban loop to keep the downstream station supplied without running out.

---

## Example 2: Westerville — Revised Layout

### The Scenario

A proposal to revise the plant layout would cut materials handling and waiting time from 0.08 days to **0.06 days**. Everything else stays the same.

**What changes:**

|Variable|Before|After|
|---|---|---|
|v|0.08 days|**0.06 days**|
|r|0.02 days|0.02 days (unchanged)|

### The Calculation

**Step 1: New total lead time**

$$v + r = 0.06 + 0.02 = 0.08 \text{ days}$$

The layout change shaved 0.02 days off the lead time.

**Step 2: Demand during lead time**

$$2{,}000 \times 0.08 = 160 \text{ units}$$

Down from 200. Faster replenishment means less inventory needed to bridge the gap.

**Step 3: Apply the safety factor**

$$160 \times 1.10 = 176 \text{ units}$$

**Step 4: Convert to containers**

$$k = \frac{176}{22} = 8 \text{ containers}$$

### Answer: 8 containers

The layout improvement reduces the system from 10 containers to 8 — a **20% reduction in authorized inventory**.

### What This Means

The layout change didn't touch the processing step at all. It only reduced the non-value-added waiting/handling time (v). And yet:

- 2 fewer containers circulating
- 44 fewer parts in the system (2 bins × 22 parts)
- Less WIP, less clutter, less capital tied up in inventory

This is a concrete example of the Lean principle: **attacking waiting time (non-value-added) has a direct, measurable impact on inventory levels**.

---

## Example 3: Coffee Shop Custom Cups

### The Scenario

You run a coffee shop and order custom printed cups from a supplier. They arrive in plastic tote bins. When a bin is empty, you send it back and they refill it. This is a Kanban loop.

**Given:**

|Variable|Value|Meaning|
|---|---|---|
|d|500 cups/day|Daily cup consumption|
|v|0.1 days|Empty bin sits on the truck / loading dock|
|r|0.2 days|Supplier prints and fills the bin|
|a|0.10 (10%)|Buffer for delivery delays or demand spikes|
|c|50 cups|Each tote bin holds 50 cups|

### The Calculation

**Step 1: Total lead time**

$$v + r = 0.1 + 0.2 = 0.3 \text{ days}$$

You're blind for 0.3 days between sending the empty bin and receiving a full one.

**Step 2: Demand during lead time**

$$500 \times 0.3 = 150 \text{ cups}$$

You'll burn through 150 cups while waiting for the refill.

**Step 3: Apply safety factor**

$$150 \times 1.10 = 165 \text{ cups}$$

**Step 4: Convert to containers**

$$k = \frac{165}{50} = 3.3 \rightarrow \text{round up to } 4 \text{ containers}$$

### Answer: 4 containers

Four plastic tote bins circulate between your coffee shop and the cup supplier — enough to cover demand during the replenishment lead time plus a 10% safety buffer, without cluttering your backroom with excess stock.

---

## Common Mistakes to Avoid

**1. Forgetting to round up.** If k = 3.3, the answer is 4, not 3. You can't have 0.3 of a container. Rounding down means you will run out of parts.

**2. Confusing v and r.** Waiting time (v) is non-value-added — the bin is sitting idle. Processing time (r) is value-added — someone is actually making/filling parts. Both contribute to lead time, but they represent different types of time.

**3. Using a as a whole number.** If the safety factor is 10%, use a = 0.10 in the formula — not 10. The formula uses (1 + a), so (1 + 0.10) = 1.10. Using (1 + 10) = 11 would give you an absurdly large answer.

**4. Thinking more containers = better.** More containers means more inventory in the system. The whole point of Kanban is to use the _minimum_ number of containers that prevents stockouts. Every extra container is waste.

---

## The Bigger Picture

The Kanban formula connects directly to the Lean principles from the VSM:

| VSM Concept                    | Kanban Connection                                                              |
| ------------------------------ | ------------------------------------------------------------------------------ |
| **Lead Time**                  | v + r is the replenishment lead time within the Kanban loop                    |
| **Work-in-process (WIP)**      | k × c is the total authorized WIP in the system                                |
| **Non-value-added time (NVA)** | v (waiting/handling) is pure NVA — reducing it directly reduces k              |
| **Continuous improvement**     | As you reduce v and r through kaizen, k shrinks — less inventory, tighter flow |

The formula is simple. The thinking behind it is powerful: **define your lead time, acknowledge your uncertainty, and size your buffers deliberately — instead of piling up inventory "just in case."**