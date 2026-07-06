import { useState, type ComponentType } from 'react'
import { FiveSecondRule } from './components/FiveSecondRule'
import { TwoMinuteRule } from './components/TwoMinuteRule'
import { TenMinuteRule } from './components/TenMinuteRule'
import { Button } from './components/ui/button'

type Mode = 'five-second' | 'two-minute' | 'ten-minute'

interface ModeInfo {
  id: Mode
  label: string
  emoji: string
}

const MODES: ModeInfo[] = [
  { id: 'five-second', label: '5秒ルール', emoji: '⚡' },
  { id: 'two-minute', label: '2分間ルール', emoji: '🏃' },
  { id: 'ten-minute', label: '10分間ルール', emoji: '🔥' },
]

const MODE_COMPONENTS: Record<Mode, ComponentType> = {
  'five-second': FiveSecondRule,
  'two-minute': TwoMinuteRule,
  'ten-minute': TenMinuteRule,
}

function App() {
  const [activeMode, setActiveMode] = useState<Mode>('five-second')

  const ActiveComponent = MODE_COMPONENTS[activeMode]

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">🔥 Ignite Timer</h1>
        <p className="mt-2 text-muted-foreground">
          行動を起こすための3つの心理学的アプローチ
        </p>
      </header>
      <nav className="mb-8 flex flex-wrap justify-center gap-2" data-testid="mode-nav">
        {MODES.map((mode) => (
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
        <ActiveComponent />
      </main>
    </div>
  )
}

export default App
