import { useEffect, useMemo, useRef, useState } from 'react';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export type PomodoroDurations = Record<TimerMode, number>;

type Transition = {
  id: number;
  message: string;
  nextMode: TimerMode;
};

type UsePomodoroTimerOptions = {
  durations: PomodoroDurations;
  initialTodayCompleted?: number;
  initialCompletedPomodoros?: number;
  nowProvider?: () => number;
};

export const DEFAULT_DURATIONS: PomodoroDurations = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};

const modeNames: Record<TimerMode, string> = {
  focus: '专注',
  shortBreak: '短休息',
  longBreak: '长休息',
};

const getModeSeconds = (durations: PomodoroDurations, mode: TimerMode) => durations[mode] * 60;

const getNextMode = (mode: TimerMode, completedPomodoros: number): TimerMode => {
  if (mode === 'focus') {
    return completedPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak';
  }

  return 'focus';
};

export const formatClock = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const formatDurationLabel = (mode: keyof PomodoroDurations) => {
  return {
    focus: '专注时长',
    shortBreak: '短休息时长',
    longBreak: '长休息时长',
  }[mode];
};

export function usePomodoroTimer({
  durations,
  initialTodayCompleted = 0,
  initialCompletedPomodoros = 0,
  nowProvider = () => Date.now(),
}: UsePomodoroTimerOptions) {
  const [mode, setModeState] = useState<TimerMode>('focus');
  const [remainingSeconds, setRemainingSeconds] = useState(getModeSeconds(durations, 'focus'));
  const [isRunning, setIsRunning] = useState(false);
  const [todayCompleted, setTodayCompleted] = useState(initialTodayCompleted);
  const [completedPomodoros, setCompletedPomodoros] = useState(initialCompletedPomodoros);
  const [transition, setTransition] = useState<Transition | null>(null);
  const transitionIdRef = useRef(0);
  const deadlineRef = useRef<number | null>(null);
  const modeRef = useRef<TimerMode>('focus');
  const durationsRef = useRef(durations);
  const todayCompletedRef = useRef(initialTodayCompleted);
  const completedPomodorosRef = useRef(initialCompletedPomodoros);

  const totalSeconds = getModeSeconds(durations, mode);

  useEffect(() => {
    modeRef.current = mode;
    durationsRef.current = durations;
    todayCompletedRef.current = todayCompleted;
    completedPomodorosRef.current = completedPomodoros;
  }, [completedPomodoros, durations, mode, todayCompleted]);

  useEffect(() => {
    setTodayCompleted(initialTodayCompleted);
  }, [initialTodayCompleted]);

  useEffect(() => {
    setCompletedPomodoros(initialCompletedPomodoros);
  }, [initialCompletedPomodoros]);

  const applyTransition = (currentMode: TimerMode, countAsCompleted: boolean, messagePrefix?: string) => {
    const currentCompleted = completedPomodorosRef.current;
    const currentToday = todayCompletedRef.current;
    const nextCompletedPomodoros = currentMode === 'focus' && countAsCompleted ? currentCompleted + 1 : currentCompleted;
    const nextTodayCompleted = currentMode === 'focus' && countAsCompleted ? currentToday + 1 : currentToday;
    const nextMode = getNextMode(currentMode, nextCompletedPomodoros);
    const nextSeconds = getModeSeconds(durationsRef.current, nextMode);

    completedPomodorosRef.current = nextCompletedPomodoros;
    todayCompletedRef.current = nextTodayCompleted;
    modeRef.current = nextMode;

    setCompletedPomodoros(nextCompletedPomodoros);
    setTodayCompleted(nextTodayCompleted);
    setModeState(nextMode);
    setRemainingSeconds(nextSeconds);
    transitionIdRef.current += 1;
    setTransition({
      id: transitionIdRef.current,
      nextMode,
      message: messagePrefix ?? (currentMode === 'focus'
        ? `完成一轮专注，切换到${modeNames[nextMode]}。`
        : `休息结束，回到${modeNames[nextMode]}。`),
    });

    return nextSeconds;
  };

  useEffect(() => {
    if (!isRunning) {
      deadlineRef.current = null;
      return;
    }

    if (!deadlineRef.current) {
      deadlineRef.current = nowProvider() + remainingSeconds * 1000;
    }

    const intervalId = window.setInterval(() => {
      const deadline = deadlineRef.current;
      if (!deadline) {
        return;
      }

      const nextRemaining = Math.max(0, Math.ceil((deadline - nowProvider()) / 1000));
      setRemainingSeconds(nextRemaining);

      if (nextRemaining <= 0) {
        const nextSeconds = applyTransition(modeRef.current, true);
        deadlineRef.current = nowProvider() + nextSeconds * 1000;
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning, nowProvider, remainingSeconds]);

  const start = () => {
    deadlineRef.current = nowProvider() + remainingSeconds * 1000;
    setTransition(null);
    setIsRunning(true);
  };
  const pause = () => {
    deadlineRef.current = null;
    setIsRunning(false);
  };

  const reset = () => {
    deadlineRef.current = null;
    setIsRunning(false);
    setRemainingSeconds(getModeSeconds(durations, mode));
    setTransition(null);
  };

  const setMode = (nextMode: TimerMode) => {
    deadlineRef.current = null;
    setIsRunning(false);
    modeRef.current = nextMode;
    setModeState(nextMode);
    setRemainingSeconds(getModeSeconds(durations, nextMode));
    setTransition(null);
  };

  const skip = () => {
    deadlineRef.current = null;
    setIsRunning(false);
    applyTransition(modeRef.current, false, `已跳到${modeNames[getNextMode(modeRef.current, completedPomodorosRef.current)]}。`);
  };

  const updateDurations = (nextDurations: PomodoroDurations) => {
    durationsRef.current = nextDurations;
    deadlineRef.current = null;
    setIsRunning(false);
    setRemainingSeconds(getModeSeconds(nextDurations, mode));
  };

  const currentRound = useMemo(() => (completedPomodoros % 4) + 1, [completedPomodoros]);

  return {
    mode,
    remainingSeconds,
    totalSeconds,
    isRunning,
    todayCompleted,
    completedPomodoros,
    currentRound,
    transition,
    start,
    pause,
    reset,
    skip,
    setMode,
    updateDurations,
  };
}
