import { useState } from 'react'
import { useTimer } from '../hooks/useTimer'

export function TenMinuteRule() {
  const [showChoice, setShowChoice] = useState(false)

  const { timeLeft, state, progress, start, pause, resume, reset } = useTimer({
    duration: 600,
    onComplete: () => {
      setShowChoice(true)
    },
  })

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
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
    <div className="timer-card ten-minute" data-testid="ten-minute-timer">
      <h2 className="timer-title">🔥 10分間ルール</h2>
      <p className="timer-description">
        10分だけ全力でやろう。その後はやめてもOK（ツァイガルニク効果）
      </p>
      <div className="time-display" data-testid="time-display">
        <span className="time-number">{formatTime(timeLeft)}</span>
      </div>
      <div className="progress-container" data-testid="progress-container">
        <div
          className="progress-bar ten-minute-bar"
          style={{ width: `${progress}%` }}
          data-testid="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <p className="progress-label">{Math.round(progress)}% 完了</p>
      <div className="timer-controls">
        {state === 'idle' && !showChoice && (
          <button className="btn btn-primary" onClick={start} data-testid="start-btn">
            10分チャレンジ開始
          </button>
        )}
        {state === 'running' && (
          <button className="btn btn-secondary" onClick={pause} data-testid="pause-btn">
            一時停止
          </button>
        )}
        {state === 'paused' && (
          <>
            <button className="btn btn-primary" onClick={resume} data-testid="resume-btn">
              再開
            </button>
            <button className="btn btn-danger" onClick={reset} data-testid="reset-btn">
              リセット
            </button>
          </>
        )}
        {state === 'completed' && showChoice && (
          <div className="choice-container" data-testid="choice-container">
            <p className="choice-question">
              🎉 10分間お疲れ様！続けますか？（オープン・ループを維持しよう）
            </p>
            <button
              className="btn btn-primary"
              onClick={handleContinue}
              data-testid="continue-btn"
            >
              🔥 続ける（もう10分）
            </button>
            <button
              className="btn btn-neutral"
              onClick={handleStop}
              data-testid="stop-btn"
            >
              ✅ 今日はここまで
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
