import { companies } from '../data/companies'
import { getAccent } from '../data/accent'

const dice = [
  { roll: '1', result: '0x revenue', color: 'text-rose-600' },
  { roll: '2-3', result: '0.5x revenue', color: 'text-amber-600' },
  { roll: '4-5', result: '1.0x revenue', color: 'text-emerald-600' },
  { roll: '6', result: '1.5x revenue', color: 'text-blue-600' },
]

function FileLabel({ children }: { children: string }) {
  return <div className="font-mono text-[11px] uppercase tracking-widest text-stone-400 mb-2">{children}</div>
}

export default function HomePage({ navigate }: { navigate: (page: string) => void }) {
  return (
    <div className="min-h-screen text-stone-800">
      <div className="max-w-5xl mx-auto px-6 py-12 sm:py-14">
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-block mb-5 px-4 py-1.5 rounded-full border-2 border-ink bg-white font-mono text-xs uppercase tracking-widest text-stone-600">
            🎲 Strategic Simulation &middot; Draft
          </div>
          <h1 className="font-display italic text-5xl sm:text-7xl text-ink mb-3 leading-tight">
            The Great Tech Reckoning
          </h1>
          <p className="text-xl text-stone-600">AI and Security Crossroads</p>
        </div>

        {/* Background */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>File 01 &mdash; Background</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Background</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            It is 2026. Two American giants sit at the center of a shifting tech landscape:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="text-stone-700"><strong className={getAccent('purple').text}>PearCom:</strong> consumer king, premium devices, trusted security brand.</li>
            <li className="text-stone-700"><strong className={getAccent('red').text}>SoftCom:</strong> enterprise giant, cloud and productivity dominance, AI leader via OpenAIco.</li>
          </ul>
          <p className="text-stone-700 leading-relaxed mb-4">Their fate depends on a network of chokepoints:</p>
          <ul className="space-y-2">
            <li className="text-stone-700"><strong className={getAccent('blue').text}>Silicore:</strong> the only trusted source of secure chips.</li>
            <li className="text-stone-700"><strong className={getAccent('green').text}>OpenAIco:</strong> the AI brain trust.</li>
            <li className="text-stone-700"><strong className={getAccent('yellow').text}>AmeriShop:</strong> consumer retail gatekeeper.</li>
            <li className="text-stone-700"><strong className={getAccent('gray').text}>CorpSolutions:</strong> enterprise distribution gatekeeper.</li>
          </ul>
          <p className="text-stone-500 mt-4 leading-relaxed">
            Global competition is rising (especially in Asia), regulators are tightening standards, and AI integration has created both massive upside and new risks. Each company must choose a strategy with clear costs, dependencies, and uncertain payoffs.
          </p>
        </div>

        {/* Core Mechanics */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>File 02 &mdash; Rules</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Core Mechanics</h2>
          <ul className="space-y-2 text-stone-700">
            <li>Each team selects one option each round.</li>
            <li>Options may require partners or minimum chip allocation.</li>
            <li>Risky options use a roll of a six-sided <strong className="text-ink">die (d6)</strong> to multiply revenue:</li>
          </ul>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dice.map((d) => (
              <div key={d.roll} className="bg-parchment rounded-xl p-4 text-center border-2 border-ink/10">
                <div className="text-2xl mb-1" aria-hidden>🎲</div>
                <div className="font-mono font-bold text-ink">{d.roll}</div>
                <div className={`text-sm font-semibold ${d.color}`}>{d.result}</div>
              </div>
            ))}
          </div>
          <p className="text-stone-500 mt-4 text-sm">
            Chip starvation rule: if a manufacturer receives less than 50% of the chips it required, its revenue drops to $0.
          </p>
        </div>

        {/* Round 2 Shocks */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 border-2 border-ink shadow-card">
          <FileLabel>File 03 &mdash; Wildcards</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Round 2 Shocks</h2>
          <p className="text-stone-700 mb-4">After Round 1 strategies are revealed, the Game Master (GM) rolls a six-sided die (d6):</p>
          <div className="space-y-4">
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-rose-500">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-mono text-stone-500">Roll 1-2</span>
                <h3 className="font-semibold text-ink">Shock A: Supply Chain Fracture</h3>
              </div>
              <p className="text-stone-600 text-sm">Silicore capacity forced to 60 units for the round, cutting Silicore's own revenue proportionally too. Starvation rule still applies.</p>
            </div>
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-amber-500">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-mono text-stone-500">Roll 3-4</span>
                <h3 className="font-semibold text-ink">Shock B: Deepfake Scandal</h3>
              </div>
              <div className="text-stone-600 text-sm space-y-1">
                <p>-2 dice roll penalty for SoftCom Hardware Blitz, PearCom Enterprise Pivot, and all OpenAIco options</p>
                <p>+1 dice roll bonus for PearCom Fortress and Silicore PearCom Exclusive</p>
              </div>
            </div>
            <div className="bg-parchment rounded-xl p-4 border-l-4 border-violet-500">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-sm font-mono text-stone-500">Roll 5-6</span>
                <h3 className="font-semibold text-ink">Shock C: Antitrust Decree</h3>
              </div>
              <div className="text-stone-600 text-sm">
                <p>$3 billion fine in Round 2 for: Silicore PearCom Exclusive, OpenAIco SoftCom Exclusive, AmeriShop Premium Partner, CorpSolutions Integrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Tension */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-10 border-2 border-ink shadow-card">
          <FileLabel>File 04 &mdash; Stakes</FileLabel>
          <h2 className="font-display text-3xl mb-4 text-ink">Strategic Tension</h2>
          <ul className="space-y-3">
            <li className="text-stone-700"><strong className={getAccent('purple').text}>PearCom</strong> wants enterprise access and AI, but risks weakening its consumer fortress.</li>
            <li className="text-stone-700"><strong className={getAccent('red').text}>SoftCom</strong> wants hardware control, but needs chips and a retailer to avoid a costly failure.</li>
            <li className="text-stone-700"><strong className={getAccent('blue').text}>Silicore</strong> must balance capacity, bribes, and exclusivity.</li>
            <li className="text-stone-700"><strong className={getAccent('green').text}>OpenAIco</strong> can chase growth at the risk of backlash or lawsuits.</li>
            <li className="text-stone-700"><strong className={getAccent('yellow').text}>AmeriShop</strong> and <strong className={getAccent('gray').text}>CorpSolutions</strong> can extract value by choosing sides or staying neutral.</li>
          </ul>
          <p className="text-stone-500 mt-4 italic">
            This is a game about leverage, timing, and asymmetric dependencies.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="mb-8">
          <h2 className="font-display text-3xl mb-5 text-ink text-center">Choose Your Role</h2>

          {/* Market Analysis Card */}
          <button
            onClick={() => navigate('market')}
            className="w-full text-left bg-white border-2 border-ink rounded-2xl p-5 sm:p-6 mb-5 shadow-card hover:-translate-y-1 transition-transform duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl shrink-0" aria-hidden>📊</span>
              <div>
                <h3 className="font-display text-2xl text-ink">Market Analysis</h3>
                <p className="text-stone-600 text-sm mt-1">Ecosystem map, critical dependencies, chip pressure points, and incentive patterns.</p>
              </div>
            </div>
          </button>

          {/* Company Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.map((c) => {
              const accent = getAccent(c.accentColor)
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(c.id)}
                  className={`text-left bg-white rounded-2xl overflow-hidden border-2 ${accent.borderStrong} shadow-card hover:-translate-y-1.5 hover:rotate-[-0.5deg] transition-all duration-200`}
                >
                  <div className={`${accent.solid} ${accent.solidText} px-5 py-3 flex items-center justify-between`}>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-90">Role Card</span>
                    <span className="text-2xl leading-none" aria-hidden>{c.icon}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl text-ink">{c.name}</h3>
                    <p className={`text-sm mt-1 font-semibold ${accent.text}`}>{c.tagline}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
