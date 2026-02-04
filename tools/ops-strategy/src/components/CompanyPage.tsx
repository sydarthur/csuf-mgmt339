import { Company } from '../data/companies'

const colorMap: Record<string, { bg: string; border: string; text: string; headerBg: string; badge: string }> = {
  blue: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400', headerBg: 'bg-blue-900/50', badge: 'bg-blue-500' },
  green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', headerBg: 'bg-green-900/50', badge: 'bg-green-500' },
  yellow: { bg: 'bg-yellow-900/30', border: 'border-yellow-500', text: 'text-yellow-400', headerBg: 'bg-yellow-900/50', badge: 'bg-yellow-500' },
  purple: { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400', headerBg: 'bg-purple-900/50', badge: 'bg-purple-500' },
  gray: { bg: 'bg-gray-800/30', border: 'border-gray-500', text: 'text-gray-400', headerBg: 'bg-gray-800/50', badge: 'bg-gray-500' },
  red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', headerBg: 'bg-red-900/50', badge: 'bg-red-500' },
}

export default function CompanyPage({ company }: { company: Company }) {
  const colors = colorMap[company.accentColor] || colorMap.blue

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className={`${colors.headerBg} border ${colors.border} rounded-xl p-8 mb-8`}>
          <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
            Role Card
          </span>
          <h1 className="text-4xl font-bold mt-4 text-white">{company.name}</h1>
          <p className={`text-lg mt-1 ${colors.text} font-medium`}>{company.tagline}</p>
        </div>

        {/* Who You Are */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-3 text-white">Who You Are</h2>
          <p className="text-gray-300 leading-relaxed">{company.description}</p>
        </div>

        {/* Advantages & Disadvantages */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-green-400">Advantages</h2>
            <ul className="space-y-2">
              {company.advantages.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 mt-1 shrink-0">+</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-3 text-red-400">Disadvantages</h2>
            <ul className="space-y-2">
              {company.disadvantages.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-red-400 mt-1 shrink-0">-</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Super Power */}
        <div className={`${colors.bg} border ${colors.border} rounded-xl p-6 mb-6`}>
          <h2 className="text-xl font-semibold mb-2 text-white">
            Super Power: <span className={colors.text}>{company.superPower.name}</span>
          </h2>
          <p className="text-gray-300 leading-relaxed">{company.superPower.effect}</p>
        </div>

        {/* Strategy Options Table */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Strategic Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th className="py-3 px-3 text-gray-400 font-medium">Option</th>
                  <th className="py-3 px-3 text-gray-400 font-medium">Upfront Cost</th>
                  {company.hasChipsColumn && (
                    <th className="py-3 px-3 text-gray-400 font-medium">Chips Needed</th>
                  )}
                  <th className="py-3 px-3 text-gray-400 font-medium">Gross Revenue</th>
                  {company.hasAllocationColumn && (
                    <th className="py-3 px-3 text-gray-400 font-medium">Allocation</th>
                  )}
                  <th className="py-3 px-3 text-gray-400 font-medium">Die</th>
                  <th className="py-3 px-3 text-gray-400 font-medium">Dependencies / Effects</th>
                </tr>
              </thead>
              <tbody>
                {company.strategies.map((s, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className={`py-3 px-3 font-medium ${colors.text}`}>{s.name}</td>
                    <td className="py-3 px-3 text-gray-300">{s.upfrontCost}B</td>
                    {company.hasChipsColumn && (
                      <td className="py-3 px-3 text-gray-300">{s.chipsNeeded}</td>
                    )}
                    <td className="py-3 px-3 text-gray-300">{s.grossRevenue}</td>
                    {company.hasAllocationColumn && (
                      <td className="py-3 px-3 text-gray-300">{s.allocation}</td>
                    )}
                    <td className="py-3 px-3 text-gray-300">{s.die}</td>
                    <td className="py-3 px-3 text-gray-400 text-xs leading-relaxed max-w-xs">{s.dependencies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Negotiation Notes */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-3 text-white">Notes for Negotiation</h2>
          <ul className="space-y-2">
            {company.negotiationNotes.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-gray-500 mt-1 shrink-0">&bull;</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
