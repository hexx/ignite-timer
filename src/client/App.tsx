import { useState } from 'react'
import { FiveSecondRule } from './components/FiveSecondRule'
import { TwoMinuteRule } from './components/TwoMinuteRule'
import { TenMinuteRule } from './components/TenMinuteRule'
import './App.css'

type Mode = 'five-second' | 'two-minute' | 'ten-minute'

const modes: { id: Mode; label: string; emoji: string }[] = [
  { id: 'five-second', label: '5秒ルール', emoji: '⚡' },
  { id: 'two-minute', label: '2分間ルール', emoji: '🏃' },
  { id: 'ten-minute', label: '10分間ルール', emoji: '🔥' },
]

function App() {
  const [activeMode, setActiveMode] = useState<Mode>('five-second')

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 Ignite Timer</h1>
        <p>行動を起こすための3つの心理学的アプローチ</p>
      </header>
      <nav className="mode-nav" data-testid="mode-nav">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`mode-btn ${activeMode === mode.id ? 'active' : ''}`}
            onClick={() => setActiveMode(mode.id)}
            data-testid={`mode-btn-${mode.id}`}
          >
            {mode.emoji} {mode.label}
          </button>
        ))}
      </nav>
      <main className="timer-container">
        {activeMode === 'five-second' && <FiveSecondRule />}
        {activeMode === 'two-minute' && <TwoMinuteRule />}
        {activeMode === 'ten-minute' && <TenMinuteRule />}
      </main>
    </div>
  )
}

export default App
