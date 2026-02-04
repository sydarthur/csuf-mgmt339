export default function MarketAnalysis() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-2">Market Analysis</h1>
        <p className="text-gray-400 mb-8">Quick Glance</p>

        {/* Ecosystem Map */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Ecosystem Map</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { name: 'PearCom', desc: 'Premium consumer devices, security reputation, strong brand lock-in.', color: 'text-purple-400' },
              { name: 'SoftCom', desc: 'Enterprise software + AI lead, weak consumer hardware track record.', color: 'text-red-400' },
              { name: 'Silicore', desc: 'Sole trusted secure chip supplier; capacity is the main bottleneck.', color: 'text-blue-400' },
              { name: 'OpenAIco', desc: 'AI brain trust; distribution depends on partners.', color: 'text-green-400' },
              { name: 'AmeriShop', desc: 'Dominant consumer retailer; controls demand visibility.', color: 'text-yellow-400' },
              { name: 'CorpSolutions', desc: 'Enterprise integration gatekeeper; controls enterprise access.', color: 'text-gray-400' },
            ].map((p) => (
              <div key={p.name} className="bg-gray-800 rounded-lg p-4">
                <h3 className={`font-semibold ${p.color}`}>{p.name}</h3>
                <p className="text-gray-300 text-sm mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Dependencies */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Critical Dependencies</h2>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-400 mb-2">PearCom Enterprise Pivot requires:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>CorpSolutions Integrator for enterprise access</li>
                <li>AI access from SoftCom AI Arms Dealer or OpenAIco Open Model/Hardware Integration</li>
                <li>At least 15 chips (50% of 30)</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-semibold text-red-400 mb-2">SoftCom Hardware Blitz requires:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>AmeriShop Premium Partner (retailer access)</li>
                <li>At least 20 chips (50% of 40)</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-400 mb-2">Silicore Split Fab:</h3>
              <p className="text-gray-300 text-sm">Yield roll can cut capacity to 60 in a round</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="font-semibold text-green-400 mb-2">OpenAIco Hardware Integration:</h3>
              <p className="text-gray-300 text-sm">Requires PearCom Enterprise Pivot</p>
            </div>
          </div>
        </div>

        {/* Chip Pressure Points */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Chip Pressure Points</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Demand (Full Load)', value: '130', sub: 'PearCom 90 + SoftCom 40', color: 'text-white' },
              { label: 'Base Capacity', value: '100', sub: 'Normal operations', color: 'text-green-400' },
              { label: 'Shock A Capacity', value: '60', sub: 'Supply chain fracture', color: 'text-red-400' },
              { label: 'Starvation Trigger', value: '<50%', sub: 'Revenue drops to 0', color: 'text-amber-400' },
            ].map((c) => (
              <div key={c.label} className="bg-gray-800 rounded-lg p-4 text-center">
                <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
                <div className="text-sm text-gray-400 mt-1">{c.label}</div>
                <div className="text-xs text-gray-500 mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Retail Leverage */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Retail Leverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-yellow-400 mb-3">AmeriShop</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm font-medium text-white">Premium Partner</div>
                  <div className="text-xs text-gray-400 mt-1">Takes 25% of target gross revenue. Gives target +1 die roll.</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm font-medium text-white">Private Label</div>
                  <div className="text-xs text-gray-400 mt-1">Target loses 3B gross and -1 die roll.</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-400 mb-3">CorpSolutions</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm font-medium text-white">Integrator</div>
                  <div className="text-xs text-gray-400 mt-1">Takes 25% of target gross revenue. Grants enterprise access.</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-sm font-medium text-white">Migration Agent</div>
                  <div className="text-xs text-gray-400 mt-1">Target pays 6B bounty; opposing manufacturer loses 5B. Vetoes opposing enterprise strategy.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shock Summary */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Shock Summary (Round 2)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-3 text-left text-gray-400 font-medium">Shock</th>
                  <th className="py-3 px-3 text-left text-gray-400 font-medium">Roll</th>
                  <th className="py-3 px-3 text-left text-gray-400 font-medium">Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-3 text-red-400 font-medium">Supply Chain Fracture</td>
                  <td className="py-3 px-3 text-gray-300">1-2</td>
                  <td className="py-3 px-3 text-gray-300">Capacity forced to 60</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-3 text-amber-400 font-medium">Deepfake Scandal</td>
                  <td className="py-3 px-3 text-gray-300">3-4</td>
                  <td className="py-3 px-3 text-gray-300">AI-heavy strategies get -2 roll; privacy-first get +1</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-3 text-purple-400 font-medium">Antitrust Decree</td>
                  <td className="py-3 px-3 text-gray-300">5-6</td>
                  <td className="py-3 px-3 text-gray-300">3B fine for exclusive/partner strategies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Incentive Patterns */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Incentive Patterns</h2>
          <ul className="space-y-3">
            <li className="text-gray-300"><strong className="text-purple-400">PearCom</strong> does best when it controls chips and keeps enterprise access aligned.</li>
            <li className="text-gray-300"><strong className="text-red-400">SoftCom</strong> needs a retailer + chips; otherwise Hardware Blitz collapses.</li>
            <li className="text-gray-300"><strong className="text-blue-400">Silicore</strong> profits are stable and high across most scenarios.</li>
            <li className="text-gray-300"><strong className="text-yellow-400">Retailers</strong> and <strong className="text-gray-400">enterprise gatekeepers</strong> can extract revenue by choosing sides.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
