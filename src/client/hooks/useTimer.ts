import { useState, useEffect, useCallback, useRef } from 'react'

export type TimerState = 'idle' | 'running' | 'paused' | 'completed'

export interface UseTimerOptions {
  duration: number
  onComplete?: () => void
}

export interface UseTimerReturn {
  timeLeft: number
  state: TimerState
  progress: number
  start: () => void
  pause: () => void
  resume: () => void
  reset: () => void
}

const originalTitle = typeof document !== 'undefined' ? document.title : 'Ignite Timer'

function formatTimeForTitle(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function playCompletionSound(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(1100, audioContext.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (e) {
    console.warn('Failed to play completion sound:', e)
  }
}

export function useTimer({ duration, onComplete }: UseTimerOptions): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [state, setState] = useState<TimerState>('idle')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    setTimeLeft(duration)
    setState('idle')
  }, [duration])

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (state === 'running') {
      document.title = `${formatTimeForTitle(timeLeft)} | Ignite Timer`
    } else if (state === 'completed') {
      document.title = `完了! | Ignite Timer`
    } else {
      document.title = originalTitle
    }
  }, [state, timeLeft])

  useEffect(() => {
    if (state === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setState('completed')
            playCompletionSound()
            onCompleteRef.current?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return clearTimer
  }, [state, clearTimer])

  const start = useCallback(() => {
    setTimeLeft(duration)
    setState('running')
  }, [duration])

  const pause = useCallback(() => {
    if (state === 'running') {
      clearTimer()
      setState('paused')
    }
  }, [state, clearTimer])

  const resume = useCallback(() => {
    if (state === 'paused') {
      setState('running')
    }
  }, [state])

  const reset = useCallback(() => {
    clearTimer()
    setTimeLeft(duration)
    setState('idle')
  }, [duration, clearTimer])

  const progress = ((duration - timeLeft) / duration) * 100

  return { timeLeft, state, progress, start, pause, resume, reset }
}
