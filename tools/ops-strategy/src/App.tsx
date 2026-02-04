import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import MarketAnalysis from './components/MarketAnalysis'
import CompanyPage from './components/CompanyPage'
import { companies } from './data/companies'

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
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('home')}
              className="text-lg font-bold hover:text-gray-300 transition-colors"
            >
              The Great Tech Reckoning
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('home')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  page === 'home'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('market')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  page === 'market'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                Market Analysis
              </button>
              {/* Companies dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCompaniesOpen(!companiesOpen)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1 ${
                    company
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {company ? company.name : 'Companies'}
                  <svg className={`w-4 h-4 transition-transform ${companiesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {companiesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setCompaniesOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50 py-2">
                      {companies.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => navigate(c.id)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors ${
                            page === c.id ? 'text-white bg-gray-700' : 'text-gray-300'
                          }`}
                        >
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.tagline}</div>
                        </button>
                      ))}
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
            <h2 className="text-2xl text-gray-400">Page not found</h2>
            <button onClick={() => navigate('home')} className="mt-4 text-indigo-400 hover:underline">
              Go home
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            Built using generative AI. AI can make mistakes, so please double-check important information.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
