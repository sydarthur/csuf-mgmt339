const ecosystem = [
  { name: 'PearCom', icon: '📱', desc: 'Premium consumer devices, security reputation, strong brand lock-in.', color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200' },
  { name: 'SoftCom', icon: '☁️', desc: 'Enterprise software + AI lead, weak consumer hardware track record.', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
  { name: 'Silicore', icon: '⚙️', desc: 'Sole trusted secure chip supplier; capacity is the main bottleneck.', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  { name: 'OpenAIco', icon: '🧠', desc: 'AI brain trust; distribution depends on partners.', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { name: 'AmeriShop', icon: '🛒', desc: 'Dominant consumer retailer; controls demand visibility.', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  { name: 'CorpSolutions', icon: '🏛️', desc: 'Enterprise integration gatekeeper; controls enterprise access.', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
]

function FileLabel({ children }: { children: string }) {
  return <div className="font-mono text-[11px] uppercase tracking-widest text-stone-400 mb-2">{children}</div>
}

export default function MarketAnalysis() {
  return (
    <div className="min-h-screen text-stone-800">
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-14">
        <div className="text-center mb-10">
          <div className="inline-block mb-5 px-4 py-1.5 rounded-full border-2 border-ink bg-white font-mono text-xs uppercase tracking-widest text-stone-600">
            📊 Intel Briefing
          </div>
          <h1 className="font-display italic text-5xl sm:text-6xl text-ink mb-2">Market Analysis</h1>
          <p className="text-stone-600">Quick Glance</p>
        </div>

        {/* Ecosystem Map */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>Map 01</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Ecosystem Map</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ecosystem.map((p) => (
              <div key={p.name} className={`${p.bg} border-2 ${p.border} rounded-xl p-4 flex items-start gap-3`}>
                <span className="text-2xl shrink-0" aria-hidden>{p.icon}</span>
                <div>
                  <h3 className={`font-semibold ${p.color}`}>{p.name}</h3>
                  <p className="text-stone-600 text-sm mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Dependencies */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>Map 02</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Critical Dependencies</h2>
          <div className="space-y-4">
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-violet-500">
              <h3 className="font-semibold text-violet-700 mb-2">PearCom Enterprise Pivot requires:</h3>
              <ul className="text-stone-700 text-sm space-y-1">
                <li>CorpSolutions Integrator for enterprise access</li>
                <li>AI access from SoftCom AI Arms Dealer or OpenAIco Open Model/Hardware Integration</li>
                <li>At least 15 chips (50% of 30)</li>
              </ul>
            </div>
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-rose-500">
              <h3 className="font-semibold text-rose-700 mb-2">SoftCom Hardware Blitz requires:</h3>
              <ul className="text-stone-700 text-sm space-y-1">
                <li>AmeriShop Premium Partner (retailer access)</li>
                <li>At least 20 chips (50% of 40)</li>
              </ul>
            </div>
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-700 mb-2">Silicore Split Fab:</h3>
              <p className="text-stone-700 text-sm">Yield roll can cut capacity to 60 in a round</p>
            </div>
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-emerald-500">
              <h3 className="font-semibold text-emerald-700 mb-2">OpenAIco Hardware Integration:</h3>
              <p className="text-stone-700 text-sm">Requires PearCom Enterprise Pivot</p>
            </div>
          </div>
        </div>

        {/* Chip Pressure Points */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>Map 03</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Chip Pressure Points</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Demand (Full Load)', value: '130', sub: 'PearCom 90 + SoftCom 40', color: 'text-ink' },
              { label: 'Base Capacity', value: '100', sub: 'Normal operations', color: 'text-emerald-600' },
              { label: 'Shock A Capacity', value: '60', sub: 'Supply chain fracture', color: 'text-rose-600' },
              { label: 'Starvation Trigger', value: '<50%', sub: 'Revenue drops to 0', color: 'text-amber-600' },
            ].map((c) => (
              <div key={c.label} className="bg-parchment rounded-xl p-4 text-center border-2 border-ink/10">
                <div className={`text-3xl font-mono font-bold ${c.color}`}>{c.value}</div>
                <div className="text-sm text-stone-700 mt-1 font-semibold">{c.label}</div>
                <div className="text-xs text-stone-500 mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Retail Leverage */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>Map 04</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Retail Leverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2"><span aria-hidden>🛒</span> AmeriShop</h3>
              <div className="space-y-3">
                <div className="bg-parchment rounded-lg p-3 border-2 border-ink/10">
                  <div className="text-sm font-semibold text-ink">Premium Partner</div>
                  <div className="text-xs text-stone-600 mt-1">Takes 25% of the target&apos;s gross revenue. Gives the target a +1 bonus on its dice roll.</div>
                </div>
                <div className="bg-parchment rounded-lg p-3 border-2 border-ink/10">
                  <div className="text-sm font-semibold text-ink">Private Label</div>
                  <div className="text-xs text-stone-600 mt-1">Target loses $3 billion in gross revenue and takes a -1 penalty on its dice roll.</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2"><span aria-hidden>🏛️</span> CorpSolutions</h3>
              <div className="space-y-3">
                <div className="bg-parchment rounded-lg p-3 border-2 border-ink/10">
                  <div className="text-sm font-semibold text-ink">Integrator</div>
                  <div className="text-xs text-stone-600 mt-1">Takes 25% of the target&apos;s gross revenue. Grants enterprise access.</div>
                </div>
                <div className="bg-parchment rounded-lg p-3 border-2 border-ink/10">
                  <div className="text-sm font-semibold text-ink">Migration Agent</div>
                  <div className="text-xs text-stone-600 mt-1">Target pays a $5 billion bounty and receives an $8 billion bonus; the opposing manufacturer loses $5 billion. Vetoes the opposing enterprise strategy.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shock Summary */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>Map 05</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Shock Summary (Round 2)</h2>
          <div className="overflow-x-auto rounded-xl border-2 border-ink/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink text-parchment">
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Shock</th>
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Roll</th>
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100 bg-white">
                  <td className="py-3 px-3 text-rose-700 font-bold font-mono">Supply Chain Fracture</td>
                  <td className="py-3 px-3 text-stone-700 font-mono">1-2</td>
                  <td className="py-3 px-3 text-stone-700">Capacity forced to 60</td>
                </tr>
                <tr className="border-b border-stone-100 bg-parchment/60">
                  <td className="py-3 px-3 text-amber-700 font-bold font-mono">Deepfake Scandal</td>
                  <td className="py-3 px-3 text-stone-700 font-mono">3-4</td>
                  <td className="py-3 px-3 text-stone-700">AI-heavy strategies get a -2 dice roll penalty; privacy-first strategies get a +1 bonus</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-3 text-violet-700 font-bold font-mono">Antitrust Decree</td>
                  <td className="py-3 px-3 text-stone-700 font-mono">5-6</td>
                  <td className="py-3 px-3 text-stone-700">$3 billion fine for exclusive or partner strategies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Incentive Patterns */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-ink shadow-card">
          <FileLabel>Map 06</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Incentive Patterns</h2>
          <ul className="space-y-3">
            <li className="text-stone-700"><strong className="text-violet-700">PearCom</strong> does best when it controls chips and keeps enterprise access aligned.</li>
            <li className="text-stone-700"><strong className="text-rose-700">SoftCom</strong> needs a retailer + chips; otherwise Hardware Blitz collapses.</li>
            <li className="text-stone-700"><strong className="text-blue-700">Silicore</strong> profits are stable and high across most scenarios.</li>
            <li className="text-stone-700"><strong className="text-amber-700">Retailers</strong> and <strong className="text-slate-700">enterprise gatekeepers</strong> can extract revenue by choosing sides.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
