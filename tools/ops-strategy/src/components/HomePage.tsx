import { companies } from '../data/companies'

const colorMap: Record<string, string> = {
  blue: 'border-blue-500 hover:bg-blue-900/30',
  green: 'border-green-500 hover:bg-green-900/30',
  amber: 'border-amber-500 hover:bg-amber-900/30',
  purple: 'border-purple-500 hover:bg-purple-900/30',
  teal: 'border-teal-500 hover:bg-teal-900/30',
  red: 'border-red-500 hover:bg-red-900/30',
}

const textColorMap: Record<string, string> = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  teal: 'text-teal-400',
  red: 'text-red-400',
}

export default function HomePage({ navigate }: { navigate: (page: string) => void }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            The Great Tech Reckoning
          </h1>
          <p className="text-xl text-gray-400">AI and Security Crossroads</p>
          <p className="text-sm text-gray-500 mt-2">Draft - Strategic Simulation Game</p>
        </div>

        {/* Background */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Background</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            It is 2025. Two American giants sit at the center of a shifting tech landscape:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="text-gray-300"><strong className="text-blue-400">PearCom:</strong> consumer king, premium devices, trusted security brand.</li>
            <li className="text-gray-300"><strong className="text-green-400">SoftCom:</strong> enterprise giant, cloud and productivity dominance, AI leader via OpenAIco.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mb-4">Their fate depends on a network of chokepoints:</p>
          <ul className="space-y-2">
            <li className="text-gray-300"><strong className="text-red-400">Silicore:</strong> the only trusted source of secure chips.</li>
            <li className="text-gray-300"><strong className="text-teal-400">OpenAIco:</strong> the AI brain trust.</li>
            <li className="text-gray-300"><strong className="text-amber-400">AmeriShop:</strong> consumer retail gatekeeper.</li>
            <li className="text-gray-300"><strong className="text-purple-400">CorpSolutions:</strong> enterprise distribution gatekeeper.</li>
          </ul>
          <p className="text-gray-400 mt-4 leading-relaxed">
            Global competition is rising (especially in Asia), regulators are tightening standards, and AI integration has created both massive upside and new risks. Each company must choose a strategy with clear costs, dependencies, and uncertain payoffs.
          </p>
        </div>

        {/* Core Mechanics */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Core Mechanics</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Each team selects one option each round.</li>
            <li>Options may require partners or minimum chip allocation.</li>
            <li>Risky options use a <strong className="text-white">d6 multiplier</strong>:</li>
          </ul>
          <div className="mt-3 ml-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { roll: '1', result: '0x revenue', color: 'text-red-400' },
              { roll: '2-3', result: '0.5x revenue', color: 'text-amber-400' },
              { roll: '4-5', result: '1.0x revenue', color: 'text-green-400' },
              { roll: '6', result: '1.5x revenue', color: 'text-blue-400' },
            ].map((d) => (
              <div key={d.roll} className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">{d.roll}</div>
                <div className={`text-sm ${d.color}`}>{d.result}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Chip starvation rule: If a manufacturer receives &lt;50% of required chips, its revenue is 0.
          </p>
        </div>

        {/* Round 2 Shocks */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Round 2 Shocks</h2>
          <p className="text-gray-300 mb-4">After Round 1 strategies are revealed, the GM rolls a d6:</p>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-gray-400">Roll 1-2</span>
                <h3 className="font-semibold text-white">Shock A: Supply Chain Fracture</h3>
              </div>
              <p className="text-gray-300 text-sm">Silicore capacity forced to 60 units for the round. Starvation rule still applies.</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-amber-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-gray-400">Roll 3-4</span>
                <h3 className="font-semibold text-white">Shock B: Deepfake Scandal</h3>
              </div>
              <div className="text-gray-300 text-sm space-y-1">
                <p>-2 to SoftCom Hardware Blitz, PearCom Enterprise Pivot, all OpenAIco options</p>
                <p>+1 to PearCom Fortress, Silicore PearCom Exclusive</p>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-gray-400">Roll 5-6</span>
                <h3 className="font-semibold text-white">Shock C: Antitrust Decree</h3>
              </div>
              <div className="text-gray-300 text-sm">
                <p>$3B fine in Round 2 for: Silicore PearCom Exclusive, OpenAIco SoftCom Exclusive, AmeriShop Premium Partner, CorpSolutions Integrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Tension */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">Strategic Tension</h2>
          <ul className="space-y-3">
            <li className="text-gray-300"><strong className="text-blue-400">PearCom</strong> wants enterprise access and AI, but risks weakening its consumer fortress.</li>
            <li className="text-gray-300"><strong className="text-green-400">SoftCom</strong> wants hardware control, but needs chips and a retailer to avoid a costly failure.</li>
            <li className="text-gray-300"><strong className="text-red-400">Silicore</strong> must balance capacity, bribes, and exclusivity.</li>
            <li className="text-gray-300"><strong className="text-teal-400">OpenAIco</strong> can chase growth at the risk of backlash or lawsuits.</li>
            <li className="text-gray-300"><strong className="text-amber-400">AmeriShop</strong> and <strong className="text-purple-400">CorpSolutions</strong> can extract value by choosing sides or staying neutral.</li>
          </ul>
          <p className="text-gray-400 mt-4 italic">
            This is a game about leverage, timing, and asymmetric dependencies.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Explore</h2>
          {/* Market Analysis Card */}
          <button
            onClick={() => navigate('market')}
            className="w-full text-left bg-gray-900 border border-gray-700 hover:bg-gray-800 rounded-xl p-5 mb-4 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white">Market Analysis</h3>
            <p className="text-gray-400 text-sm mt-1">Ecosystem map, critical dependencies, chip pressure points, and incentive patterns.</p>
          </button>

          {/* Company Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(c.id)}
                className={`text-left bg-gray-900 border ${colorMap[c.accentColor]} rounded-xl p-5 transition-colors`}
              >
                <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                <p className={`text-sm mt-1 ${textColorMap[c.accentColor]}`}>{c.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
