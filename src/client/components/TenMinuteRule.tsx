import { useState } from 'react'
import { useTimer } from '../hooks/useTimer'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Progress } from './ui/progress'

export function TenMinuteRule() {
  const [showChoice, setShowChoice] = useState(false)

  const { timeLeft, state, progress, start, pause, resume, reset } = useTimer({
    duration: 600,
    onComplete: () => {
      setShowChoice(true)
    },
  })

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleContinue = () => {
    setShowChoice(false)
    start()
  }

  const handleStop = () => {
    setShowChoice(false)
    reset()
  }

  return (
    <Card data-testid="ten-minute-timer">
      <CardHeader>
        <CardTitle>🔥 10分間ルール</CardTitle>
        <CardDescription>
          10分だけ全力でやろう。その後はやめてもOK（ツァイガルニク効果）
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
          {state === 'idle' && !showChoice && (
            <Button onClick={start} data-testid="start-btn">
              10分チャレンジ開始
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
          {state === 'completed' && showChoice && (
            <div className="flex flex-col items-center gap-4" data-testid="choice-container">
              <p className="text-center text-lg font-medium text-primary">
                🎉 10分間お疲れ様！続けますか？（オープン・ループを維持しよう）
              </p>
              <div className="flex gap-2">
                <Button onClick={handleContinue} data-testid="continue-btn">
                  🔥 続ける（もう10分）
                </Button>
                <Button variant="outline" onClick={handleStop} data-testid="stop-btn">
                  ✅ 今日はここまで
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
