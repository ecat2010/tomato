import { act, renderHook } from '@testing-library/react';
import { DEFAULT_DURATIONS, usePomodoroTimer } from './usePomodoroTimer';

describe('usePomodoroTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with default focus duration', () => {
    const { result } = renderHook(() => usePomodoroTimer({ durations: DEFAULT_DURATIONS }));

    expect(result.current.mode).toBe('focus');
    expect(result.current.remainingSeconds).toBe(1500);
  });

  it('counts down when running and pauses cleanly', () => {
    const { result } = renderHook(() => usePomodoroTimer({ durations: DEFAULT_DURATIONS }));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.remainingSeconds).toBeLessThan(1500);

    const pausedAt = result.current.remainingSeconds;

    act(() => {
      result.current.pause();
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.remainingSeconds).toBe(pausedAt);
  });

  it('resets when switching modes', () => {
    const { result } = renderHook(() => usePomodoroTimer({ durations: DEFAULT_DURATIONS }));

    act(() => {
      result.current.setMode('shortBreak');
    });

    expect(result.current.mode).toBe('shortBreak');
    expect(result.current.remainingSeconds).toBe(300);
  });
});
