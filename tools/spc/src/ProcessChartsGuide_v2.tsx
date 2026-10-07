import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type ChartType = 'xbar' | 'r' | 'p' | 'c';

const ProcessChartsGuide = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('xbar');

  // Sample data — Fall 2026 lecture examples (verified)
  // X-bar / R: coffee bags, 5 samples of n = 4 (In-Class Exercise 2.2, Q1)
  const xbarData = [
    { sample: 1, mean: 501.44, CL: 498.86, UCL: 503.44, LCL: 494.28 },
    { sample: 2, mean: 498.57, CL: 498.86, UCL: 503.44, LCL: 494.28 },
    { sample: 3, mean: 493.63, CL: 498.86, UCL: 503.44, LCL: 494.28 },
    { sample: 4, mean: 499.41, CL: 498.86, UCL: 503.44, LCL: 494.28 },
    { sample: 5, mean: 501.24, CL: 498.86, UCL: 503.44, LCL: 494.28 },
  ];

  const rChartData = [
    { sample: 1, range: 5.45, CL: 6.28, UCL: 14.34, LCL: 0 },
    { sample: 2, range: 8.73, CL: 6.28, UCL: 14.34, LCL: 0 },
    { sample: 3, range: 9.09, CL: 6.28, UCL: 14.34, LCL: 0 },
    { sample: 4, range: 4.16, CL: 6.28, UCL: 14.34, LCL: 0 },
    { sample: 5, range: 3.99, CL: 6.28, UCL: 14.34, LCL: 0 },
  ];

  // p: same coffee bags as pass/fail (under 495 g?), 5 samples of n = 100
  const pChartData = [
    { sample: 1, proportion: 0.04, CL: 0.05, UCL: 0.115, LCL: 0 },
    { sample: 2, proportion: 0.03, CL: 0.05, UCL: 0.115, LCL: 0 },
    { sample: 3, proportion: 0.02, CL: 0.05, UCL: 0.115, LCL: 0 },
    { sample: 4, proportion: 0.12, CL: 0.05, UCL: 0.115, LCL: 0 },
    { sample: 5, proportion: 0.04, CL: 0.05, UCL: 0.115, LCL: 0 },
  ];

  // c: SkyView Drones, defects found on each of 8 drones
  const cChartData = [
    { drone: 1, defects: 3, CL: 4, UCL: 10, LCL: 0 },
    { drone: 2, defects: 5, CL: 4, UCL: 10, LCL: 0 },
    { drone: 3, defects: 2, CL: 4, UCL: 10, LCL: 0 },
    { drone: 4, defects: 6, CL: 4, UCL: 10, LCL: 0 },
    { drone: 5, defects: 4, CL: 4, UCL: 10, LCL: 0 },
    { drone: 6, defects: 3, CL: 4, UCL: 10, LCL: 0 },
    { drone: 7, defects: 5, CL: 4, UCL: 10, LCL: 0 },
    { drone: 8, defects: 4, CL: 4, UCL: 10, LCL: 0 },
  ];

  const chartInfo = {
    xbar: {
      name: 'X-bar Chart (X̄ Chart)',
      purpose: 'Monitors the average (mean) of a process over time',
      dataType: 'Variable Data (measurements)',
      narrative: {
        story: "Imagine you're a coffee roaster trying to maintain the perfect roast temperature. One bad batch? That's just random variation. But if your average temperature starts creeping up day after day, your roasting machine has fundamentally changed. That's what the X-bar chart reveals—it's not looking at individual measurements, but asking: 'Has the heart of my process shifted?'",
        why: "We use X-bar charts because knowing individual measurements isn't enough. A single espresso shot at 32ml tells you nothing—maybe it's normal variation, maybe the barista pulled it a second longer. But if your average across 5 shots shifts from 29ml to 33ml consistently, your entire calibration has drifted. The X-bar chart catches systematic shifts that would be invisible in raw data.",
        realImpact: "In manufacturing, this is the difference between catching a miscalibrated machine before producing 10,000 defective parts versus after. In healthcare, it's detecting that blood pressure readings are systematically high before a patient has a crisis. The X-bar chart is your early warning system for when the process center has moved."
      },
      whenToUse: [
        'Measuring continuous data like weight, length, time, temperature',
        'When you take multiple measurements per sample',
        'Want to monitor if the process average is stable'
      ],
      example: {
        scenario: 'Coffee Bag Example',
        description: 'A coffee company weighs 4 bags from the packaging line in each sample, for 5 samples.',
        measurements: 'Sample 1 bags: 503.44, 497.99, 501.77, 502.54 g → Average = 501.44 g',
        insight: 'Sample 3 averages 493.63 g, below the LCL of 494.28 g. The filler drifted low: an assignable cause to investigate.'
      },
      formula: {
        equation: 'UCL = X̄̄ + A₂R̄  |  LCL = X̄̄ - A₂R̄',
        variables: {
          'X̄̄': {
            name: 'X-double-bar (Grand Mean)',
            meaning: 'The average of all sample averages',
            calculation: 'Add up all your sample means, then divide by number of samples',
            example: 'Coffee bags: (501.44 + 498.57 + 493.63 + 499.41 + 501.24) / 5 = 498.86 g'
          },
          'A₂': {
            name: 'Control Chart Constant',
            meaning: 'Adjusts control limits based on sample size',
            calculation: 'Look up in table based on your sample size (n)',
            example: 'For n = 4 bags per sample, A₂ = 0.729. For n = 5, A₂ = 0.577. Always match n!'
          },
          'R̄': {
            name: 'R-bar (Average Range)',
            meaning: 'The average spread within samples',
            calculation: 'For each sample, find range (max-min), then average all ranges',
            example: 'Coffee bags: (5.45 + 8.73 + 9.09 + 4.16 + 3.99) / 5 = 6.284 g'
          }
        },
        quickExample: {
          setup: '5 samples of coffee bags, n = 4 bags per sample (In-Class Exercise 2.2)',
          data: 'Sample 1: 503.44, 497.99, 501.77, 502.54  → X̄ = 501.44, R = 5.45\nSample 2: 495.50, 495.19, 499.68, 503.92  → X̄ = 498.57, R = 8.73\nSample 3: 490.98, 490.22, 494.00, 499.31  → X̄ = 493.63, R = 9.09\nSample 4: 498.92, 498.78, 502.05, 497.89  → X̄ = 499.41, R = 4.16\nSample 5: 503.22, 502.39, 500.12, 499.23  → X̄ = 501.24, R = 3.99',
          calculations: 'X̄̄ = 2494.29 / 5 = 498.86 g\nR̄ = 31.42 / 5 = 6.284 g\nA₂ = 0.729 (for n = 4)\nA₂R̄ = 0.729 × 6.284 = 4.58',
          limits: 'UCL = 498.86 + 4.58 = 503.44 g\nLCL = 498.86 − 4.58 = 494.28 g',
          interpretation: 'Sample 3 (493.63) is below the LCL: out of control. The other four samples are common-cause variation.'
        }
      },
      lookingFor: 'Points outside control limits indicate the process average has shifted'
    },
    r: {
      name: 'R Chart (Range Chart)',
      purpose: 'Monitors the variability/consistency within samples',
      dataType: 'Variable Data (measurements)',
      narrative: {
        story: "Think about two archers. Both hit the bullseye on average, but Archer A's arrows are clustered tight while Archer B's arrows are scattered all over the target. Same average, completely different consistency. The R chart is how you measure 'scatter'—it reveals whether your process is becoming a sharpshooter or losing its grip.",
        why: "Here's the critical insight: you can't trust the X-bar chart alone. Imagine a process where Monday's samples range from 48-52, but by Friday they range from 30-70. The average might still be 50, but your process has become wildly unpredictable. The R chart catches this chaos that the X-bar chart misses. It's the guardian of consistency.",
        realImpact: "In pharmaceuticals, this determines whether every pill has nearly identical dosage (tight range) or varies dangerously (wide range). In customer service, it shows whether response times are predictably quick or frustratingly random. A stable R chart means customers get the same experience every time—that's what builds trust."
      },
      whenToUse: [
        'Used together with X-bar chart',
        'Want to check if variability is consistent',
        'Detect if the process is becoming more or less consistent'
      ],
      example: {
        scenario: 'Coffee Bag Example (continued)',
        description: 'Same 5 samples of 4 bags. For each sample, range = heaviest bag − lightest bag.',
        measurements: 'Sample 1: 503.44 − 497.99 = 5.45 g',
        insight: 'All five ranges fall inside the limits. The filler is consistent; it was the average that drifted (see the X-bar chart).'
      },
      formula: {
        equation: 'UCL = D₄R̄  |  LCL = D₃R̄',
        variables: {
          'R̄': {
            name: 'R-bar (Average Range)',
            meaning: 'The typical spread within your samples',
            calculation: 'Calculate range for each sample (max-min), then average them',
            example: 'Coffee bags: (5.45 + 8.73 + 9.09 + 4.16 + 3.99) / 5 = 6.284 g'
          },
          'D₄': {
            name: 'Upper Control Chart Constant',
            meaning: 'Sets the upper limit for acceptable variation',
            calculation: 'Look up in table based on sample size (n)',
            example: 'For n = 4, D₄ = 2.282. For n = 5, D₄ = 2.114.'
          },
          'D₃': {
            name: 'Lower Control Chart Constant',
            meaning: 'Sets the lower limit (often zero for small samples)',
            calculation: 'Look up in table based on sample size (n)',
            example: 'For n ≤ 6, D₃ = 0 (a range can never be negative, so LCL = 0)'
          }
        },
        quickExample: {
          setup: 'Same 5 samples of coffee bags, n = 4',
          data: 'Ranges: 5.45, 8.73, 9.09, 4.16, 3.99 g',
          calculations: 'R̄ = 31.42 / 5 = 6.284 g\nD₄ = 2.282, D₃ = 0 (for n = 4)',
          limits: 'UCL = 2.282 × 6.284 = 14.34 g\nLCL = 0 × 6.284 = 0 g',
          interpretation: 'All ranges are inside 0 to 14.34: spread is stable. Together with the X-bar chart: consistent, but the average drifted in Sample 3.'
        }
      },
      lookingFor: 'Increasing ranges mean the process is becoming less consistent'
    },
    p: {
      name: 'p-Chart (Proportion Chart)',
      purpose: 'Monitors the proportion of defective items',
      dataType: 'Attribute Data (pass/fail, good/bad)',
      narrative: {
        story: "You're not measuring anything here—you're making judgments. Pass or fail. Good or bad. Like a quality inspector at the end of a production line saying 'ship it' or 'reject it.' The p-chart tracks your rejection rate over time. It's the chart that asks: 'Are we having more bad days than usual?'",
        why: "This chart is powerful because it mirrors how customers experience your business. Customers don't care that a package was '2% underweight'—they care that it was wrong. The p-chart tracks exactly what matters: how often do we fail? When you see a spike in defective proportion, you know something specific happened that day—new employee, equipment breakdown, rushed shift. It points you directly to the problem day.",
        realImpact: "Amazon uses this constantly. If their 'wrong item shipped' rate jumps from 2% to 8% on a Friday, they immediately investigate Friday's operation—was it the new hires? System glitch? Holiday rush chaos? The p-chart doesn't just show you have a problem; it shows you exactly when the problem happened, so you can trace it back to root causes."
      },
      whenToUse: [
        'Counting defective items in varying sample sizes',
        'Each item is classified as good or bad',
        'Want to track defect rates or error rates'
      ],
      example: {
        scenario: 'Coffee Bags, Now Pass/Fail',
        description: 'Same coffee line, but now each bag is just judged: is it under 495 g? 100 bags inspected per sample.',
        measurements: 'Sample 1: 4 underweight out of 100 → p = 0.04',
        insight: 'Sample 4 has 12 of 100 underweight (0.12), above the UCL of 0.115. Something changed in that sample.'
      },
      formula: {
        equation: 'UCL = p̄ + 3√(p̄(1-p̄)/n)  |  LCL = p̄ - 3√(p̄(1-p̄)/n)',
        variables: {
          'p̄': {
            name: 'p-bar (Average Proportion Defective)',
            meaning: 'Your overall defect rate across all samples',
            calculation: 'Total defectives from all samples ÷ Total items inspected',
            example: 'Week 1: 5 defects in 200, Week 2: 8 in 250 → p̄ = (5+8)/(200+250) = 13/450 = 0.029 or 2.9%'
          },
          'n': {
            name: 'Sample Size',
            meaning: 'Number of items inspected in that specific sample',
            calculation: 'Count how many items you checked',
            example: 'Monday inspected 200 orders, so n=200 (note: can vary day to day)'
          },
          '3': {
            name: 'Z-score (3-sigma)',
            meaning: 'Standard multiplier for control limits (captures 99.7% of variation)',
            calculation: 'Fixed at 3 for standard control charts',
            example: 'Always use 3 unless specified otherwise'
          }
        },
        quickExample: {
          setup: '5 samples of 100 coffee bags; count bags under 495 g',
          data: 'Underweight: 4, 3, 2, 12, 4  (out of 100 each)\nProportions: 0.04, 0.03, 0.02, 0.12, 0.04',
          calculations: 'p̄ = 25 / 500 = 0.05\nσp = √(0.05 × 0.95 / 100) = √0.000475 = 0.0218',
          limits: 'UCL = 0.05 + 3(0.0218) = 0.115\nLCL = 0.05 − 3(0.0218) = −0.015 → set to 0\n(Proportions cannot be negative)',
          interpretation: 'Sample 4 (0.12) is above the UCL: assignable cause. No constants table needed for p charts.'
        }
      },
      lookingFor: 'Spikes in proportion indicate specific periods with quality issues'
    },
    c: {
      name: 'c-Chart (Count Chart)',
      purpose: 'Monitors the count of defects in a fixed area/unit',
      dataType: 'Attribute Data (count of defects)',
      narrative: {
        story: "Picture a hotel room inspector. She doesn't declare the room 'defective' or 'perfect'—she counts problems: one stain on the carpet, two burnt-out bulbs, one cracked mirror. That's 4 defects in one room. The c-chart tracks whether you're seeing more problems than usual in each unit you inspect. It's about density of imperfections, not pass/fail.",
        why: "Here's why this matters differently than a p-chart: one defect doesn't ruin the whole thing. A car with 3 paint scratches can still be sold—it's not 'defective,' it just needs touch-up. But if Monday's cars average 3 scratches and Friday's cars average 15 scratches, something broke in your paint booth on Friday. The c-chart catches accumulating problems before they become catastrophic.",
        realImpact: "Software companies use this religiously. They track bugs per 1,000 lines of code. Going from 2 bugs per module to 12 bugs per module means something changed—maybe a new developer, maybe rushed deadlines, maybe a complex feature. In textile manufacturing, it's counting defects per bolt of fabric. In restaurant health inspections, it's counting violations per inspection. The c-chart reveals when quality is deteriorating, even if nothing is outright 'failing.'"
      },
      whenToUse: [
        'Counting defects in a constant sample size or area',
        'Multiple defects can occur in one unit',
        'Examples: scratches on a car, errors in a document'
      ],
      example: {
        scenario: 'SkyView Drones Example',
        description: 'Inspectors count every defect (scratches, loose screws, misaligned props) on each finished drone.',
        measurements: 'Drone 1: 3 defects, Drone 2: 5 defects, Drone 4: 6 defects',
        insight: 'All 8 drones fall between 0 and 10: in control, predictable at about 4 defects per drone. Whether 4 is acceptable is a capability question.'
      },
      formula: {
        equation: 'UCL = c̄ + 3√c̄  |  LCL = c̄ - 3√c̄',
        variables: {
          'c̄': {
            name: 'c-bar (Average Defect Count)',
            meaning: 'Typical number of defects found per inspection unit',
            calculation: 'Sum all defect counts, then divide by number of samples',
            example: 'Day 1: 5 defects, Day 2: 7 defects, Day 3: 4 defects → c̄ = (5+7+4)/3 = 5.33 defects'
          },
          '√c̄': {
            name: 'Square Root of c-bar',
            meaning: 'Standard deviation estimate for count data',
            calculation: 'Take the square root of your average count',
            example: 'If c̄ = 16, then √c̄ = √16 = 4'
          },
          '3': {
            name: 'Z-score (3-sigma)',
            meaning: 'Standard multiplier for control limits',
            calculation: 'Fixed at 3 for standard control charts',
            example: 'Always use 3 unless specified otherwise'
          }
        },
        quickExample: {
          setup: 'SkyView Drones: defects counted on each of 8 drones',
          data: 'Defects: 3, 5, 2, 6, 4, 3, 5, 4  (total 32)',
          calculations: 'c̄ = 32 / 8 = 4 defects per drone\n√c̄ = √4 = 2',
          limits: 'UCL = 4 + 3(2) = 10\nLCL = 4 − 3(2) = −2 → set to 0',
          interpretation: 'Every drone is inside 0 to 10: only common-cause variation. In control means predictable, not necessarily good.'
        }
      },
      lookingFor: 'Unusual counts indicate special causes affecting quality'
    }
  };

  // One renderer for every chart: the same four lines (data, CL, UCL, LCL)
  const chartConfig: Record<ChartType, { data: Record<string, number>[]; xKey: string; xLabel: string; yKey: string; yLabel: string; yDomain: [number, number]; color: string; name: string }> = {
    xbar: { data: xbarData, xKey: 'sample', xLabel: 'Sample Number', yKey: 'mean', yLabel: 'Mean (g)', yDomain: [490, 506], color: '#3b82f6', name: 'Sample Mean' },
    r: { data: rChartData, xKey: 'sample', xLabel: 'Sample Number', yKey: 'range', yLabel: 'Range (g)', yDomain: [0, 16], color: '#8b5cf6', name: 'Sample Range' },
    p: { data: pChartData, xKey: 'sample', xLabel: 'Sample Number', yKey: 'proportion', yLabel: 'Proportion', yDomain: [0, 0.14], color: '#f59e0b', name: 'Proportion' },
    c: { data: cChartData, xKey: 'drone', xLabel: 'Drone Number', yKey: 'defects', yLabel: 'Defects', yDomain: [0, 12], color: '#10b981', name: 'Defect Count' },
  };

  const renderChart = () => {
    const cfg = chartConfig[activeChart];
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cfg.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={cfg.xKey} label={{ value: cfg.xLabel, position: 'insideBottom', offset: -5 }} />
          <YAxis domain={cfg.yDomain} label={{ value: cfg.yLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="linear" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="Upper Control Limit" dot={false} />
          <Line type="linear" dataKey="CL" stroke="#6b7280" name="Center Line" dot={false} />
          <Line type="linear" dataKey="LCL" stroke="#ef4444" strokeDasharray="5 5" name="Lower Control Limit" dot={false} />
          <Line type="linear" dataKey={cfg.yKey} stroke={cfg.color} strokeWidth={2} name={cfg.name} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const info = chartInfo[activeChart];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Statistical Process Control Charts</h1>
        <p className="text-gray-600 mb-6">A Visual Guide to Understanding When and Why to Use Each Chart Type</p>

        {/* Same Four Lines: the recipe every chart follows */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Every Control Chart: Same Four Lines</h2>
          <p className="text-gray-600 mb-4">Same four steps every time. Only the ingredients change.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <table className="w-full text-sm border border-slate-200 bg-white">
              <thead className="bg-slate-800 text-white">
                <tr><th className="p-2 text-left">Line</th><th className="p-2 text-left">What it is</th></tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2 font-semibold">Data points</td><td className="p-2">The statistic you plot for each sample</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">Center line (CL)</td><td className="p-2">The average of those statistics</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">UCL / LCL</td><td className="p-2">CL ± 3 × (spread of that statistic)</td></tr>
              </tbody>
            </table>
            <table className="w-full text-sm border border-slate-200 bg-white">
              <thead className="bg-slate-800 text-white">
                <tr><th className="p-2 text-left">Chart</th><th className="p-2 text-left">Data</th><th className="p-2 text-left">Plot</th><th className="p-2 text-left">Limits</th></tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2 font-semibold">X̄</td><td className="p-2">Measured</td><td className="p-2">Sample mean</td><td className="p-2 font-mono">X̿ ± A₂R̄</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">R</td><td className="p-2">Measured</td><td className="p-2">Sample range</td><td className="p-2 font-mono">D₄R̄, D₃R̄</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">p</td><td className="p-2">Yes / No</td><td className="p-2">Proportion defective</td><td className="p-2 font-mono">p̄ ± 3√(p̄(1−p̄)/n)</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">c</td><td className="p-2">Count</td><td className="p-2">Defects per unit</td><td className="p-2 font-mono">c̄ ± 3√c̄</td></tr>
              </tbody>
            </table>
          </div>
          <ol className="list-decimal ml-5 mt-4 text-sm text-gray-700 space-y-1">
            <li>Collect samples over time.</li>
            <li>Compute one number per sample (mean, range, proportion, or count).</li>
            <li>Average those numbers → CL.</li>
            <li>Add and subtract 3 × spread → UCL and LCL. A negative LCL becomes 0.</li>
            <li>Plot, and look for points outside the limits.</li>
          </ol>
          <p className="text-sm text-gray-600 mt-3"><strong>Constants depend on sample size n.</strong> n = 4: A₂ = 0.729, D₃ = 0, D₄ = 2.282. n = 5: A₂ = 0.577, D₃ = 0, D₄ = 2.114. p and c charts need no constants table.</p>
        </div>
        
        {/* Chart Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(Object.keys(chartInfo) as ChartType[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveChart(key)}
              className={`p-4 rounded-lg font-semibold transition-all ${
                activeChart === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {chartInfo[key].name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Chart Display */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{info.name}</h2>
          {renderChart()}
        </div>

        {/* Narrative Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-6 border border-indigo-200">
          <h3 className="font-bold text-xl text-indigo-900 mb-4">💡 Understanding the Story</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-indigo-800 mb-2">The Story</h4>
              <p className="text-gray-700 leading-relaxed">{info.narrative.story}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-indigo-800 mb-2">Why This Chart?</h4>
              <p className="text-gray-700 leading-relaxed">{info.narrative.why}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-600">
              <h4 className="font-semibold text-indigo-800 mb-2">Real-World Impact</h4>
              <p className="text-gray-700 leading-relaxed">{info.narrative.realImpact}</p>
            </div>
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-blue-900 mb-2">Purpose</h3>
            <p className="text-gray-700">{info.purpose}</p>
          </div>
          
          <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-lg text-green-900 mb-2">Data Type</h3>
            <p className="text-gray-700">{info.dataType}</p>
          </div>
        </div>

        {/* When to Use */}
        <div className="bg-purple-50 p-5 rounded-lg mb-6 border-l-4 border-purple-600">
          <h3 className="font-bold text-lg text-purple-900 mb-3">When to Use This Chart</h3>
          <ul className="space-y-2">
            {info.whenToUse.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real Example */}
        <div className="bg-amber-50 p-6 rounded-lg mb-6 border-l-4 border-amber-600">
          <h3 className="font-bold text-lg text-amber-900 mb-3">{info.example.scenario}</h3>
          <div className="space-y-3">
            <p className="text-gray-700"><strong>Situation:</strong> {info.example.description}</p>
            <p className="text-gray-700"><strong>Measurement:</strong> {info.example.measurements}</p>
            <p className="text-gray-700 bg-white p-3 rounded border-l-2 border-amber-500">
              <strong>Key Insight:</strong> {info.example.insight}
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-gray-100 p-5 rounded-lg mb-6">
          <h3 className="font-bold text-lg text-gray-800 mb-2">Control Limit Formula</h3>
          {typeof info.formula === 'string' ? (
            <code className="text-sm text-gray-700 bg-white p-3 rounded block">{info.formula}</code>
          ) : (
            <div className="space-y-4">
              <code className="text-sm text-gray-700 bg-white p-3 rounded block">{info.formula.equation}</code>

              <div className="space-y-3 mt-4">
                <h4 className="font-semibold text-gray-800">Variable Definitions:</h4>
                {Object.entries(info.formula.variables).map(([key, variable]: [string, any]) => (
                  <div key={key} className="bg-white p-3 rounded border-l-2 border-gray-400">
                    <p className="font-semibold text-gray-800">{key}: {variable.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{variable.meaning}</p>
                    <p className="text-sm text-gray-700 mt-1"><strong>How to calculate:</strong> {variable.calculation}</p>
                    <p className="text-sm text-blue-700 mt-1"><strong>Example:</strong> {variable.example}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-4 border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-2">Step-by-Step Example</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><strong>Setup:</strong> {info.formula.quickExample.setup}</p>
                  <p className="text-gray-700"><strong>Data:</strong></p>
                  <pre className="bg-white p-2 rounded text-xs">{info.formula.quickExample.data}</pre>
                  <p className="text-gray-700"><strong>Calculations:</strong></p>
                  <pre className="bg-white p-2 rounded text-xs">{info.formula.quickExample.calculations}</pre>
                  <p className="text-gray-700"><strong>Control Limits:</strong></p>
                  <pre className="bg-white p-2 rounded text-xs">{info.formula.quickExample.limits}</pre>
                  <p className="text-green-700 bg-white p-2 rounded mt-2"><strong>Interpretation:</strong> {info.formula.quickExample.interpretation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* What to Look For */}
        <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-600">
          <h3 className="font-bold text-lg text-red-900 mb-2">What You're Looking For</h3>
          <p className="text-gray-700">{info.lookingFor}</p>
        </div>
      </div>

      {/* Quick Decision Guide */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Decision Guide: Which Chart Should I Use?</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-600 pl-4 py-2">
            <p className="font-semibold text-gray-800">If you're measuring something (weight, length, time, temperature)...</p>
            <p className="text-gray-600">→ Use <strong>X-bar and R charts together</strong></p>
          </div>

          <div className="border-l-4 border-orange-600 pl-4 py-2">
            <p className="font-semibold text-gray-800">If you're counting defective items (good vs bad)...</p>
            <p className="text-gray-600">→ Use <strong>p-chart</strong></p>
          </div>

          <div className="border-l-4 border-green-600 pl-4 py-2">
            <p className="font-semibold text-gray-800">If you're counting number of defects in a fixed area/unit...</p>
            <p className="text-gray-600">→ Use <strong>c-chart</strong></p>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-2">Key Difference: p-chart vs c-chart</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-yellow-900">p-chart:</strong>
              <p className="text-gray-700">Counts defective items (entire item is bad). Example: 5 out of 100 orders were wrong.</p>
            </div>
            <div>
              <strong className="text-yellow-900">c-chart:</strong>
              <p className="text-gray-700">Counts defects on items (one item can have multiple defects). Example: One car has 3 scratches.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessChartsGuide;