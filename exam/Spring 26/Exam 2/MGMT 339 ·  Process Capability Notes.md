
## Cp and Cpk Standards by Sigma Level

### The Rule of Thumb

$$C_p = C_{pk} = \frac{\sigma\text{ level}}{3}$$

|Sigma Level|Cp Required|Cpk Required|Defects Per Million (DPMO)|
|---|---|---|---|
|**3-sigma**|1.00|1.00|~66,807|
|**4-sigma**|1.33|1.33|~6,210|
|**5-sigma**|1.67|1.67|~233|
|**6-sigma**|2.00|2.00|~3.4|

---

## The Key Distinction: Cp vs. Cpk

|Metric|What It Tells You|
|---|---|
|**Cp**|Is the process _spread_ narrow enough to fit within spec? (ignores centering)|
|**Cpk**|Is the process _actually performing_ within spec? (accounts for centering)|

- **Cp = Cpk** → process is perfectly centered
- **Cpk < Cp** → process is off-center; Cpk is always ≤ Cp
- A process can have a great Cp (tight spread) but a poor Cpk (poorly centered) — that's exactly what happened in the TechAssemble problem (Cp = 1.11 but Cpk = 0.74)

---

## Applying to Your Problems

|Problem|Cp|Cpk|Sigma Level|Verdict|
|---|---|---|---|---|
|ICU Lab|1.23|0.94|~2.8σ|Below 3-sigma; off-center|
|TechAssemble|1.11|0.74|~2.2σ|Well below 3-sigma; significantly off-center|

---

## Quick Memory Rule

|Cpk|Interpretation|
|---|---|
|< 1.00|Not capable — defects are escaping|
|1.00 – 1.33|Barely capable — 3-sigma, needs monitoring|
|1.33 – 1.67|Good — meets 4-sigma standard|
|≥ 2.00|Excellent — 6-sigma standard|
---

## Why Is There a 3 in the Denominator?

It comes from the **normal distribution**. In any normally distributed process, virtually all output falls within **±3 standard deviations** of the mean — specifically **99.73%** of all values.

So one "side" of the process uses up **3σ** of space:

```
LSL ←————— 3σ ————→ Mean ←————— 3σ ————→ USL
         Lower half          Upper half
         of the process      of the process
```

When you calculate Cpk for one side:

$$C_{pk} = \frac{USL - \bar{x}}{3\sigma}$$

You're asking: **how many times does my 3σ "reach" fit between the mean and the spec limit?** A value of 1.0 means it fits exactly once — the process just barely stays within spec 99.73% of the time. A value of 2.0 (6-sigma) means it fits twice — almost no defects escape.

---

## Where Do the A₂, D₃, D₄ Constants Come From?

These come from **statistical sampling theory** and are derived mathematically based on sample size n. Here's the intuition:

### For A₂ (used in X̄ chart)

The goal is to estimate σ from the average range R̄, because in practice you don't always know σ directly. It turns out:

$$\sigma \approx \frac{\bar{R}}{d_2}$$

Where **d₂** is a constant that depends on n — it represents the expected value of the range of a standard normal sample of size n. Then:

$$3\sigma \approx \frac{3\bar{R}}{d_2}$$

So **A₂ = 3/d₂** — it's just the "3" from the 3-sigma rule divided by d₂.

### For D₃ and D₄ (used in R chart)

The range R itself has its own sampling distribution. D₃ and D₄ are derived from the **upper and lower 3-sigma bounds of that distribution**:

$$UCL_R = D_4\bar{R}, \quad LCL_R = D_3\bar{R}$$

These are built from two other constants d₂ and d₃ (the mean and standard deviation of the range distribution):

$$D_4 = 1 + \frac{3d_3}{d_2}, \quad D_3 = 1 - \frac{3d_3}{d_2}$$

When D₃ goes negative (which happens for small n like 1–6), it's set to 0 because a negative range is impossible.

---

## The Constants Table — Where They Come From

|n|d₂|A₂ = 3/d₂|D₃|D₄|
|---|---|---|---|---|
|2|1.128|1.880|0|3.267|
|3|1.693|1.023|0|2.575|
|4|2.059|0.729|0|2.282|
|5|2.326|0.577|0|2.115|
|6|2.534|0.483|0|2.004|

Notice that as **n increases**, A₂ gets smaller — larger samples give you a more precise estimate of the mean, so the control limits tighten. And D₃ stays 0 for small samples because with few observations, a very low range could just be sampling luck, not a signal.

---

## The Big Picture

|Element|Why the 3 is there|
|---|---|
|Cpk formula|3σ = the natural spread of one side of a normal process|
|X̄ chart (A₂)|A₂ = 3/d₂, translating range into a 3σ limit|
|R chart (D₃, D₄)|3σ bounds on the sampling distribution of the range itself|

The **3 is always the same idea** — we're drawing the line at 3 standard deviations because that covers 99.73% of natural variation, leaving only 0.27% as a signal worth investigating.