import { useTimer } from '../hooks/useTimer'

export function TwoMinuteRule() {
  const { timeLeft, state, progress, start, pause, resume, reset } = useTimer({
    duration: 120,
    onComplete: () => {},
  })

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-card two-minute" data-testid="two-minute-timer">
      <h2 className="timer-title">🏃 2分間ルール</h2>
      <p className="timer-description">
        The 2-Minute Rule: とりあえず手を動かそう（ゲートウェイ・ハビット）
      </p>
      <div className="time-display" data-testid="time-display">
        <span className="time-number">{formatTime(timeLeft)}</span>
      </div>
      <div className="progress-container" data-testid="progress-container">
        <div
          className="progress-bar"
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
        {state === 'idle' && (
          <button className="btn btn-primary" onClick={start} data-testid="start-btn">
            スタート
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
        {state === 'completed' && (
          <div className="completed-message" data-testid="completed-message">
            <p>✅ 2分間お疲れ様でした！行動を開始した事実を作れました！</p>
            <button className="btn btn-secondary" onClick={reset} data-testid="reset-btn">
              もう一度
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
