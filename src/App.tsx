import { useEffect, useMemo, useState } from 'react';
import { ControlBar } from './components/ControlBar';
import { ModeTabs } from './components/ModeTabs';
import { PomodoroCard } from './components/PomodoroCard';
import { SettingsPanel } from './components/SettingsPanel';
import { StatsPanel } from './components/StatsPanel';
import { StatusToast } from './components/StatusToast';
import { TimerRing } from './components/TimerRing';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import {
  DEFAULT_DURATIONS,
  formatDurationLabel,
  type PomodoroDurations,
  type TimerMode,
  usePomodoroTimer,
} from './hooks/usePomodoroTimer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { playSoftChime, primeAudio } from './lib/audio';

const todayKey = () => new Date().toISOString().slice(0, 10);

const modeLabels: Record<TimerMode, string> = {
  focus: '专注中',
  shortBreak: '短休息',
  longBreak: '长休息',
};

type StoredStats = {
  date: string;
  todayCompleted: number;
  completedPomodoros: number;
};

const defaultStats: StoredStats = {
  date: todayKey(),
  todayCompleted: 0,
  completedPomodoros: 0,
};

export default function App() {
  const [durations, setDurations] = useLocalStorage<PomodoroDurations>('pomodoro-settings', DEFAULT_DURATIONS);
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('pomodoro-theme', 'dark');
  const [storedStats, setStoredStats] = useLocalStorage<StoredStats>('pomodoro-stats', defaultStats);
  const [toastMessage, setToastMessage] = useState('');

  const normalizedStats = useMemo(() => {
    if (storedStats.date === todayKey()) {
      return storedStats;
    }

    return {
      ...storedStats,
      date: todayKey(),
      todayCompleted: 0,
    };
  }, [storedStats]);

  useEffect(() => {
    if (normalizedStats.date !== storedStats.date || normalizedStats.todayCompleted !== storedStats.todayCompleted) {
      setStoredStats(normalizedStats);
    }
  }, [normalizedStats, setStoredStats, storedStats]);

  const timer = usePomodoroTimer({
    durations,
    initialCompletedPomodoros: normalizedStats.completedPomodoros,
    initialTodayCompleted: normalizedStats.todayCompleted,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!timer.transition) {
      return;
    }

    setStoredStats({
      date: todayKey(),
      todayCompleted: timer.todayCompleted,
      completedPomodoros: timer.completedPomodoros,
    });

    setToastMessage(timer.transition.message);
    playSoftChime();
  }, [
    setStoredStats,
    timer.completedPomodoros,
    timer.todayCompleted,
    timer.transition,
  ]);

  const progress = timer.totalSeconds === 0 ? 0 : 1 - timer.remainingSeconds / timer.totalSeconds;
  const nextLongBreakIn = timer.completedPomodoros % 4 === 0 ? 4 : 4 - (timer.completedPomodoros % 4);

  useDocumentTitle({
    isRunning: timer.isRunning,
    modeLabel: modeLabels[timer.mode],
    remainingSeconds: timer.remainingSeconds,
  });

  const handleModeChange = (mode: TimerMode) => {
    primeAudio();
    timer.setMode(mode);
  };

  const handleStart = () => {
    primeAudio();
    timer.start();
  };

  const handleDurationChange = (nextDurations: PomodoroDurations) => {
    setDurations(nextDurations);
    timer.updateDurations(nextDurations);
  };

  return (
    <main
      className="relative min-h-dvh overflow-hidden px-4 py-6 sm:px-6 lg:px-8"
      style={{ background: 'var(--app-bg)', color: 'var(--app-text)' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-ember-500/20 blur-3xl motion-safe:animate-shimmer" />
        <div className="absolute right-[-4rem] top-24 h-72 w-72 rounded-full bg-shell-300/10 blur-3xl motion-safe:animate-float" />
        <div className="absolute bottom-[-5rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#6f3b45]/25 blur-3xl motion-safe:animate-shimmer" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-3rem)] max-w-5xl items-center justify-center">
        <PomodoroCard accentMode={timer.mode} pulseKey={timer.transition?.id ?? 0}>
          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-shell-200/80">Velvet Pomodoro</p>
              <h1 className="font-display text-4xl text-white sm:text-5xl">专注更深，节奏更稳。</h1>
              <p className="mx-auto max-w-xl text-sm leading-7 text-shell-100/72 sm:text-base">
                保持专注，你正在靠近目标
              </p>
            </div>

            <ModeTabs currentMode={timer.mode} modeLabels={modeLabels} onModeChange={handleModeChange} />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-6">
                <TimerRing
                  currentModeLabel={modeLabels[timer.mode]}
                  progress={progress}
                  remainingSeconds={timer.remainingSeconds}
                />
                <ControlBar
                  isRunning={timer.isRunning}
                  onNext={() => {
                    primeAudio();
                    timer.skip();
                  }}
                  onPause={timer.pause}
                  onReset={timer.reset}
                  onStart={handleStart}
                />
              </div>

              <div className="space-y-5">
                <StatsPanel
                  currentRound={timer.currentRound}
                  currentModeLabel={modeLabels[timer.mode]}
                  nextLongBreakIn={nextLongBreakIn}
                  todayCompleted={timer.todayCompleted}
                />

                <SettingsPanel
                  durations={durations}
                  formatDurationLabel={formatDurationLabel}
                  onChange={handleDurationChange}
                  onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </PomodoroCard>
      </div>

      <StatusToast key={toastMessage} message={toastMessage} onDone={() => setToastMessage('')} />
    </main>
  );
}
