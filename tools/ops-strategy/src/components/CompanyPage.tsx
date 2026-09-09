import { Company } from '../data/companies'
import { getAccent } from '../data/accent'

export default function CompanyPage({ company }: { company: Company }) {
  const accent = getAccent(company.accentColor)

  return (
    <div className="min-h-screen text-stone-800">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header — the role card itself */}
        <div className={`relative bg-white rounded-3xl border-4 ${accent.borderStrong} shadow-card p-8 sm:p-10 mb-8 overflow-hidden`}>
          <div className={`absolute top-0 right-0 ${accent.soft} w-56 h-56 rounded-full blur-3xl opacity-70 -mr-16 -mt-16`} aria-hidden />
          <div className="relative flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className={`inline-block ${accent.solid} ${accent.solidText} text-xs font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-widest`}>
                Role Card
              </span>
              <h1 className="font-display italic text-4xl sm:text-5xl text-ink mt-4">{company.name}</h1>
              <p className={`text-lg mt-1 font-semibold ${accent.text}`}>{company.tagline}</p>
            </div>
            <div className={`shrink-0 w-20 h-20 rounded-2xl ${accent.soft} border-2 ${accent.borderStrong} flex items-center justify-center text-4xl`}>
              <span aria-hidden>{company.icon}</span>
            </div>
          </div>
        </div>

        {/* Who You Are */}
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-ink/10 shadow-card">
          <div className="font-mono text-[11px] uppercase tracking-widest text-stone-400 mb-2">Dossier</div>
          <h2 className="font-display text-2xl mb-3 text-ink">Who You Are</h2>
          <p className="text-stone-700 leading-relaxed">{company.description}</p>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-card">
            <h2 className="font-display text-2xl mb-3 text-emerald-700 flex items-center gap-2">
              <span aria-hidden>&#9989;</span> Advantages
            </h2>
            <ul className="space-y-2">
              {company.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700">
                  <span className="text-emerald-600 font-mono font-bold mt-0.5 shrink-0">+</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-rose-200 shadow-card">
            <h2 className="font-display text-2xl mb-3 text-rose-700 flex items-center gap-2">
              <span aria-hidden>&#10060;</span> Disadvantages
            </h2>
            <ul className="space-y-2">
              {company.disadvantages.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700">
                  <span className="text-rose-600 font-mono font-bold mt-0.5 shrink-0">&minus;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Super Power */}
        <div className={`${accent.soft} border-2 ${accent.borderStrong} rounded-2xl p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h2 className="font-display text-2xl text-ink">
              <span aria-hidden className="mr-1">&#9889;</span>
              Super Power: <span className={accent.text}>{company.superPower.name}</span>
            </h2>
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
              company.superPower.type === 'nuclear'
                ? 'bg-rose-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {company.superPower.type === 'nuclear' ? '\u{1F4A5} Once Per Game' : '\u{267B}️ Once Per Round'}
            </span>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest border-2 border-ink/30 bg-white/60 text-ink">
              {company.superPower.trigger === 'automatic' ? '\u{2699}\u{FE0F} Automatic' : '\u{1F91A} Manual — GM Approval'}
            </span>
          </div>
          <p className="text-stone-700 leading-relaxed">{company.superPower.effect}</p>
          <p className="text-stone-500 text-sm mt-3 italic font-mono">&ldquo;{company.superPower.reason}&rdquo;</p>
        </div>

        {/* Strategy Options Table */}
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-ink/10 shadow-card">
          <h2 className="font-display text-2xl mb-4 text-ink flex items-center gap-2">
            <span aria-hidden>&#128203;</span> Strategic Options
          </h2>
          <div className="overflow-x-auto rounded-xl border-2 border-ink/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink text-parchment">
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Option</th>
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Upfront Cost</th>
                  {company.hasChipsColumn && (
                    <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Chips Needed</th>
                  )}
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Gross Revenue</th>
                  {company.hasAllocationColumn && (
                    <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Allocation</th>
                  )}
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Dice Roll</th>
                  <th className="py-3 px-3 text-left font-mono font-medium uppercase text-xs tracking-wider">Dependencies / Effects</th>
                </tr>
              </thead>
              <tbody>
                {company.strategies.map((s, i) => (
                  <tr key={i} className={`border-b border-stone-100 last:border-b-0 ${i % 2 === 1 ? 'bg-parchment/60' : 'bg-white'} hover:bg-amber-50 transition-colors`}>
                    <td className={`py-3 px-3 font-bold font-mono ${accent.text}`}>{s.name}</td>
                    <td className="py-3 px-3 text-stone-700 font-mono">${s.upfrontCost} billion</td>
                    {company.hasChipsColumn && (
                      <td className="py-3 px-3 text-stone-700 font-mono">{s.chipsNeeded}</td>
                    )}
                    <td className="py-3 px-3 text-stone-700 font-mono">{s.grossRevenue}</td>
                    {company.hasAllocationColumn && (
                      <td className="py-3 px-3 text-stone-700 font-mono">{s.allocation}</td>
                    )}
                    <td className="py-3 px-3 text-stone-700 font-mono">{s.die}</td>
                    <td className="py-3 px-3 text-stone-500 text-xs leading-relaxed max-w-xs">{s.dependencies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Negotiation Notes */}
        <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-6">
          <h2 className="font-display text-2xl mb-3 text-ink flex items-center gap-2">
            <span aria-hidden>&#128221;</span> Notes for Negotiation
          </h2>
          <ul className="space-y-2">
            {company.negotiationNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-stone-700">
                <span className="text-amber-600 mt-1 shrink-0">&bull;</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
