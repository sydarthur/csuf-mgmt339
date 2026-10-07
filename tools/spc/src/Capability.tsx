import { useState } from 'react';

// Process capability: Cp and Cpk, taught with the "car in a garage" picture.
// Spec limits = garage walls (voice of the customer). Process spread (6σ) = the car.

type CurveProps = {
  lsl: number;
  usl: number;
  mean: number;
  sigma: number;
  xMin: number;
  xMax: number;
  width?: number;
  height?: number;
};

const NAVY = '#002E5B';
const ORANGE = '#E17000';
const FILL = '#C9D6E5';

// Bell curve between two spec "walls", with the out-of-spec tails shaded orange
const BellCurve = ({ lsl, usl, mean, sigma, xMin, xMax, width = 520, height = 230 }: CurveProps) => {
  const padTop = 40;
  const base = height - 30;
  const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
  const peak = base - padTop;
  const pts: [number, number][] = [];
  const steps = 240;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    const y = Math.exp(-0.5 * ((x - mean) / sigma) ** 2);
    pts.push([x, y]);
  }
  const toPath = (subset: [number, number][]) =>
    subset.length === 0
      ? ''
      : `M ${sx(subset[0][0])} ${base} ` +
        subset.map(([x, y]) => `L ${sx(x)} ${base - y * peak}`).join(' ') +
        ` L ${sx(subset[subset.length - 1][0])} ${base} Z`;
  const inside = pts.filter(([x]) => x >= mean - 3 * sigma && x <= mean + 3 * sigma);
  const outLow = pts.filter(([x]) => x <= lsl);
  const outHigh = pts.filter(([x]) => x >= usl);
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${sx(x)} ${base - y * peak}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img"
      aria-label={`Bell curve with mean ${mean} between LSL ${lsl} and USL ${usl}`}>
      <path d={toPath(inside)} fill={FILL} />
      <path d={toPath(outLow)} fill={ORANGE} opacity={0.6} />
      <path d={toPath(outHigh)} fill={ORANGE} opacity={0.6} />
      <path d={line} fill="none" stroke={NAVY} strokeWidth={2.5} />
      <line x1={0} x2={width} y1={base} y2={base} stroke={NAVY} strokeWidth={1.5} />
      <line x1={sx(mean)} x2={sx(mean)} y1={base} y2={padTop - 8} stroke={NAVY} strokeDasharray="3 3" />
      <text x={sx(mean)} y={base + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill={NAVY}>X̄ = {mean}</text>
      {[{ v: lsl, l: 'LSL' }, { v: usl, l: 'USL' }].map(({ v, l }) => (
        <g key={l}>
          <line x1={sx(v)} x2={sx(v)} y1={base} y2={22} stroke={ORANGE} strokeWidth={3.5} />
          <text x={sx(v)} y={15} textAnchor="middle" fontSize={13} fontWeight={700} fill={ORANGE}>{l} {v}</text>
        </g>
      ))}
    </svg>
  );
};

const round = (x: number, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

const Capability = () => {
  // Interactive coffee-line example: specs 0.95–1.05 lb, σ = 0.015 lb
  const lsl = 0.95;
  const usl = 1.05;
  const [mean, setMean] = useState(1.0);
  const [sigma, setSigma] = useState(0.015);

  const cp = (usl - lsl) / (6 * sigma);
  const upper = (usl - mean) / (3 * sigma);
  const lower = (mean - lsl) / (3 * sigma);
  const cpk = Math.min(upper, lower);
  const verdict =
    cpk >= 1.33 ? { text: 'Capable, with room to spare (meets the common 1.33 target)', cls: 'bg-green-50 border-green-600 text-green-900' }
    : cpk >= 1.0 ? { text: 'Capable, but just barely: little room for drift', cls: 'bg-yellow-50 border-yellow-600 text-yellow-900' }
    : { text: 'Not capable: some output will fall outside the specs', cls: 'bg-red-50 border-red-600 text-red-900' };
  const diagnosis =
    cp < 1 ? 'Cp is below 1: the process is wider than the specs. Reduce variation (fix the system).'
    : cpk < 1 ? 'Cp is fine but Cpk is low: the process fits, it is just off-center. Re-center it (turn the knob).'
    : 'Fits and reasonably centered. Keep monitoring with control charts.';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Process Capability: Cp and Cpk</h1>
        <p className="text-gray-600 mb-6">
          A control chart tells you whether a process is stable. Capability tells you whether stable is good enough.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-blue-900 mb-2">Control limits = voice of the process</h3>
            <p className="text-gray-700">Calculated from your data. They describe what the process actually does.</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-600">
            <h3 className="font-bold text-lg text-orange-900 mb-2">Spec limits = voice of the customer</h3>
            <p className="text-gray-700">Set by the customer, the design, or a regulator. They describe what the process must do.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">The garage picture</h2>
          <p className="text-gray-700 mb-2">
            The spec limits are the <strong>garage walls</strong>. Your process spread (about ±3σ, so <strong>6σ</strong> wide) is the <strong>car</strong>.
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li><strong>Cp</strong> asks: is the car narrower than the garage?</li>
            <li><strong>Cpk</strong> asks: is it parked in the middle, or close to one wall?</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Cp: does it fit?</h3>
            <code className="block bg-gray-100 p-3 rounded text-sm mb-3">Cp = (USL − LSL) / 6σ</code>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Cp &lt; 1</strong>: process wider than the specs</li>
              <li><strong>Cp = 1</strong>: just fits, no room to spare</li>
              <li><strong>Cp &gt; 1</strong>: room on both sides</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">Example: specs 20–30 mm, 6σ = 9 mm → Cp = 10 / 9 = 1.11. Cp ignores centering.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Cpk: how close is the nearest wall?</h3>
            <code className="block bg-gray-100 p-3 rounded text-sm mb-3">Cpk = min( (USL − X̄) / 3σ , (X̄ − LSL) / 3σ )</code>
            <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
              <li>Measure the room to each spec limit.</li>
              <li>Divide each by 3σ (half the width of the process).</li>
              <li>Take the smaller one: the closest wall is the one you will hit.</li>
            </ol>
            <p className="text-sm text-gray-600 mt-3">Cpk ≤ Cp always. They are equal only when the process is centered.</p>
          </div>
        </div>

        {/* Interactive example */}
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-600 mb-8">
          <h3 className="font-bold text-lg text-amber-900 mb-1">Try it: coffee line, specs 0.95 to 1.05 lb</h3>
          <p className="text-sm text-gray-700 mb-4">Move the mean and the spread. Watch Cp and Cpk separately. Start: X̄ = 1.00, σ = 0.015 (Cp = Cpk = 1.11). Then drift the mean to 1.03 (Cpk = 0.44).</p>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="bg-white rounded-lg p-3">
              <BellCurve lsl={lsl} usl={usl} mean={round(mean, 3)} sigma={sigma} xMin={0.9} xMax={1.1} />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-800">
                Process mean (X̄): {mean.toFixed(3)} lb
                <input type="range" min={0.97} max={1.04} step={0.005} value={mean}
                  onChange={(e) => setMean(parseFloat(e.target.value))} className="w-full" />
              </label>
              <label className="block text-sm font-semibold text-gray-800">
                Standard deviation (σ): {sigma.toFixed(3)} lb
                <input type="range" min={0.008} max={0.025} step={0.001} value={sigma}
                  onChange={(e) => setSigma(parseFloat(e.target.value))} className="w-full" />
              </label>
              <div className="bg-white rounded p-3 text-sm font-mono text-gray-800 space-y-1">
                <div>Cp = 0.10 / (6 × {sigma.toFixed(3)}) = <strong>{cp.toFixed(2)}</strong></div>
                <div>Room above: (1.05 − {mean.toFixed(3)}) / {(3 * sigma).toFixed(3)} = {upper.toFixed(2)}</div>
                <div>Room below: ({mean.toFixed(3)} − 0.95) / {(3 * sigma).toFixed(3)} = {lower.toFixed(2)}</div>
                <div>Cpk = min = <strong>{cpk.toFixed(2)}</strong></div>
              </div>
              <div className={`border-l-4 p-3 rounded text-sm ${verdict.cls}`}>
                <strong>{verdict.text}.</strong> {diagnosis}
              </div>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">How good is good enough?</h3>
            <table className="w-full text-sm border border-slate-200">
              <thead className="bg-slate-800 text-white">
                <tr><th className="p-2 text-left">Cpk</th><th className="p-2 text-left">What it means</th><th className="p-2 text-left">Sigma level</th></tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2 font-semibold">&lt; 1.00</td><td className="p-2">Not capable: defects expected</td><td className="p-2">below 3σ</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">1.00</td><td className="p-2">Just fits, no room for drift</td><td className="p-2">3σ</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">1.33</td><td className="p-2">Common industry minimum</td><td className="p-2">4σ</td></tr>
                <tr className="border-t"><td className="p-2 font-semibold">2.00</td><td className="p-2">Six Sigma: plenty of room</td><td className="p-2">6σ</td></tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600 mt-2">Rule of thumb: sigma level ≈ 3 × Cpk.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">What should you fix?</h3>
            <table className="w-full text-sm border border-slate-200">
              <thead className="bg-slate-800 text-white">
                <tr><th className="p-2 text-left">Cp</th><th className="p-2 text-left">Cpk</th><th className="p-2 text-left">Diagnosis → fix</th></tr>
              </thead>
              <tbody>
                <tr className="border-t"><td className="p-2">High</td><td className="p-2">High</td><td className="p-2">Fits and centered → keep monitoring</td></tr>
                <tr className="border-t"><td className="p-2">High</td><td className="p-2">Low</td><td className="p-2">Off-center → re-center (turn the knob)</td></tr>
                <tr className="border-t"><td className="p-2">Low</td><td className="p-2">Low</td><td className="p-2">Too much variation → change the system</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gray-100 p-5 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">Where does Six Sigma's 3.4 defects per million come from?</h3>
          <p className="text-sm text-gray-700 mb-3">
            A perfectly centered process with specs at ±6σ would make only about 0.002 defects per million. Real processes drift,
            so the Six Sigma convention assumes the mean wanders up to 1.5σ toward one spec limit. That leaves 4.5σ to the nearest
            wall, and the tail beyond 4.5σ is 3.4 per million.
          </p>
          <table className="w-full text-sm border border-slate-200 bg-white">
            <thead className="bg-slate-800 text-white">
              <tr><th className="p-2 text-left">Sigma level</th><th className="p-2 text-left">Defects per million, centered</th><th className="p-2 text-left">With 1.5σ drift</th></tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-2">3σ</td><td className="p-2">2,700</td><td className="p-2">66,807</td></tr>
              <tr className="border-t"><td className="p-2">4σ</td><td className="p-2">63</td><td className="p-2">6,210</td></tr>
              <tr className="border-t"><td className="p-2">5σ</td><td className="p-2">0.6</td><td className="p-2">233</td></tr>
              <tr className="border-t"><td className="p-2">6σ</td><td className="p-2">0.002</td><td className="p-2">3.4</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Capability;
