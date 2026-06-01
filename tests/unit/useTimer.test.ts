import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTimer } from '../../src/client/hooks/useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('初期状態が正しい', () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }))
    expect(result.current.timeLeft).toBe(5)
    expect(result.current.state).toBe('idle')
    expect(result.current.progress).toBe(0)
  })

  it('start() でタイマーが開始される', () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }))
    act(() => {
      result.current.start()
    })
    expect(result.current.state).toBe('running')
  })

  it('1秒ごとにカウントダウンする', () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.timeLeft).toBe(4)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.timeLeft).toBe(3)
  })

  it('カウントダウン完了時に state が completed になる', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer({ duration: 5, onComplete }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current.state).toBe('completed')
    expect(result.current.timeLeft).toBe(0)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it('pause() でタイマーが一時停止される', () => {
    const { result } = renderHook(() => useTimer({ duration: 10 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    act(() => {
      result.current.pause()
    })
    expect(result.current.state).toBe('paused')
    const timeAtPause = result.current.timeLeft
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(result.current.timeLeft).toBe(timeAtPause)
  })

  it('resume() で一時停止から再開される', () => {
    const { result } = renderHook(() => useTimer({ duration: 10 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    act(() => {
      result.current.pause()
    })
    act(() => {
      result.current.resume()
    })
    expect(result.current.state).toBe('running')
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.timeLeft).toBe(6)
  })

  it('reset() でタイマーがリセットされる', () => {
    const { result } = renderHook(() => useTimer({ duration: 5 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    act(() => {
      result.current.reset()
    })
    expect(result.current.state).toBe('idle')
    expect(result.current.timeLeft).toBe(5)
    expect(result.current.progress).toBe(0)
  })

  it('progress が正しく計算される', () => {
    const { result } = renderHook(() => useTimer({ duration: 10 }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    expect(result.current.progress).toBe(50)
  })

  it('2分間ルール: 120秒カウントダウン', () => {
    const { result } = renderHook(() => useTimer({ duration: 120 }))
    expect(result.current.timeLeft).toBe(120)
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(60000)
    })
    expect(result.current.timeLeft).toBe(60)
    expect(result.current.progress).toBe(50)
  })

  it('10分間ルール: 600秒カウントダウン', () => {
    const onComplete = vi.fn()
    const { result } = renderHook(() => useTimer({ duration: 600, onComplete }))
    act(() => {
      result.current.start()
    })
    act(() => {
      vi.advanceTimersByTime(600000)
    })
    expect(result.current.state).toBe('completed')
    expect(onComplete).toHaveBeenCalled()
  })
})
