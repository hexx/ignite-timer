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
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setState('completed')
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
