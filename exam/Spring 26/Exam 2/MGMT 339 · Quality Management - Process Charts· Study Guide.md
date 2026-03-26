

# X̄ and R Charts — Step by Step Example

## The Data

A **coffee company** monitors the **weight of bags** in its packaging process to ensure customers receive the correct amount of product. The following table shows **5 samples**, each containing **4 bag weights**:

|Sample|x₁|x₂|x₃|x₄|
|---|---|---|---|---|
|1|503.44|497.99|501.77|502.54|
|2|495.50|495.19|499.68|503.92|
|3|490.98|490.22|494.00|499.31|
|4|498.92|498.78|502.05|497.89|
|5|503.22|502.39|500.12|499.23|

---

## Step 1: Sample Mean (X̄) for Each Sample

$$\bar{X} = \frac{x_1 + x_2 + x_3 + x_4}{4}$$

|Sample|X̄|
|---|---|
|1|501.44|
|2|498.57|
|3|493.63|
|4|499.41|
|5|501.24|

---

## Step 2: Range (R) for Each Sample

$$R = x_{max} - x_{min}$$

|Sample|Max|Min|R|
|---|---|---|---|
|1|503.44|497.99|5.45|
|2|503.92|495.19|8.73|
|3|499.31|490.22|9.09|
|4|502.05|497.89|4.16|
|5|503.22|499.23|3.99|

---

## Step 3: Grand Averages

$$\bar{\bar{X}} = \frac{501.44 + 498.57 + 493.63 + 499.41 + 501.24}{5} = 498.86$$

$$\bar{R} = \frac{5.45 + 8.73 + 9.09 + 4.16 + 3.99}{5} = 6.28$$

---

## Step 4: Control Chart Constants (n = 4)

***Note - "n" indicates the number of observations in the sample, not the number of samples. Use the n value to look up the constants.***

|Constant|Value|
|---|---|
|A₂|0.729|
|D₃|0|
|D₄|2.282|

---

## Step 5: X̄ Chart Control Limits

$$UCL_{\bar{X}} = \bar{\bar{X}} + A_2\bar{R} = 498.86 + (0.729)(6.28) = \mathbf{503.44}$$

$$CL = \bar{\bar{X}} = \mathbf{498.86}$$

$$LCL_{\bar{X}} = \bar{\bar{X}} - A_2\bar{R} = 498.86 - (0.729)(6.28) = \mathbf{494.28}$$

---

## Step 6: R Chart Control Limits

$$UCL_R = D_4 \times \bar{R} = 2.282 \times 6.28 = \mathbf{14.33}$$

$$CL = \bar{R} = \mathbf{6.28}$$

$$LCL_R = D_3 \times \bar{R} = 0 \times 6.28 = \mathbf{0}$$

---

## Step 7: Is the Process in Control?

**X̄ Chart** (UCL = 503.44, LCL = 494.28):

|Sample|X̄|In Control?|
|---|---|---|
|1|501.44|✅|
|2|498.57|✅|
|3|493.63|⚠️ Below LCL|
|4|499.41|✅|
|5|501.24|✅|

**R Chart** (UCL = 14.33, LCL = 0): ✅ All samples in control.

**Conclusion:** Sample 3 falls below the LCL on the X̄ chart — the bags in that batch were consistently underweight. The process is **not fully in control**.


---

# p-Chart — Step by Step Example

The operations manager of the booking services department at **Hometown Bank** is concerned about the number of **wrong customer account numbers** being recorded by personnel. Each week, a random sample of **2,500 deposits** is taken, and the number of incorrect account numbers is recorded.

The results for the past **12 weeks** are shown below:

## The Data (n = 2,500 per week)

| Week | Wrong Account No.s |
| ---- | ------------------ |
| 1    | 15                 |
| 2    | 12                 |
| 3    | 19                 |
| 4    | 2                  |
| 5    | 19                 |
| 6    | 4                  |
| 7    | 24                 |
| 8    | 7                  |
| 9    | 10                 |
| 10   | 17                 |
| 11   | 15                 |
| 12   | 3                  |

---

## Step 1: Defect Rate for Each Week

$$p_i = \frac{\text{defects}}{n} = \frac{\text{defects}}{2500}$$

|Week|Defects|p|
|---|---|---|
|1|15|0.0060|
|2|12|0.0048|
|3|19|0.0076|
|4|2|0.0008|
|5|19|0.0076|
|6|4|0.0016|
|7|24|0.0096|
|8|7|0.0028|
|9|10|0.0040|
|10|17|0.0068|
|11|15|0.0060|
|12|3|0.0012|
|**Total**|**147**||

---

## Step 2: p̄ (p-bar)

$$\bar{p} = \frac{\text{Total Defects}}{\text{Total Observations}} = \frac{147}{12 \times 2500} = \frac{147}{30{,}000} = 0.00490$$

---

## Step 3: σ (Sigma)

$$\sigma = \sqrt{\frac{\bar{p}(1-\bar{p})}{n}} = \sqrt{\frac{0.00490 \times 0.99510}{2500}} = 0.001397$$

---

## Step 4: Control Limits (z = 3)

$$UCL = \bar{p} + 3\sigma = 0.00490 + 3(0.001397) = \mathbf{0.00909}$$

$$CL = \bar{p} = \mathbf{0.00490}$$

$$LCL = \bar{p} - 3\sigma = 0.00490 - 3(0.001397) = \mathbf{0.00071}$$

> If LCL is negative, set it to 0. Here it is positive so we keep it.

---

## Step 5: Is the Process in Control?

|Week|p|In Control?|
|---|---|---|
|1|0.0060|✅|
|2|0.0048|✅|
|3|0.0076|✅|
|4|0.0008|⚠️ Below LCL|
|5|0.0076|✅|
|6|0.0016|✅|
|7|0.0096|✅|
|8|0.0028|✅|
|9|0.0040|✅|
|10|0.0068|✅|
|11|0.0060|✅|
|12|0.0012|✅|

**Conclusion:** Week 4 (p = 0.0008) falls below the LCL — an unusually low error count. This is technically out of control on the low side, which could indicate a genuine improvement or a data recording issue worth investigating. All other weeks are within control limits, so the process is **generally in control**.

---

# c-Chart — Step by Step Example 

A c-chart monitors the **number of defects per unit** when you are inspecting a single unit at a time and counting how many defects (not defective items) appear on it. It assumes defects follow a **Poisson distribution**.

> **Key distinction:** Use a p-chart when tracking the _proportion_ of defective items across many observations. Use a c-chart when counting _how many defects_ appear on one inspected unit.

---

## Scenario

A bank's customer service department reviews incoming complaint letters. Each day, a supervisor inspects **one bundle of letters** and counts the total number of complaints found. The goal is to monitor whether the volume of complaints is stable over time.

---

## The Data

|Day|Number of Complaints (c)|
|---|---|
|1|12|
|2|8|
|3|15|
|4|6|
|5|9|

---

## Step 1: Calculate c̄ (c-bar)

$$\bar{c} = \frac{\sum c}{k} = \frac{12 + 8 + 15 + 6 + 9}{5} = \frac{50}{5} = \mathbf{10}$$

Where k = number of samples (days).

---

## Step 2: Calculate σ (Sigma)

For a c-chart, sigma is the square root of c̄:

$$\sigma = \sqrt{\bar{c}} = \sqrt{10} = 3.162$$

> This differs from the p-chart formula. Because complaint counts follow a Poisson distribution, the standard deviation is simply the square root of the mean — no sample size needed.

---

## Step 3: Control Limits (z = 3)

$$UCL = \bar{c} + 3\sqrt{\bar{c}} = 10 + 3(3.162) = 10 + 9.487 = \mathbf{19.487}$$

$$CL = \bar{c} = \mathbf{10}$$

$$LCL = \bar{c} - 3\sqrt{\bar{c}} = 10 - 9.487 = \mathbf{0.513}$$

> If LCL is negative, set it to 0.

---

## Step 4: Is the Process in Control?

|Day|c|In Control?|
|---|---|---|
|1|12|✅|
|2|8|✅|
|3|15|✅|
|4|6|✅|
|5|9|✅|

**All points fall between 0.513 and 19.487 — the process is in control.**

---

## Comparison: p-Chart vs. c-Chart

| |p-Chart|c-Chart|
|---|---|---|
|**What it measures**|Proportion of defective items|Count of defects per unit|
|**Sample size**|Large (e.g., 2,500 deposits)|One unit (e.g., one bundle)|
|**Formula for σ**|√[p̄(1−p̄)/n]|√c̄|
|**Distribution assumed**|Binomial|Poisson|
|**Bank example**|Wrong account out of 2,500|Complaints per letter bundle|


## Control Chart Quick Reference — Which One and Why?

### The Core Intuition

> **Ask yourself: What am I measuring?**

---

### X̄ and R Chart — _"How consistent is my process output?"_

**Use when:** You're measuring something on a continuous scale (time, weight, length, temperature) and taking small groups of measurements at a time.

**Intuition:** X̄ tracks whether the _average_ is drifting up or down. R tracks whether your _spread_ is getting wider or tighter. You always run them together — a process can look fine on average but be wildly inconsistent underneath.

$$\bar{\bar{X}} \pm A_2\bar{R} \quad \text{and} \quad \bar{R} \times D_3 / D_4$$

---

### p-Chart — _"What fraction of my output is defective?"_

**Use when:** You're inspecting a batch and asking a yes/no question about each item — defective or not. Sample sizes are large.

**Intuition:** You're watching a proportion. Think of it as: out of every 200 motherboards, what share is bad? The chart tells you if that share is wandering outside normal bounds.

$$\bar{p} \pm 3\sqrt{\frac{\bar{p}(1-\bar{p})}{n}}$$

---

### c-Chart — _"How many defects are showing up on each unit?"_

**Use when:** You're counting _how many things went wrong_ on a single inspected unit — not whether the unit passed or failed, but how many individual problems it has.

**Intuition:** One box can have multiple defects — a crushed corner, a missing label, and a wrong item all at once. A p-chart would just mark it "defective." A c-chart counts all three. You're monitoring the defect _load_ per unit.

$$\bar{c} \pm 3\sqrt{\bar{c}}$$

---

### Side-by-Side Comparison

|                    | X̄ & R                   | p-Chart                 | c-Chart                    |
| ------------------ | ------------------------ | ----------------------- | -------------------------- |
| **Data type**      | Continuous (numbers)     | Proportion (%)          | Count (# of defects)       |
| **Question asked** | How fast / heavy / long? | What fraction is bad?   | How many defects per unit? |
| **Sample**         | Small groups (n = 2–10)  | Large batches (n = 50+) | One unit at a time         |
|                    |                          |                         |                            |

---

### The One-Sentence Rule

- **X̄/R** → You're _measuring_ something and taking it in groups
- **p-chart** → You're _counting defective items_ as a fraction of a batch
- **c-chart** → You're _counting defects_ on a single unit (one unit can have many)


`- **[Cocoa Beans](https://www.google.com/search?q=Cocoa+Beans&sca_esv=7425f1baa5b8ea4e&rlz=1C5FPAB_enUS1201US1201&sxsrf=ANbL-n5R4hKpc8yY55R2bOAoo0M5wDaziA%3A1773085417156&ei=6SKvaZymCe2O8L0PpK6c0AY&biw=1470&bih=801&ved=2ahUKEwi_8rv2yZOTAxXUBEQIHdnKGVgQgK4QegQIAxAB&uact=5&oq=spec+limits+for+rat+poop+in+chocolate+FDA&gs_lp=Egxnd3Mtd2l6LXNlcnAiKXNwZWMgbGltaXRzIGZvciByYXQgcG9vcCBpbiBjaG9jb2xhdGUgRkRBMggQABiiBBiJBTIFEAAY7wUyCBAAGKIEGIkFSNcfUNoBWNIdcAJ4AZABAJgBtwGgAdUFqgEDNy4xuAEDyAEA-AEBmAIKoAKKBsICChAAGLADGNYEGEfCAgUQIRirAsICChAhGKABGMMEGArCAggQABiABBiiBJgDAIgGAZAGCJIHAzkuMaAHliCyBwM3LjG4B4MGwgcFMC42LjTIBxyACAA&sclient=gws-wiz-serp&mstk=AUtExfC_eAoc5LUQ2FVjKeR1B6J3O8TPu_zM27FET4fRMlKeTryLMBbNJpOWf8850lxZumjVjqaqktW_mGSOsy_G5rKO-uZmb3WRoQuHbAVb3OjNVbLZ6Qc-vzkKkSw-vMqhgcIoX6U-0FN2cpCufXnK-fynRJwlhRaY3naYmWzSRV1XzlVP3psxk0iFGFOtjRKcLmVtOpOafvG-4in7OHu7PVTfuoJPtwYwdKg9FxbEsn-97U9WWYsj3dM-uYOD2RuYXAumqiA-naiHu5obebhvxL2R&csui=3):** Average of 10 mg or more of mammalian excreta per pound.
- **[Chocolate/Chocolate Liquor](https://www.google.com/search?q=Chocolate%2FChocolate+Liquor&sca_esv=7425f1baa5b8ea4e&rlz=1C5FPAB_enUS1201US1201&sxsrf=ANbL-n5R4hKpc8yY55R2bOAoo0M5wDaziA%3A1773085417156&ei=6SKvaZymCe2O8L0PpK6c0AY&biw=1470&bih=801&ved=2ahUKEwi_8rv2yZOTAxXUBEQIHdnKGVgQgK4QegQIAxAD&uact=5&oq=spec+limits+for+rat+poop+in+chocolate+FDA&gs_lp=Egxnd3Mtd2l6LXNlcnAiKXNwZWMgbGltaXRzIGZvciByYXQgcG9vcCBpbiBjaG9jb2xhdGUgRkRBMggQABiiBBiJBTIFEAAY7wUyCBAAGKIEGIkFSNcfUNoBWNIdcAJ4AZABAJgBtwGgAdUFqgEDNy4xuAEDyAEA-AEBmAIKoAKKBsICChAAGLADGNYEGEfCAgUQIRirAsICChAhGKABGMMEGArCAggQABiABBiiBJgDAIgGAZAGCJIHAzkuMaAHliCyBwM3LjG4B4MGwgcFMC42LjTIBxyACAA&sclient=gws-wiz-serp&mstk=AUtExfC_eAoc5LUQ2FVjKeR1B6J3O8TPu_zM27FET4fRMlKeTryLMBbNJpOWf8850lxZumjVjqaqktW_mGSOsy_G5rKO-uZmb3WRoQuHbAVb3OjNVbLZ6Qc-vzkKkSw-vMqhgcIoX6U-0FN2cpCufXnK-fynRJwlhRaY3naYmWzSRV1XzlVP3psxk0iFGFOtjRKcLmVtOpOafvG-4in7OHu7PVTfuoJPtwYwdKg9FxbEsn-97U9WWYsj3dM-uYOD2RuYXAumqiA-naiHu5obebhvxL2R&csui=3):**
    - **Rodent Hair:** Average of more than 1.0 rodent hair per 100 grams.
    - **Subsample Rule:** Any 1 subsample containing more than 3 rodent hairs.
- **[Insect Fragments in Chocolate](https://www.google.com/search?q=Insect+Fragments+in+Chocolate&sca_esv=7425f1baa5b8ea4e&rlz=1C5FPAB_enUS1201US1201&sxsrf=ANbL-n5R4hKpc8yY55R2bOAoo0M5wDaziA%3A1773085417156&ei=6SKvaZymCe2O8L0PpK6c0AY&biw=1470&bih=801&ved=2ahUKEwi_8rv2yZOTAxXUBEQIHdnKGVgQgK4QegQIAxAH&uact=5&oq=spec+limits+for+rat+poop+in+chocolate+FDA&gs_lp=Egxnd3Mtd2l6LXNlcnAiKXNwZWMgbGltaXRzIGZvciByYXQgcG9vcCBpbiBjaG9jb2xhdGUgRkRBMggQABiiBBiJBTIFEAAY7wUyCBAAGKIEGIkFSNcfUNoBWNIdcAJ4AZABAJgBtwGgAdUFqgEDNy4xuAEDyAEA-AEBmAIKoAKKBsICChAAGLADGNYEGEfCAgUQIRirAsICChAhGKABGMMEGArCAggQABiABBiiBJgDAIgGAZAGCJIHAzkuMaAHliCyBwM3LjG4B4MGwgcFMC42LjTIBxyACAA&sclient=gws-wiz-serp&mstk=AUtExfC_eAoc5LUQ2FVjKeR1B6J3O8TPu_zM27FET4fRMlKeTryLMBbNJpOWf8850lxZumjVjqaqktW_mGSOsy_G5rKO-uZmb3WRoQuHbAVb3OjNVbLZ6Qc-vzkKkSw-vMqhgcIoX6U-0FN2cpCufXnK-fynRJwlhRaY3naYmWzSRV1XzlVP3psxk0iFGFOtjRKcLmVtOpOafvG-4in7OHu7PVTfuoJPtwYwdKg9FxbEsn-97U9WWYsj3dM-uYOD2RuYXAumqiA-naiHu5obebhvxL2R&csui=3):** Average of 60 or more per 100 grams. ![U.S. Food and Drug Administration (.gov)](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAACVBMVEUAUJ+trKD///+SRVNjAAAAT0lEQVQ4jWNgJAAYBoOCoQGYoADGQAjjUACVQFaAyoBQYA3YFUBo0hRALUZWAFNEpAIsVqD6B1MBio+xeRPdx6ghRkgBNlsHPRgMOYuQAgBGkQKJl8ZrlwAAAABJRU5ErkJggg==)U.S. Food and Drug Administration (.gov) +3`