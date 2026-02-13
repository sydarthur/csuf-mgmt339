Great idea! Here's a simple 2D facility location problem:

## 2D Grid Method Problem

**ABC Electronics** needs to locate a new distribution center to serve three retail stores. The stores have the following locations and weekly shipment requirements:

| Store | Location (x, y) | Weekly Shipments | Transport Cost |
|-------|-----------------|------------------|----------------|
| Store A | (10, 20) | 400 boxes/week | $2.00/box-mile |
| Store B | (50, 10) | 300 boxes/week | $2.00/box-mile |
| Store C | (30, 40) | 500 boxes/week | $2.00/box-mile |

All transportation costs are the same rate. Where should the distribution center be located to minimize total transportation costs?

## Solution

**Step 1: Calculate weights**
- Store A: 400 × $2.00 = **800**
- Store B: 300 × $2.00 = **600**
- Store C: 500 × $2.00 = **1,000**
- Total weight = 2,400

**Step 2: Find center of gravity**

**x-coordinate:**
x* = (800 × 10 + 600 × 50 + 1,000 × 30) / 2,400
x* = (8,000 + 30,000 + 30,000) / 2,400
x* = 68,000 / 2,400
**x* ≈ 28.33**

**y-coordinate:**
y* = (800 × 20 + 600 × 10 + 1,000 × 40) / 2,400
y* = (16,000 + 6,000 + 40,000) / 2,400
y* = 62,000 / 2,400
**y* ≈ 25.83**

## Answer

**The distribution center should be located at approximately (28.3, 25.8)**

This balances the weighted pulls from all three stores and minimizes the total ton-mile transportation cost. Unlike the 1D problem, this gives us a true interior optimum!

---


Here are the LaTeX formulas for the 2D center of gravity method:

## Basic Formula

```latex
x^* = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}, \quad y^* = \frac{\sum_{i=1}^{n} w_i y_i}{\sum_{i=1}^{n} w_i}
```

## With Weight Definition

```latex
w_i = V_i \times R_i
```

```latex
x^* = \frac{\sum_{i=1}^{n} (V_i \times R_i) x_i}{\sum_{i=1}^{n} (V_i \times R_i)}, \quad y^* = \frac{\sum_{i=1}^{n} (V_i \times R_i) y_i}{\sum_{i=1}^{n} (V_i \times R_i)}
```

## Full Notation Version

```latex
\text{where } w_i = V_i \times R_i
```

```latex
x^* = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}, \quad y^* = \frac{\sum_{i=1}^{n} w_i y_i}{\sum_{i=1}^{n} w_i}
```

```latex
V_i = \text{volume/quantity to location } i
```

```latex
R_i = \text{transportation rate to location } i
```

```latex
(x_i, y_i) = \text{coordinates of location } i
```


Here's a plain English explanation for slides:

## Center of Gravity Method - Plain English

### What It Does
Finds the best location for a facility (warehouse, distribution center, plant) that minimizes total transportation costs to/from multiple locations.

### How It Works
Think of it like finding the "balance point" on a map where different locations pull with different strengths based on:
- **How much** you ship there (volume)
- **How expensive** it is to ship there (rate per mile)

### The Logic
- Locations with **higher volumes** pull the facility closer to them
- Locations with **higher shipping costs** pull the facility closer to them
- The optimal location balances all these competing pulls

### Simple Steps
1. **Calculate the weight** for each location = Volume × Transportation Rate
2. **Find the x-coordinate**: Weighted average of all x-coordinates
3. **Find the y-coordinate**: Weighted average of all y-coordinates
4. **Result**: The (x, y) point that minimizes total transportation cost

### Why It's Called "Center of Gravity"
Just like a physical center of gravity balances mass, this balances transportation cost pressure from multiple locations.

### Key Insight
The facility naturally locates closer to high-volume, high-cost destinations and farther from low-volume, low-cost destinations.