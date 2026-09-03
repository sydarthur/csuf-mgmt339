import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import MarketAnalysis from './components/MarketAnalysis'
import CompanyPage from './components/CompanyPage'
import { companies } from './data/companies'
import { getAccent } from './data/accent'

type Page = 'home' | 'market' | string

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '')
  return hash || 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)
  const [companiesOpen, setCompaniesOpen] = useState(false)

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (p: string) => {
    window.location.hash = p
    setCompaniesOpen(false)
  }

  const company = companies.find((c) => c.id === page)

  return (
    <div className="min-h-screen bg-parchment flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="bg-parchment/95 backdrop-blur-sm border-b-2 border-ink sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 font-display italic text-xl sm:text-2xl text-ink hover:text-rose-600 transition-colors shrink-0"
            >
              <span aria-hidden>🎲</span>
              <span>The Great Tech Reckoning</span>
            </button>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => navigate('home')}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all border-2 ${
                  page === 'home'
                    ? 'bg-ink text-parchment border-ink'
                    : 'border-transparent text-stone-600 hover:border-ink/20 hover:bg-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('market')}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all border-2 ${
                  page === 'market'
                    ? 'bg-ink text-parchment border-ink'
                    : 'border-transparent text-stone-600 hover:border-ink/20 hover:bg-white'
                }`}
              >
                Market Analysis
              </button>
              {/* Companies dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCompaniesOpen(!companiesOpen)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-1.5 border-2 ${
                    company
                      ? 'bg-ink text-parchment border-ink'
                      : 'border-transparent text-stone-600 hover:border-ink/20 hover:bg-white'
                  }`}
                >
                  {company ? (
                    <>
                      <span aria-hidden>{company.icon}</span> {company.name}
                    </>
                  ) : (
                    'Companies'
                  )}
                  <svg className={`w-4 h-4 transition-transform ${companiesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {companiesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCompaniesOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border-2 border-ink rounded-2xl shadow-card z-50 py-2 overflow-hidden">
                      {companies.map((c) => {
                        const accent = getAccent(c.accentColor)
                        return (
                          <button
                            key={c.id}
                            onClick={() => navigate(c.id)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-parchment-dark/60 transition-colors flex items-start gap-2.5 ${
                              page === c.id ? 'bg-parchment-dark/60' : ''
                            }`}
                          >
                            <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${accent.dot}`} />
                            <span>
                              <div className="font-semibold text-ink">{c.name}</div>
                              <div className="text-xs text-stone-500">{c.tagline}</div>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'market' && <MarketAnalysis />}
        {company && <CompanyPage company={company} />}
        {page !== 'home' && page !== 'market' && !company && (
          <div className="max-w-5xl mx-auto px-6 py-20 text-center">
            <h2 className="text-2xl text-stone-500">Page not found</h2>
            <button onClick={() => navigate('home')} className="mt-4 text-rose-600 font-semibold hover:underline">
              Go home
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-ink py-3">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-stone-500 font-mono">
            Built using generative AI. AI can make mistakes, so please double-check important information.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
