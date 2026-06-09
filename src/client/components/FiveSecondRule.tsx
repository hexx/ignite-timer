import { useTimer } from '../hooks/useTimer'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { cn } from '../lib/utils'

export function FiveSecondRule() {
  const { timeLeft, state, start, reset } = useTimer({
    duration: 5,
    onComplete: () => {},
  })

  const getUrgencyClass = () => {
    if (state === 'completed') return 'text-primary'
    if (timeLeft <= 2) return 'text-destructive'
    if (timeLeft <= 4) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <Card data-testid="five-second-timer">
      <CardHeader>
        <CardTitle>⚡ 5秒ルール</CardTitle>
        <CardDescription>
          The 5-Second Rule: オートパイロットを遮断し、今すぐ行動を開始させる
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className={cn(
            'text-8xl font-bold tabular-nums',
            getUrgencyClass()
          )}
          data-testid="countdown-display"
        >
          {state === 'completed' ? (
            <span data-testid="go-message">🚀 GO!</span>
          ) : (
            <span data-testid="countdown-number">{timeLeft}</span>
          )}
        </div>
        <div className="flex flex-col items-center gap-2">
          {state === 'idle' && (
            <Button onClick={start} data-testid="start-btn">
              スタート
            </Button>
          )}
          {state === 'running' && (
            <span className="text-muted-foreground">カウントダウン中...</span>
          )}
          {state === 'completed' && (
            <Button variant="outline" onClick={reset} data-testid="reset-btn">
              もう一度
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
