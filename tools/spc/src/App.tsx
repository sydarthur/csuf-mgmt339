import { useState } from 'react'
import ProcessChartsGuide from './ProcessChartsGuide_v2'
import Playground from './Playground'
import VideoSummary from './VideoSummary'
import Capability from './Capability'

function App() {
  const [currentView, setCurrentView] = useState<'guide' | 'capability' | 'playground' | 'video'>('guide')

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">SPC Learning Platform</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('guide')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentView === 'guide'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📚 Guide
              </button>
              <button
                onClick={() => setCurrentView('capability')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentView === 'capability'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                📐 Capability
              </button>
              <button
                onClick={() => setCurrentView('playground')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentView === 'playground'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🎮 Playground
              </button>
              <button
                onClick={() => setCurrentView('video')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentView === 'video'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🎥 Video Summary
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {currentView === 'guide' ? <ProcessChartsGuide /> : currentView === 'capability' ? <Capability /> : currentView === 'playground' ? <Playground /> : <VideoSummary />}

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-3">
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
