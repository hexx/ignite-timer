import { useState, useEffect } from 'react'
import { FiveSecondRule } from './components/FiveSecondRule'
import { TwoMinuteRule } from './components/TwoMinuteRule'
import { TenMinuteRule } from './components/TenMinuteRule'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card'
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
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">🔥 Ignite Timer</CardTitle>
            <CardDescription>読み込み中...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">🔥 Ignite Timer</CardTitle>
            <CardDescription className="text-destructive">
              エラー: {error}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">🔥 Ignite Timer</h1>
        <p className="mt-2 text-muted-foreground">
          行動を起こすための3つの心理学的アプローチ
        </p>
      </header>
      <nav className="mb-8 flex flex-wrap justify-center gap-2" data-testid="mode-nav">
        {modes.map((mode) => (
          <Button
            key={mode.id}
            variant={activeMode === mode.id ? 'default' : 'outline'}
            onClick={() => setActiveMode(mode.id)}
            data-testid={`mode-btn-${mode.id}`}
          >
            {mode.emoji} {mode.label}
          </Button>
        ))}
      </nav>
      <main className="w-full max-w-md">
        {activeMode === 'five-second' && <FiveSecondRule />}
        {activeMode === 'two-minute' && <TwoMinuteRule />}
        {activeMode === 'ten-minute' && <TenMinuteRule />}
      </main>
    </div>
  )
}

export default App
