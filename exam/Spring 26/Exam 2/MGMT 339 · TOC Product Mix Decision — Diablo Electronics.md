
## The Scenario

> The senior management at Diablo Electronics wants to improve profitability by accepting the right set of orders, and so collected some additional financial data.
> 
> Variable overhead costs are $8,500 per week. Each worker is paid $18 per hour and is paid for an entire week, regardless of how much the worker is used. Consequently, labor costs are fixed expenses. The plant operates one 8-hour shift per day, or 40 hours each week. Assume 5 workers.
> 
> Currently, decisions are made using the traditional method, which is to accept as much of the highest contribution margin product as possible (up to the limit of its demand), followed by the next highest contribution margin product, and so on until no more capacity is available.
> 
> Pedro Rodriguez, the newly hired production supervisor, is knowledgeable about the TOC and bottleneck-based scheduling. He believes that profitability can indeed be improved if bottleneck resources were exploited to determine the product mix.
> What is the change in profits if, instead of the traditional method used by Diablo Electronics, the bottleneck method advocated by Pedro is used to select the product mix?

![[Pasted image 20260316105734.png]]

Diablo Electronics has four products (A, B, C, D) that flow through five workstations (V, W, X, Y, Z). Management wants to find the most profitable product mix.

**Company Data:**

- Variable overhead: $8,500/week
- Workers: 5, paid $18/hour regardless of utilization (fixed cost)
- Schedule: 1 shift × 8 hours/day × 5 days = **40 hours/week = 2,400 minutes/week per workstation**
- Labor cost: 5 × 8 × 5 × $18 = **$3,600/week**

---

## Step 1: Map the Products

Each product has a price, raw material costs, a weekly demand cap, and a routing through specific workstations.

||Product A|Product B|Product C|Product D|
|---|---|---|---|---|
|**Price**|$75|$72|$45|$38|
|**Raw Materials**|$5 + $5 = $10|$2 + $3 = $5|$3 + $2 = $5|$4 + $6 = $10|
|**Max Demand**|60/week|80/week|80/week|100/week|

**Routings (workstation → time per unit):**

- **Product A:** V (30 min) → Y (10 min) → X (10 min)
- **Product B:** Y (10 min) → X (20 min)
- **Product C:** X (5 min) → Y (5 min) → W (5 min) → Z (5 min)
- **Product D:** W (15 min) → Z (10 min) → Y (5 min)

---

## Step 2: Find the Bottleneck

To find the bottleneck, calculate the total load each workstation would face **if we made everything at maximum demand**.

**How to calculate each cell:** Multiply the number of units demanded by the time that product spends at that workstation.

|Workstation|Product A|Product B|Product C|Product D|**Total Load**|
|---|---|---|---|---|---|
|V|60 × 30 = 1,800|0|0|0|**1,800 min**|
|W|0|0|80 × 5 = 400|100 × 15 = 1,500|**1,900 min**|
|X|60 × 10 = 600|80 × 20 = 1,600|80 × 5 = 400|0|**2,600 min**|
|Y|60 × 10 = 600|80 × 10 = 800|80 × 5 = 400|100 × 5 = 500|**2,300 min**|
|Z|0|0|80 × 5 = 400|100 × 10 = 1,000|**1,400 min**|

**Available capacity per workstation:** 2,400 min/week

**Bottleneck = Workstation X** (2,600 min needed, but only 2,400 min available). X is the only workstation that is overloaded — we cannot make everything.

---

## Step 3: Calculate Contribution Margins

**Contribution Margin = Price − Raw Material Costs**

(Labor is fixed/sunk, so it does not enter the contribution margin calculation.)

||Product A|Product B|Product C|Product D|
|---|---|---|---|---|
|Price|$75|$72|$45|$38|
|− Raw Materials|−$10|−$5|−$5|−$10|
|**= Contribution Margin**|**$65**|**$67**|**$40**|**$28**|

---

## Step 4: Traditional Method (Rank by Contribution Margin)

The traditional approach: produce as much as possible of the highest-margin product first, then the next, and so on.

**Ranking by Contribution Margin:**

1. Product B: $67
2. Product A: $65
3. Product C: $40
4. Product D: $28

Now we schedule in that order, tracking remaining minutes at each workstation. At each step, we subtract the time each product consumes from every workstation it uses.

**Starting capacity:** 2,400 min at every workstation.

### Step 4a: Make 80 units of Product B

Product B uses: Y (10 min) and X (20 min)

|Workstation|Before|Consumed by 80 B|**After**|
|---|---|---|---|
|V|2,400|0|2,400|
|W|2,400|0|2,400|
|X|2,400|80 × 20 = 1,600|**800**|
|Y|2,400|80 × 10 = 800|1,600|
|Z|2,400|0|2,400|

### Step 4b: Make 60 units of Product A

Product A uses: V (30 min), Y (10 min), X (10 min)

|Workstation|Before|Consumed by 60 A|**After**|
|---|---|---|---|
|V|2,400|60 × 30 = 1,800|600|
|W|2,400|0|2,400|
|X|800|60 × 10 = 600|**200**|
|Y|1,600|60 × 10 = 600|1,000|
|Z|2,400|0|2,400|

### Step 4c: Make Product C — but how many?

Product C uses: X (5 min), Y (5 min), W (5 min), Z (5 min)

Workstation X only has **200 minutes left**. Product C needs 5 min/unit at X.

200 ÷ 5 = **40 units** (we wanted 80, but X runs out)

|Workstation|Before|Consumed by 40 C|**After**|
|---|---|---|---|
|V|600|0|600|
|W|2,400|40 × 5 = 200|2,200|
|X|200|40 × 5 = 200|**0**|
|Y|1,000|40 × 5 = 200|800|
|Z|2,400|40 × 5 = 200|2,200|

### Step 4d: Make 100 units of Product D

Product D uses: W (15 min), Z (10 min), Y (5 min). Product D does **not** use workstation X, so X being at 0 doesn't block it.

Check: W needs 100 × 15 = 1,500 (have 2,200 ✓), Z needs 100 × 10 = 1,000 (have 2,200 ✓), Y needs 100 × 5 = 500 (have 800 ✓).

|Workstation|Before|Consumed by 100 D|**After**|
|---|---|---|---|
|V|600|0|600|
|W|2,200|1,500|700|
|X|0|0|0|
|Y|800|500|300|
|Z|2,200|1,000|1,200|

### Traditional Method — Product Mix Summary

|Product|Demand|Produced|Limited by|
|---|---|---|---|
|B|80|**80**|—|
|A|60|**60**|—|
|C|80|**40**|X ran out|
|D|100|**100**|—|

### Traditional Method — Profitability

| |Calculation|Amount|
|---|---|---|
|Revenue|(60 × $75) + (80 × $72) + (40 × $45) + (100 × $38)|$15,860|
|− Materials|(60 × $10) + (80 × $5) + (40 × $5) + (100 × $10)|−$2,200|
|− Labor|5 × 8 × 5 × $18|−$3,600|
|− Overhead||−$8,500|
|**= Profit**||**$1,560**|

---

## Step 5: Bottleneck Method (Rank by Contribution Margin per Minute at the Bottleneck)

The TOC approach: instead of ranking by total contribution margin, rank by **contribution margin per minute of bottleneck time consumed**. This tells you which product generates the most profit for every precious minute of the constrained resource.

| |Product A|Product B|Product C|Product D|
|---|---|---|---|---|
|Contribution Margin|$65|$67|$40|$28|
|Time at Bottleneck (X)|10 min|20 min|5 min|**0 min**|
|**CM per Bottleneck Minute**|$65 ÷ 10 = **$6.50**|$67 ÷ 20 = **$3.35**|$40 ÷ 5 = **$8.00**|**∞ (doesn't use X)**|

**Ranking by CM per bottleneck minute:**

1. Product D: ∞ (doesn't use the bottleneck at all — free to make!)
2. Product C: $8.00/min
3. Product A: $6.50/min
4. Product B: $3.35/min (worst use of bottleneck time)

This is the key insight: **Product B had the highest total contribution margin ($67), but it's the worst product from the bottleneck's perspective** because it hogs 20 minutes of X for only $67 — that's just $3.35 per bottleneck minute. Product C generates $8.00 per bottleneck minute despite having only a $40 total margin.

### Step 5a: Make 100 units of Product D

Product D doesn't use X at all, so we make all of it first — it's "free" from the bottleneck's perspective.

|Workstation|Before|Consumed by 100 D|**After**|
|---|---|---|---|
|V|2,400|0|2,400|
|W|2,400|100 × 15 = 1,500|900|
|X|2,400|0|**2,400**|
|Y|2,400|100 × 5 = 500|1,900|
|Z|2,400|100 × 10 = 1,000|1,400|

### Step 5b: Make 80 units of Product C

Product C uses: X (5 min), Y (5 min), W (5 min), Z (5 min)

Check all workstations: X needs 400 (have 2,400 ✓), Y needs 400 (have 1,900 ✓), W needs 400 (have 900 ✓), Z needs 400 (have 1,400 ✓). We can make all 80.

|Workstation|Before|Consumed by 80 C|**After**|
|---|---|---|---|
|V|2,400|0|2,400|
|W|900|80 × 5 = 400|500|
|X|2,400|80 × 5 = 400|**2,000**|
|Y|1,900|80 × 5 = 400|1,500|
|Z|1,400|80 × 5 = 400|1,000|

### Step 5c: Make 60 units of Product A

Product A uses: V (30 min), Y (10 min), X (10 min)

Check: V needs 1,800 (have 2,400 ✓), Y needs 600 (have 1,500 ✓), X needs 600 (have 2,000 ✓). We can make all 60.

|Workstation|Before|Consumed by 60 A|**After**|
|---|---|---|---|
|V|2,400|60 × 30 = 1,800|600|
|W|500|0|500|
|X|2,000|60 × 10 = 600|**1,400**|
|Y|1,500|60 × 10 = 600|900|
|Z|1,000|0|1,000|

### Step 5d: Make Product B — but how many?

Product B uses: Y (10 min) and X (20 min)

X has 1,400 min left. Product B needs 20 min/unit at X.

1,400 ÷ 20 = **70 units** (we wanted 80, but X runs out)

Check Y: 70 × 10 = 700 (have 900 ✓). Y is not the binding constraint.

|Workstation|Before|Consumed by 70 B|**After**|
|---|---|---|---|
|V|600|0|600|
|W|500|0|500|
|X|1,400|70 × 20 = 1,400|**0**|
|Y|900|70 × 10 = 700|200|
|Z|1,000|0|1,000|

### Bottleneck Method — Product Mix Summary

|Product|Demand|Produced|Limited by|
|---|---|---|---|
|D|100|**100**|—|
|C|80|**80**|—|
|A|60|**60**|—|
|B|80|**70**|X ran out|

### Bottleneck Method — Profitability

| |Calculation|Amount|
|---|---|---|
|Revenue|(60 × $75) + (70 × $72) + (80 × $45) + (100 × $38)|$16,940|
|− Materials|(60 × $10) + (70 × $5) + (80 × $5) + (100 × $10)|−$2,350|
|− Labor|5 × 8 × 5 × $18|−$3,600|
|− Overhead||−$8,500|
|**= Profit**||**$2,490**|

---

## Step 6: The Comparison

| |Traditional Method|Bottleneck Method|
|---|---|---|
|Product A|60|60|
|Product B|80|**70**|
|Product C|**40**|80|
|Product D|100|100|
|**Profit**|**$1,560**|**$2,490**|
|**Difference**||**+$930/week**|

The bottleneck method produces **$930 more profit per week** — with the exact same workers, machines, and hours.

**What changed?** The traditional method filled up the bottleneck (X) with Product B first, because B had the highest total margin ($67). But B uses 20 minutes of X per unit — it's a bottleneck hog.

The bottleneck method prioritized products that use X efficiently (Product C at 5 min/unit) or not at all (Product D). This freed up enough bottleneck capacity to make 80 C instead of 40 — and only sacrificed 10 units of B to do it.

**The lesson:** When a resource is constrained, total margin doesn't matter. What matters is margin _per unit of the constrained resource_.