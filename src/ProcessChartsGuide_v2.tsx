import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

type ChartType = 'xbar' | 'r' | 'p' | 'c';

const ProcessChartsGuide = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('xbar');

  // Sample data for demonstrations
  const xbarData = [
    { sample: 1, mean: 50.2, UCL: 52, LCL: 48, target: 50 },
    { sample: 2, mean: 49.8, UCL: 52, LCL: 48, target: 50 },
    { sample: 3, mean: 51.1, UCL: 52, LCL: 48, target: 50 },
    { sample: 4, mean: 50.5, UCL: 52, LCL: 48, target: 50 },
    { sample: 5, mean: 49.3, UCL: 52, LCL: 48, target: 50 },
    { sample: 6, mean: 52.5, UCL: 52, LCL: 48, target: 50 },
    { sample: 7, mean: 50.8, UCL: 52, LCL: 48, target: 50 },
  ];

  const rChartData = [
    { sample: 1, range: 3.2, UCL: 5, LCL: 0 },
    { sample: 2, range: 2.8, UCL: 5, LCL: 0 },
    { sample: 3, range: 4.1, UCL: 5, LCL: 0 },
    { sample: 4, range: 3.5, UCL: 5, LCL: 0 },
    { sample: 5, range: 2.3, UCL: 5, LCL: 0 },
    { sample: 6, range: 5.5, UCL: 5, LCL: 0 },
    { sample: 7, range: 3.8, UCL: 5, LCL: 0 },
  ];

  const pChartData = [
    { day: 'Mon', proportion: 0.03, UCL: 0.06, LCL: 0 },
    { day: 'Tue', proportion: 0.04, UCL: 0.06, LCL: 0 },
    { day: 'Wed', proportion: 0.02, UCL: 0.06, LCL: 0 },
    { day: 'Thu', proportion: 0.05, UCL: 0.06, LCL: 0 },
    { day: 'Fri', proportion: 0.08, UCL: 0.06, LCL: 0 },
  ];

  const cChartData = [
    { day: 'Mon', defects: 5, UCL: 12, LCL: 0 },
    { day: 'Tue', defects: 7, UCL: 12, LCL: 0 },
    { day: 'Wed', defects: 4, UCL: 12, LCL: 0 },
    { day: 'Thu', defects: 6, UCL: 12, LCL: 0 },
    { day: 'Fri', defects: 15, UCL: 12, LCL: 0 },
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
        scenario: 'Coffee Shop Example',
        description: 'A coffee shop wants to ensure espresso shots are consistent. Every hour, they measure 5 espresso shots.',
        measurements: 'Shot volumes: 28ml, 30ml, 29ml, 31ml, 27ml → Average = 29ml',
        insight: 'If the average shifts from 29ml to 33ml, the machine may need recalibration'
      },
      formula: 'UCL = X̄̄ + A₂R̄  |  LCL = X̄̄ - A₂R̄',
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
        scenario: 'Coffee Shop Example (continued)',
        description: 'Using the same 5 shots, calculate the range (highest - lowest)',
        measurements: 'Shots: 28, 30, 29, 31, 27ml → Range = 31 - 27 = 4ml',
        insight: 'If range suddenly increases to 10ml, the machine is becoming inconsistent'
      },
      formula: 'UCL = D₄R̄  |  LCL = D₃R̄',
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
        scenario: 'Order Fulfillment Example',
        description: 'A warehouse inspects daily shipments for wrong items',
        measurements: 'Monday: 5 wrong items out of 200 orders = 5/200 = 2.5% defective',
        insight: 'If Friday shows 16/200 = 8% defective (above control limit), investigate what happened'
      },
      formula: 'UCL = p̄ + 3√(p̄(1-p̄)/n)  |  LCL = p̄ - 3√(p̄(1-p̄)/n)',
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
        scenario: 'Packaging Quality Example',
        description: 'Count defects (scratches, dents, tears) on each batch of 100 boxes',
        measurements: 'Monday: 5 defects, Tuesday: 7 defects, Friday: 15 defects',
        insight: 'Friday spike of 15 defects (above UCL of 12) suggests a problem occurred that day'
      },
      formula: 'UCL = c̄ + 3√c̄  |  LCL = c̄ - 3√c̄',
      lookingFor: 'Unusual counts indicate special causes affecting quality'
    }
  };

  const renderChart = () => {
    switch(activeChart) {
      case 'xbar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={xbarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sample" label={{ value: 'Sample Number', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Mean Value', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="Upper Control Limit" />
              <Line type="monotone" dataKey="LCL" stroke="#ef4444" strokeDasharray="5 5" name="Lower Control Limit" />
              <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="3 3" name="Target" />
              <Line type="monotone" dataKey="mean" stroke="#3b82f6" strokeWidth={2} name="Sample Mean" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'r':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sample" label={{ value: 'Sample Number', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Range', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="Upper Control Limit" />
              <Line type="monotone" dataKey="range" stroke="#8b5cf6" strokeWidth={2} name="Sample Range" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'p':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Proportion Defective', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="Upper Control Limit" />
              <Line type="monotone" dataKey="proportion" stroke="#f59e0b" strokeWidth={2} name="Proportion" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'c':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Number of Defects', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="Upper Control Limit" />
              <Line type="monotone" dataKey="defects" stroke="#10b981" strokeWidth={2} name="Defect Count" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const info = chartInfo[activeChart];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Statistical Process Control Charts</h1>
        <p className="text-gray-600 mb-6">A Visual Guide to Understanding When and Why to Use Each Chart Type</p>
        
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
          <code className="text-sm text-gray-700 bg-white p-3 rounded block">{info.formula}</code>
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