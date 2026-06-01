import { useTimer } from '../hooks/useTimer'

export function FiveSecondRule() {
  const { timeLeft, state, start, reset } = useTimer({
    duration: 5,
    onComplete: () => {},
  })

  const getUrgencyClass = () => {
    if (state === 'completed') return 'urgency-complete'
    if (timeLeft <= 2) return 'urgency-high'
    if (timeLeft <= 4) return 'urgency-medium'
    return 'urgency-low'
  }

  return (
    <div className="timer-card five-second" data-testid="five-second-timer">
      <h2 className="timer-title">⚡ 5秒ルール</h2>
      <p className="timer-description">
        The 5-Second Rule: オートパイロットを遮断し、今すぐ行動を開始させる
      </p>
      <div className={`countdown-display ${getUrgencyClass()}`} data-testid="countdown-display">
        {state === 'completed' ? (
          <span className="go-message" data-testid="go-message">🚀 GO!</span>
        ) : (
          <span className="countdown-number" data-testid="countdown-number">{timeLeft}</span>
        )}
      </div>
      <div className="timer-controls">
        {state === 'idle' && (
          <button className="btn btn-primary" onClick={start} data-testid="start-btn">
            スタート
          </button>
        )}
        {state === 'running' && (
          <span className="running-hint">カウントダウン中...</span>
        )}
        {state === 'completed' && (
          <button className="btn btn-secondary" onClick={reset} data-testid="reset-btn">
            もう一度
          </button>
        )}
      </div>
    </div>
  )
}
