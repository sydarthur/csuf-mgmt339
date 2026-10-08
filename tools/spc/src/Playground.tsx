import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartType = 'xbar' | 'p' | 'c';

interface StepData {
  step: number;
  description: string;
  instruction: string;
  tableData?: any[];
  calculations?: { label: string; value: string }[];
}

const columnLabels: Record<string, string> = {
  sample: 'Sample',
  m1: 'Bag 1',
  m2: 'Bag 2',
  m3: 'Bag 3',
  m4: 'Bag 4',
  mean: 'Mean (X̄)',
  range: 'Range (R)',
  meanStatus: 'X̄ Status',
  rangeStatus: 'R Status',
  week: 'Week',
  inspected: 'Deposits Checked',
  wrong: 'Wrong Account #s',
  proportion: 'Proportion (p)',
  day: 'Day',
  defects: 'Defects',
  status: 'Status'
};

const Playground = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType>('xbar');
  const [currentStep, setCurrentStep] = useState(0);

  // X-bar & R: FreshRoast Coffee, bag weights (g), 5 samples of n = 4
  // Same data as the Guide tab's "same four lines" example (In-Class Exercise 2.2, Q1):
  // X-double-bar = 498.86, R-bar = 6.284, A2(n=4) = 0.729, D3 = 0, D4(n=4) = 2.282
  const xbarSteps: StepData[] = [
    {
      step: 0,
      description: 'Step 1: The Scenario',
      instruction: 'FreshRoast Coffee monitors the weight of bags (in grams) in its packaging process. Below are 5 samples, each containing 4 bag weights. Click Next to see the raw data.',
      tableData: []
    },
    {
      step: 1,
      description: 'Step 2: Raw Measurements',
      instruction: 'Each row is one sample of 4 bags.',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '', range: '' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '', range: '' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '', range: '' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '', range: '' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '', range: '' }
      ]
    },
    {
      step: 2,
      description: 'Step 3: Calculate Sample Means (X̄)',
      instruction: 'For each sample, average the 4 bag weights.',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '501.44', range: '' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '498.57', range: '' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '493.63', range: '' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '499.41', range: '' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '501.24', range: '' }
      ],
      calculations: [
        { label: 'Sample 1 Mean', value: '(503.44+497.99+501.77+502.54)/4 = 501.44' },
        { label: 'Sample 2 Mean', value: '(495.50+495.19+499.68+503.92)/4 = 498.57' },
        { label: 'Sample 3 Mean', value: '(490.98+490.22+494.00+499.31)/4 = 493.63' },
        { label: 'Sample 4 Mean', value: '(498.92+498.78+502.05+497.89)/4 = 499.41' },
        { label: 'Sample 5 Mean', value: '(503.22+502.39+500.12+499.23)/4 = 501.24' }
      ]
    },
    {
      step: 3,
      description: 'Step 4: Calculate Sample Ranges (R)',
      instruction: 'For each sample, the range is Maximum − Minimum.',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '501.44', range: '5.45' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '498.57', range: '8.73' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '493.63', range: '9.09' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '499.41', range: '4.16' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '501.24', range: '3.99' }
      ],
      calculations: [
        { label: 'Sample 1 Range', value: '503.44 − 497.99 = 5.45' },
        { label: 'Sample 2 Range', value: '503.92 − 495.19 = 8.73' },
        { label: 'Sample 3 Range', value: '499.31 − 490.22 = 9.09' },
        { label: 'Sample 4 Range', value: '502.05 − 497.89 = 4.16' },
        { label: 'Sample 5 Range', value: '503.22 − 499.23 = 3.99' }
      ]
    },
    {
      step: 4,
      description: 'Step 5: Calculate the Grand Mean (X̿) and Average Range (R̄)',
      instruction: 'Average the 5 sample means for X̿; average the 5 ranges for R̄.',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '501.44', range: '5.45' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '498.57', range: '8.73' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '493.63', range: '9.09' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '499.41', range: '4.16' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '501.24', range: '3.99' }
      ],
      calculations: [
        { label: 'X̿ (Grand Mean)', value: '(501.44+498.57+493.63+499.41+501.24)/5 = 498.86' },
        { label: 'R̄ (Average Range)', value: '(5.45+8.73+9.09+4.16+3.99)/5 = 6.284' }
      ]
    },
    {
      step: 5,
      description: 'Step 6: Calculate Control Limits',
      instruction: 'Use A₂ = 0.729 for the X̄ chart, D₃ = 0 and D₄ = 2.282 for the R chart (table constants for n = 4).',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '501.44', range: '5.45' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '498.57', range: '8.73' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '493.63', range: '9.09' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '499.41', range: '4.16' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '501.24', range: '3.99' }
      ],
      calculations: [
        { label: 'X̿ / R̄', value: '498.86 / 6.284' },
        { label: 'X̄ UCL', value: 'X̿ + A₂R̄ = 498.86 + (0.729 × 6.284) = 503.44' },
        { label: 'X̄ LCL', value: 'X̿ − A₂R̄ = 498.86 − (0.729 × 6.284) = 494.28' },
        { label: 'R UCL', value: 'D₄R̄ = 2.282 × 6.284 = 14.34' },
        { label: 'R LCL', value: 'D₃R̄ = 0 × 6.284 = 0' }
      ]
    },
    {
      step: 6,
      description: 'Step 7: Plot and Interpret',
      instruction: 'Sample 3’s mean (493.63 g) falls below the X̄ chart’s lower control limit (494.28) — that sample is out of control. All 5 ranges fall within the R chart’s limits, so variability within samples is stable.',
      tableData: [
        { sample: 'Sample 1', m1: 503.44, m2: 497.99, m3: 501.77, m4: 502.54, mean: '501.44', range: '5.45', meanStatus: '✓ In Control', rangeStatus: '✓ In Control' },
        { sample: 'Sample 2', m1: 495.50, m2: 495.19, m3: 499.68, m4: 503.92, mean: '498.57', range: '8.73', meanStatus: '✓ In Control', rangeStatus: '✓ In Control' },
        { sample: 'Sample 3', m1: 490.98, m2: 490.22, m3: 494.00, m4: 499.31, mean: '493.63', range: '9.09', meanStatus: '⚠ Out of Control (low)', rangeStatus: '✓ In Control' },
        { sample: 'Sample 4', m1: 498.92, m2: 498.78, m3: 502.05, m4: 497.89, mean: '499.41', range: '4.16', meanStatus: '✓ In Control', rangeStatus: '✓ In Control' },
        { sample: 'Sample 5', m1: 503.22, m2: 502.39, m3: 500.12, m4: 499.23, mean: '501.24', range: '3.99', meanStatus: '✓ In Control', rangeStatus: '✓ In Control' }
      ],
      calculations: [
        { label: 'X̄ chart', value: 'UCL 503.44 / CL 498.86 / LCL 494.28' },
        { label: 'R chart', value: 'UCL 14.34 / CL 6.284 / LCL 0' }
      ]
    }
  ];

  // p-chart: Hometown Bank, wrong account numbers, n = 2,500 deposits/week, 12 weeks
  const pChartSteps: StepData[] = [
    {
      step: 0,
      description: 'Step 1: The Scenario',
      instruction: 'The operations manager of the booking services department at Hometown Bank is concerned about wrong customer account numbers being recorded. Each week, a random sample of 2,500 deposits is checked. Click Next to see the last 12 weeks of data.',
      tableData: []
    },
    {
      step: 1,
      description: 'Step 2: Raw Weekly Data',
      instruction: 'Each row is one week of 2,500 deposits checked.',
      tableData: Array.from({ length: 12 }, (_, i) => ({ week: `Week ${i + 1}`, inspected: 2500, wrong: '', proportion: '' }))
    },
    {
      step: 2,
      description: 'Step 3: Record Wrong Account Numbers',
      instruction: 'Here are the wrong-account-number counts for each week.',
      tableData: [15, 12, 19, 2, 19, 4, 24, 7, 10, 17, 15, 3].map((w, i) => ({
        week: `Week ${i + 1}`, inspected: 2500, wrong: String(w), proportion: ''
      }))
    },
    {
      step: 3,
      description: 'Step 4: Calculate Proportions',
      instruction: 'Proportion defective = wrong ÷ deposits checked, for each week.',
      tableData: [
        { week: 'Week 1', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 2', inspected: 2500, wrong: '12', proportion: '0.0048' },
        { week: 'Week 3', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 4', inspected: 2500, wrong: '2', proportion: '0.0008' },
        { week: 'Week 5', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 6', inspected: 2500, wrong: '4', proportion: '0.0016' },
        { week: 'Week 7', inspected: 2500, wrong: '24', proportion: '0.0096' },
        { week: 'Week 8', inspected: 2500, wrong: '7', proportion: '0.0028' },
        { week: 'Week 9', inspected: 2500, wrong: '10', proportion: '0.0040' },
        { week: 'Week 10', inspected: 2500, wrong: '17', proportion: '0.0068' },
        { week: 'Week 11', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 12', inspected: 2500, wrong: '3', proportion: '0.0012' }
      ],
      calculations: [
        { label: 'Week 1–6', value: '15/2500, 12/2500, 19/2500, 2/2500, 19/2500, 4/2500' },
        { label: 'Week 7–12', value: '24/2500, 7/2500, 10/2500, 17/2500, 15/2500, 3/2500' }
      ]
    },
    {
      step: 4,
      description: 'Step 5: Calculate the Average Proportion (p̄)',
      instruction: 'Pool all 12 weeks: total wrong ÷ total deposits checked.',
      tableData: [
        { week: 'Week 1', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 2', inspected: 2500, wrong: '12', proportion: '0.0048' },
        { week: 'Week 3', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 4', inspected: 2500, wrong: '2', proportion: '0.0008' },
        { week: 'Week 5', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 6', inspected: 2500, wrong: '4', proportion: '0.0016' },
        { week: 'Week 7', inspected: 2500, wrong: '24', proportion: '0.0096' },
        { week: 'Week 8', inspected: 2500, wrong: '7', proportion: '0.0028' },
        { week: 'Week 9', inspected: 2500, wrong: '10', proportion: '0.0040' },
        { week: 'Week 10', inspected: 2500, wrong: '17', proportion: '0.0068' },
        { week: 'Week 11', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 12', inspected: 2500, wrong: '3', proportion: '0.0012' }
      ],
      calculations: [
        { label: 'Total Wrong', value: '15+12+19+2+19+4+24+7+10+17+15+3 = 147' },
        { label: 'Total Checked', value: '2,500 × 12 = 30,000' },
        { label: 'p̄ (Average Proportion)', value: '147 / 30,000 = 0.0049 (0.49%)' }
      ]
    },
    {
      step: 5,
      description: 'Step 6: Calculate Control Limits',
      instruction: 'Use the p-chart formula with n = 2,500.',
      tableData: [
        { week: 'Week 1', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 2', inspected: 2500, wrong: '12', proportion: '0.0048' },
        { week: 'Week 3', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 4', inspected: 2500, wrong: '2', proportion: '0.0008' },
        { week: 'Week 5', inspected: 2500, wrong: '19', proportion: '0.0076' },
        { week: 'Week 6', inspected: 2500, wrong: '4', proportion: '0.0016' },
        { week: 'Week 7', inspected: 2500, wrong: '24', proportion: '0.0096' },
        { week: 'Week 8', inspected: 2500, wrong: '7', proportion: '0.0028' },
        { week: 'Week 9', inspected: 2500, wrong: '10', proportion: '0.0040' },
        { week: 'Week 10', inspected: 2500, wrong: '17', proportion: '0.0068' },
        { week: 'Week 11', inspected: 2500, wrong: '15', proportion: '0.0060' },
        { week: 'Week 12', inspected: 2500, wrong: '3', proportion: '0.0012' }
      ],
      calculations: [
        { label: 'p̄', value: '0.0049' },
        { label: 'n (sample size)', value: '2,500' },
        { label: 'σ = √(p̄(1−p̄)/n)', value: '√(0.0049 × 0.9951 / 2500) = 0.0014' },
        { label: 'UCL', value: 'p̄ + 3σ = 0.0049 + 3(0.0014) = 0.0091' },
        { label: 'LCL', value: 'p̄ − 3σ = 0.0049 − 3(0.0014) = 0.0007' }
      ]
    },
    {
      step: 6,
      description: 'Step 7: Plot and Interpret',
      instruction: 'Week 7 (0.0096) is above the UCL (0.0091) — the booking process was out of control that week. Every other week falls inside the limits. Investigate what happened in Week 7 before trusting the average error rate going forward.',
      tableData: [
        { week: 'Week 1', inspected: 2500, wrong: '15', proportion: '0.0060', status: '✓ In Control' },
        { week: 'Week 2', inspected: 2500, wrong: '12', proportion: '0.0048', status: '✓ In Control' },
        { week: 'Week 3', inspected: 2500, wrong: '19', proportion: '0.0076', status: '✓ In Control' },
        { week: 'Week 4', inspected: 2500, wrong: '2', proportion: '0.0008', status: '✓ In Control' },
        { week: 'Week 5', inspected: 2500, wrong: '19', proportion: '0.0076', status: '✓ In Control' },
        { week: 'Week 6', inspected: 2500, wrong: '4', proportion: '0.0016', status: '✓ In Control' },
        { week: 'Week 7', inspected: 2500, wrong: '24', proportion: '0.0096', status: '⚠ Out of Control (above UCL)' },
        { week: 'Week 8', inspected: 2500, wrong: '7', proportion: '0.0028', status: '✓ In Control' },
        { week: 'Week 9', inspected: 2500, wrong: '10', proportion: '0.0040', status: '✓ In Control' },
        { week: 'Week 10', inspected: 2500, wrong: '17', proportion: '0.0068', status: '✓ In Control' },
        { week: 'Week 11', inspected: 2500, wrong: '15', proportion: '0.0060', status: '✓ In Control' },
        { week: 'Week 12', inspected: 2500, wrong: '3', proportion: '0.0012', status: '✓ In Control' }
      ],
      calculations: [
        { label: 'UCL', value: '0.0091 (0.91%)' },
        { label: 'Center Line (p̄)', value: '0.0049 (0.49%)' },
        { label: 'LCL', value: '0.0007 (0.07%)' }
      ]
    }
  ];

  // c-chart: Waverly Print Co., defects per 500-page print run, 10 days
  const cChartSteps: StepData[] = [
    {
      step: 0,
      description: 'Step 1: The Scenario',
      instruction: 'Waverly Print Co. inspects one 500-page print run each day and counts every printing defect it finds — smudges, misaligned pages, missing pages. A single run can have several defects. Click Next to see the last 10 days.',
      tableData: []
    },
    {
      step: 1,
      description: 'Step 2: Record Daily Defect Counts',
      instruction: 'Each row is one day’s print run.',
      tableData: [14, 18, 12, 21, 16, 29, 13, 15, 10, 12].map((d, i) => ({ day: `Day ${i + 1}`, defects: String(d) }))
    },
    {
      step: 2,
      description: 'Step 3: Calculate the Average Defect Count (c̄)',
      instruction: 'Average the defect counts across all 10 days.',
      tableData: [14, 18, 12, 21, 16, 29, 13, 15, 10, 12].map((d, i) => ({ day: `Day ${i + 1}`, defects: String(d) })),
      calculations: [
        { label: 'Total Defects', value: '14+18+12+21+16+29+13+15+10+12 = 160' },
        { label: 'c̄ (Average Defects per Run)', value: '160 / 10 = 16.0' }
      ]
    },
    {
      step: 3,
      description: 'Step 4: Calculate Control Limits',
      instruction: 'A c-chart’s spread is √c̄ — no sample size is needed since each run is a fixed inspection unit (500 pages).',
      tableData: [14, 18, 12, 21, 16, 29, 13, 15, 10, 12].map((d, i) => ({ day: `Day ${i + 1}`, defects: String(d) })),
      calculations: [
        { label: 'c̄', value: '16.0' },
        { label: '√c̄', value: '√16 = 4' },
        { label: 'UCL', value: 'c̄ + 3√c̄ = 16 + 3(4) = 28' },
        { label: 'LCL', value: 'c̄ − 3√c̄ = 16 − 3(4) = 4' }
      ]
    },
    {
      step: 4,
      description: 'Step 5: Plot and Interpret',
      instruction: 'Day 6 (29 defects) is above the UCL (28) — that print run is out of control. Investigate what happened that day. Every other day falls inside the limits.',
      tableData: [14, 18, 12, 21, 16, 29, 13, 15, 10, 12].map((d, i) => ({
        day: `Day ${i + 1}`,
        defects: String(d),
        status: d > 28 ? '⚠ Out of Control (above UCL)' : '✓ In Control'
      })),
      calculations: [
        { label: 'UCL', value: '28' },
        { label: 'Center Line (c̄)', value: '16.0' },
        { label: 'LCL', value: '4' }
      ]
    }
  ];

  const moduleMeta: Record<ChartType, { label: string; color: string; steps: StepData[] }> = {
    xbar: { label: 'X̄ & R Chart — FreshRoast Coffee', color: 'blue', steps: xbarSteps },
    p: { label: 'p-Chart — Hometown Bank', color: 'orange', steps: pChartSteps },
    c: { label: 'c-Chart — Waverly Print Co.', color: 'teal', steps: cChartSteps }
  };

  const currentSteps = moduleMeta[selectedChart].steps;
  const stepData = currentSteps[currentStep];

  const xbarMeanData = () => {
    if (selectedChart !== 'xbar' || currentStep < 2) return [];
    const step = xbarSteps[currentStep];
    return step.tableData?.map((row: any, idx: number) => ({
      sample: idx + 1,
      mean: parseFloat(row.mean) || null,
      UCL: currentStep >= 5 ? 503.44 : null,
      LCL: currentStep >= 5 ? 494.28 : null,
      target: currentStep >= 4 ? 498.86 : null
    })) ?? [];
  };

  const xbarRangeData = () => {
    if (selectedChart !== 'xbar' || currentStep < 3) return [];
    const step = xbarSteps[currentStep];
    return step.tableData?.map((row: any, idx: number) => ({
      sample: idx + 1,
      range: parseFloat(row.range) || null,
      UCL: currentStep >= 5 ? 14.34 : null,
      LCL: currentStep >= 5 ? 0 : null,
      target: currentStep >= 4 ? 6.284 : null
    })) ?? [];
  };

  const pChartData = () => {
    if (selectedChart !== 'p' || currentStep < 3) return [];
    const step = pChartSteps[currentStep];
    return step.tableData?.map((row: any, idx: number) => ({
      week: idx + 1,
      proportion: parseFloat(row.proportion) || null,
      UCL: currentStep >= 5 ? 0.0091 : null,
      LCL: currentStep >= 5 ? 0.0007 : null,
      target: currentStep >= 4 ? 0.0049 : null
    })) ?? [];
  };

  const cChartData = () => {
    if (selectedChart !== 'c' || currentStep < 1) return [];
    const step = cChartSteps[currentStep];
    return step.tableData?.map((row: any, idx: number) => ({
      day: idx + 1,
      defects: parseFloat(row.defects) || null,
      UCL: currentStep >= 3 ? 28 : null,
      LCL: currentStep >= 3 ? 4 : null,
      target: currentStep >= 2 ? 16 : null
    })) ?? [];
  };

  const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-900', border: 'border-blue-600', hover: 'hover:bg-blue-700' },
    orange: { bg: 'bg-orange-600', text: 'text-orange-900', border: 'border-orange-600', hover: 'hover:bg-orange-700' },
    teal: { bg: 'bg-teal-600', text: 'text-teal-900', border: 'border-teal-600', hover: 'hover:bg-teal-700' }
  };
  const activeColor = colorMap[moduleMeta[selectedChart].color];

  const renderMiniChart = (data: any[], xKey: string, yKey: string, title: string, showLimits: boolean, showTarget: boolean, yDomain?: [any, any], tickFormatter?: (v: number) => string) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis domain={yDomain} tickFormatter={tickFormatter} width={tickFormatter ? 70 : 50} />
          <Tooltip />
          {showLimits && (
            <>
              <Line type="linear" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="UCL" dot={false} />
              <Line type="linear" dataKey="LCL" stroke="#ef4444" strokeDasharray="5 5" name="LCL" dot={false} />
            </>
          )}
          {showTarget && (
            <Line type="linear" dataKey="target" stroke="#22c55e" strokeDasharray="3 3" name="Center" dot={false} />
          )}
          <Line type="linear" dataKey={yKey} stroke="#3b82f6" strokeWidth={2} dot={{ r: 5 }} name="Data" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const dynamicPad = (padFactor: number, minPad: number) => ([dataMin, dataMax]: [number, number]) => {
    const pad = Math.max((dataMax - dataMin) * padFactor, minPad);
    return [Math.floor(dataMin - pad), Math.ceil(dataMax + pad)];
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive SPC Playground</h1>
        <p className="text-gray-600 mb-6">Learn by doing — follow each step to build a control chart, using real in-class exercise data</p>

        {/* Chart Type Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {(Object.keys(moduleMeta) as ChartType[]).map((key) => (
            <button
              key={key}
              onClick={() => { setSelectedChart(key); setCurrentStep(0); }}
              className={`p-4 rounded-lg font-semibold transition-all ${
                selectedChart === key
                  ? `${colorMap[moduleMeta[key].color].bg} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {moduleMeta[key].label}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {currentSteps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`${activeColor.bg} h-2.5 rounded-full transition-all duration-300`}
              style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Description */}
        <div className={`bg-gray-50 p-6 rounded-lg mb-6 border-l-4 ${activeColor.border}`}>
          <h2 className={`text-xl font-bold mb-2 ${activeColor.text}`}>{stepData.description}</h2>
          <p className="text-gray-700">{stepData.instruction}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Data Table</h3>
            {stepData.tableData && stepData.tableData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {Object.keys(stepData.tableData[0]).map((key) => (
                        <th key={key} className="px-3 py-2 text-left font-semibold text-gray-700">
                          {columnLabels[key] ?? (key.charAt(0).toUpperCase() + key.slice(1))}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stepData.tableData.map((row: any, idx: number) => (
                      <tr key={idx} className="border-t border-gray-200">
                        {Object.values(row).map((value: any, vidx: number) => (
                          <td
                            key={vidx}
                            className={`px-3 py-2 ${
                              value && value.toString().includes('✓')
                                ? 'text-green-600 font-semibold'
                                : value && value.toString().includes('⚠')
                                ? 'text-red-600 font-semibold'
                                : value === ''
                                ? 'bg-gray-50 text-gray-400'
                                : 'text-gray-700'
                            }`}
                          >
                            {value === '' ? '—' : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">No data yet. Click Next to start.</p>
            )}
          </div>

          {/* Calculations */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Calculations</h3>
            {stepData.calculations && stepData.calculations.length > 0 ? (
              <div className="space-y-3">
                {stepData.calculations.map((calc, idx) => (
                  <div key={idx} className={`bg-gray-50 p-3 rounded border-l-4 ${activeColor.border}`}>
                    <p className="font-semibold text-gray-800">{calc.label}</p>
                    <p className="text-gray-700 mt-1 font-mono text-sm">{calc.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Calculations will appear as you progress.</p>
            )}
          </div>
        </div>

        {/* Chart Visualization */}
        {selectedChart === 'xbar' && xbarMeanData().length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Control Charts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {renderMiniChart(xbarMeanData(), 'sample', 'mean', 'X̄ Chart (Sample Means)', currentStep >= 5, currentStep >= 4, dynamicPad(0.3, 1) as any)}
              {xbarRangeData().length > 0 &&
                renderMiniChart(xbarRangeData(), 'sample', 'range', 'R Chart (Sample Ranges)', currentStep >= 5, currentStep >= 4, [0, 16])}
            </div>
          </div>
        )}

        {selectedChart === 'p' && pChartData().length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Control Chart</h3>
            {renderMiniChart(pChartData(), 'week', 'proportion', 'p Chart (Proportion Defective)', currentStep >= 5, currentStep >= 4, [0, 0.011], (v: number) => v.toFixed(4))}
          </div>
        )}

        {selectedChart === 'c' && cChartData().length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Control Chart</h3>
            {renderMiniChart(cChartData(), 'day', 'defects', 'c Chart (Defects per Run)', currentStep >= 3, currentStep >= 2, [0, 32])}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={() => setCurrentStep(0)}
            className="px-6 py-3 rounded-lg font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition-all"
          >
            Reset
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(currentSteps.length - 1, currentStep + 1))}
            disabled={currentStep === currentSteps.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentStep === currentSteps.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : `${activeColor.bg} text-white ${activeColor.hover}`
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playground;
