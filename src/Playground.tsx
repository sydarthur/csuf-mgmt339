import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type ChartType = 'xbar' | 'r' | 'p' | 'c';

interface StepData {
  step: number;
  description: string;
  instruction: string;
  tableData?: any[];
  calculations?: { label: string; value: string }[];
}

const Playground = () => {
  const [selectedChart, setSelectedChart] = useState<ChartType>('xbar');
  const [currentStep, setCurrentStep] = useState(0);

  const xbarSteps: StepData[] = [
    {
      step: 0,
      description: 'Step 1: Collect Sample Data',
      instruction: 'We collected 5 measurements each day for 5 days. Click Next to see the raw data.',
      tableData: []
    },
    {
      step: 1,
      description: 'Step 2: View Raw Measurements',
      instruction: 'Here are our daily measurements. Each row represents one day with 5 measurements.',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '', range: '' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '', range: '' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '', range: '' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '', range: '' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '', range: '' }
      ]
    },
    {
      step: 2,
      description: 'Step 3: Calculate Sample Means (X̄)',
      instruction: 'For each day, we calculate the average of the 5 measurements.',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '49.0', range: '' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '50.0', range: '' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '50.0', range: '' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '48.0', range: '' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '51.0', range: '' }
      ],
      calculations: [
        { label: 'Day 1 Mean', value: '(48+50+49+51+47)/5 = 49.0' },
        { label: 'Day 2 Mean', value: '(49+51+50+52+48)/5 = 50.0' },
        { label: 'Day 3 Mean', value: '(50+52+51+49+48)/5 = 50.0' },
        { label: 'Day 4 Mean', value: '(47+49+48+50+46)/5 = 48.0' },
        { label: 'Day 5 Mean', value: '(51+53+52+50+49)/5 = 51.0' }
      ]
    },
    {
      step: 3,
      description: 'Step 4: Calculate Sample Ranges (R)',
      instruction: 'For each day, we calculate the range (Maximum - Minimum).',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '49.0', range: '4' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '48.0', range: '4' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '51.0', range: '4' }
      ],
      calculations: [
        { label: 'Day 1 Range', value: '51 - 47 = 4' },
        { label: 'Day 2 Range', value: '52 - 48 = 4' },
        { label: 'Day 3 Range', value: '52 - 48 = 4' },
        { label: 'Day 4 Range', value: '50 - 46 = 4' },
        { label: 'Day 5 Range', value: '53 - 49 = 4' }
      ]
    },
    {
      step: 4,
      description: 'Step 5: Calculate Grand Mean (X̄̄)',
      instruction: 'Average all the sample means to get the grand mean.',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '49.0', range: '4' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '48.0', range: '4' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '51.0', range: '4' }
      ],
      calculations: [
        { label: 'X̄̄ (Grand Mean)', value: '(49.0 + 50.0 + 50.0 + 48.0 + 51.0) / 5 = 49.6' },
        { label: 'R̄ (Average Range)', value: '(4 + 4 + 4 + 4 + 4) / 5 = 4.0' }
      ]
    },
    {
      step: 5,
      description: 'Step 6: Calculate Control Limits',
      instruction: 'Use the formulas with constant A₂ = 0.577 (for n=5) to find control limits.',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '49.0', range: '4' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '50.0', range: '4' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '48.0', range: '4' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '51.0', range: '4' }
      ],
      calculations: [
        { label: 'X̄̄', value: '49.6' },
        { label: 'R̄', value: '4.0' },
        { label: 'A₂ (from table for n=5)', value: '0.577' },
        { label: 'UCL', value: 'X̄̄ + A₂R̄ = 49.6 + (0.577 × 4.0) = 49.6 + 2.31 = 51.91' },
        { label: 'LCL', value: 'X̄̄ - A₂R̄ = 49.6 - (0.577 × 4.0) = 49.6 - 2.31 = 47.29' }
      ]
    },
    {
      step: 6,
      description: 'Step 7: Plot the Chart',
      instruction: 'All sample means fall within control limits - process is in control!',
      tableData: [
        { day: 'Day 1', m1: 48, m2: 50, m3: 49, m4: 51, m5: 47, mean: '49.0', range: '4', status: '✓ In Control' },
        { day: 'Day 2', m1: 49, m2: 51, m3: 50, m4: 52, m5: 48, mean: '50.0', range: '4', status: '✓ In Control' },
        { day: 'Day 3', m1: 50, m2: 52, m3: 51, m4: 49, m5: 48, mean: '50.0', range: '4', status: '✓ In Control' },
        { day: 'Day 4', m1: 47, m2: 49, m3: 48, m4: 50, m5: 46, mean: '48.0', range: '4', status: '✓ In Control' },
        { day: 'Day 5', m1: 51, m2: 53, m3: 52, m4: 50, m5: 49, mean: '51.0', range: '4', status: '✓ In Control' }
      ],
      calculations: [
        { label: 'UCL', value: '51.91' },
        { label: 'Center Line (X̄̄)', value: '49.6' },
        { label: 'LCL', value: '47.29' }
      ]
    }
  ];

  const pChartSteps: StepData[] = [
    {
      step: 0,
      description: 'Step 1: Define the Problem',
      instruction: 'We inspect orders daily to count defective items. Click Next to start.',
      tableData: []
    },
    {
      step: 1,
      description: 'Step 2: Collect Data',
      instruction: 'Record the number of defects found and total items inspected each day.',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '', proportion: '' },
        { day: 'Tue', inspected: 200, defects: '', proportion: '' },
        { day: 'Wed', inspected: 200, defects: '', proportion: '' },
        { day: 'Thu', inspected: 200, defects: '', proportion: '' },
        { day: 'Fri', inspected: 200, defects: '', proportion: '' }
      ]
    },
    {
      step: 2,
      description: 'Step 3: Count Defects',
      instruction: 'Here are the defect counts for each day.',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '6', proportion: '' },
        { day: 'Tue', inspected: 200, defects: '5', proportion: '' },
        { day: 'Wed', inspected: 200, defects: '12', proportion: '' },
        { day: 'Thu', inspected: 200, defects: '4', proportion: '' },
        { day: 'Fri', inspected: 200, defects: '8', proportion: '' }
      ]
    },
    {
      step: 3,
      description: 'Step 4: Calculate Proportions',
      instruction: 'Calculate the proportion defective for each day (defects ÷ inspected).',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '6', proportion: '0.030' },
        { day: 'Tue', inspected: 200, defects: '5', proportion: '0.025' },
        { day: 'Wed', inspected: 200, defects: '12', proportion: '0.060' },
        { day: 'Thu', inspected: 200, defects: '4', proportion: '0.020' },
        { day: 'Fri', inspected: 200, defects: '8', proportion: '0.040' }
      ],
      calculations: [
        { label: 'Monday', value: '6/200 = 0.030 (3.0%)' },
        { label: 'Tuesday', value: '5/200 = 0.025 (2.5%)' },
        { label: 'Wednesday', value: '12/200 = 0.060 (6.0%)' },
        { label: 'Thursday', value: '4/200 = 0.020 (2.0%)' },
        { label: 'Friday', value: '8/200 = 0.040 (4.0%)' }
      ]
    },
    {
      step: 4,
      description: 'Step 5: Calculate Average Proportion (p̄)',
      instruction: 'Calculate the overall average proportion defective.',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '6', proportion: '0.030' },
        { day: 'Tue', inspected: 200, defects: '5', proportion: '0.025' },
        { day: 'Wed', inspected: 200, defects: '12', proportion: '0.060' },
        { day: 'Thu', inspected: 200, defects: '4', proportion: '0.020' },
        { day: 'Fri', inspected: 200, defects: '8', proportion: '0.040' }
      ],
      calculations: [
        { label: 'Total Defects', value: '6 + 5 + 12 + 4 + 8 = 35' },
        { label: 'Total Inspected', value: '200 × 5 = 1000' },
        { label: 'p̄ (Average Proportion)', value: '35 / 1000 = 0.035 (3.5%)' }
      ]
    },
    {
      step: 5,
      description: 'Step 6: Calculate Control Limits',
      instruction: 'Use the p-chart formula to calculate UCL and LCL.',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '6', proportion: '0.030' },
        { day: 'Tue', inspected: 200, defects: '5', proportion: '0.025' },
        { day: 'Wed', inspected: 200, defects: '12', proportion: '0.060' },
        { day: 'Thu', inspected: 200, defects: '4', proportion: '0.020' },
        { day: 'Fri', inspected: 200, defects: '8', proportion: '0.040' }
      ],
      calculations: [
        { label: 'p̄', value: '0.035' },
        { label: 'n (sample size)', value: '200' },
        { label: 'σ = √(p̄(1-p̄)/n)', value: '√(0.035 × 0.965 / 200) = √0.000169 = 0.013' },
        { label: 'UCL', value: 'p̄ + 3σ = 0.035 + 3(0.013) = 0.035 + 0.039 = 0.074 (7.4%)' },
        { label: 'LCL', value: 'p̄ - 3σ = 0.035 - 3(0.013) = -0.004 → 0 (cannot be negative)' }
      ]
    },
    {
      step: 6,
      description: 'Step 7: Interpret Results',
      instruction: 'All points are within control limits - process is stable!',
      tableData: [
        { day: 'Mon', inspected: 200, defects: '6', proportion: '0.030', status: '✓ In Control' },
        { day: 'Tue', inspected: 200, defects: '5', proportion: '0.025', status: '✓ In Control' },
        { day: 'Wed', inspected: 200, defects: '12', proportion: '0.060', status: '✓ In Control' },
        { day: 'Thu', inspected: 200, defects: '4', proportion: '0.020', status: '✓ In Control' },
        { day: 'Fri', inspected: 200, defects: '8', proportion: '0.040', status: '✓ In Control' }
      ],
      calculations: [
        { label: 'UCL', value: '0.074 (7.4%)' },
        { label: 'Center Line (p̄)', value: '0.035 (3.5%)' },
        { label: 'LCL', value: '0 (0%)' }
      ]
    }
  ];

  const getChartData = () => {
    if (selectedChart === 'xbar' && currentStep >= 2) {
      const step = xbarSteps[currentStep];
      return step.tableData?.map((row: any, idx: number) => ({
        day: idx + 1,
        mean: parseFloat(row.mean) || null,
        UCL: currentStep >= 5 ? 51.91 : null,
        LCL: currentStep >= 5 ? 47.29 : null,
        target: currentStep >= 4 ? 49.6 : null
      }));
    } else if (selectedChart === 'p' && currentStep >= 3) {
      const step = pChartSteps[currentStep];
      return step.tableData?.map((row: any) => ({
        day: row.day,
        proportion: parseFloat(row.proportion) || null,
        UCL: currentStep >= 5 ? 0.074 : null,
        LCL: 0,
        target: currentStep >= 4 ? 0.035 : null
      }));
    }
    return [];
  };

  const currentSteps = selectedChart === 'xbar' ? xbarSteps : pChartSteps;
  const stepData = currentSteps[currentStep];
  const chartData = getChartData();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive SPC Playground</h1>
        <p className="text-gray-600 mb-6">Learn by doing - follow each step to build a control chart</p>

        {/* Chart Type Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => { setSelectedChart('xbar'); setCurrentStep(0); }}
            className={`p-4 rounded-lg font-semibold transition-all ${
              selectedChart === 'xbar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            X-bar Chart Tutorial
          </button>
          <button
            onClick={() => { setSelectedChart('p'); setCurrentStep(0); }}
            className={`p-4 rounded-lg font-semibold transition-all ${
              selectedChart === 'p'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            p-Chart Tutorial
          </button>
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
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Description */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-bold text-blue-900 mb-2">{stepData.description}</h2>
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
                          {key.charAt(0).toUpperCase() + key.slice(1)}
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
                  <div key={idx} className="bg-gray-50 p-3 rounded border-l-4 border-blue-500">
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
        {chartData && chartData.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Control Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={selectedChart === 'xbar' ? 'day' : 'day'} />
                <YAxis domain={selectedChart === 'xbar' ? [45, 55] : [0, 0.1]} />
                <Tooltip />
                {currentStep >= 5 && (
                  <>
                    <Line type="monotone" dataKey="UCL" stroke="#ef4444" strokeDasharray="5 5" name="UCL" />
                    <Line type="monotone" dataKey="LCL" stroke="#ef4444" strokeDasharray="5 5" name="LCL" />
                  </>
                )}
                {currentStep >= 4 && (
                  <Line type="monotone" dataKey="target" stroke="#22c55e" strokeDasharray="3 3" name="Center" />
                )}
                <Line
                  type="monotone"
                  dataKey={selectedChart === 'xbar' ? 'mean' : 'proportion'}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  name="Data"
                />
              </LineChart>
            </ResponsiveContainer>
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
                : 'bg-blue-600 text-white hover:bg-blue-700'
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
