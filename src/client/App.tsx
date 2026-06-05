import { useState, useEffect } from 'react'
import { FiveSecondRule } from './components/FiveSecondRule'
import { TwoMinuteRule } from './components/TwoMinuteRule'
import { TenMinuteRule } from './components/TenMinuteRule'
import './App.css'

type Mode = 'five-second' | 'two-minute' | 'ten-minute'

interface ModeInfo {
  id: Mode
  label: string
  emoji: string
}

function App() {
  const [activeMode, setActiveMode] = useState<Mode>('five-second')
  const [modes, setModes] = useState<ModeInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModes = async () => {
      try {
        const response = await fetch('/api/modes')
        if (!response.ok) {
          throw new Error('モード情報の取得に失敗しました')
        }
        const data = await response.json()
        setModes(data.modes)
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }

    fetchModes()
  }, [])

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🔥 Ignite Timer</h1>
          <p>読み込み中...</p>
        </header>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🔥 Ignite Timer</h1>
          <p className="error-message">エラー: {error}</p>
        </header>
      </div>
    )
  }

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
