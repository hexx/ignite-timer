import { useTimer } from '../hooks/useTimer'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Progress } from './ui/progress'
import { formatTime } from '../lib/utils'

export function TwoMinuteRule() {
  const { timeLeft, state, progress, start, pause, resume, reset } = useTimer({
    duration: 120,
  })

  return (
    <Card data-testid="two-minute-timer">
      <CardHeader>
        <CardTitle>🏃 2分間ルール</CardTitle>
        <CardDescription>
          The 2-Minute Rule: とりあえず手を動かそう（ゲートウェイ・ハビット）
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div
          className="text-6xl font-bold tabular-nums"
          data-testid="time-display"
        >
          {formatTime(timeLeft)}
        </div>
        <div className="w-full" data-testid="progress-container">
          <Progress
            value={progress}
            data-testid="progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {Math.round(progress)}% 完了
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {state === 'idle' && (
            <Button onClick={start} data-testid="start-btn">
              スタート
            </Button>
          )}
          {state === 'running' && (
            <Button variant="outline" onClick={pause} data-testid="pause-btn">
              一時停止
            </Button>
          )}
          {state === 'paused' && (
            <div className="flex gap-2">
              <Button onClick={resume} data-testid="resume-btn">
                再開
              </Button>
              <Button variant="destructive" onClick={reset} data-testid="reset-btn">
                リセット
              </Button>
            </div>
          )}
          {state === 'completed' && (
            <div className="flex flex-col items-center gap-2" data-testid="completed-message">
              <p className="text-green-500">
                ✅ 2分間お疲れ様でした！行動を開始した事実を作れました！
              </p>
              <Button variant="outline" onClick={reset} data-testid="reset-btn">
                もう一度
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
