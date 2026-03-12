import type { TimerMode } from '../hooks/usePomodoroTimer';

type ModeTabsProps = {
  currentMode: TimerMode;
  modeLabels: Record<TimerMode, string>;
  onModeChange: (mode: TimerMode) => void;
};

const modes: TimerMode[] = ['focus', 'shortBreak', 'longBreak'];

export function ModeTabs({ currentMode, modeLabels, onModeChange }: ModeTabsProps) {
  return (
    <div className="mx-auto inline-flex w-full rounded-full border border-white/10 bg-black/15 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:w-auto">
      {modes.map((mode) => {
        const active = mode === currentMode;

        return (
          <button
            key={mode}
            className={`min-h-11 rounded-full px-4 text-sm font-medium transition duration-200 ease-out sm:px-5 ${
              active
                ? 'bg-white/12 text-white shadow-[0_12px_30px_rgba(15,15,20,0.24)]'
                : 'text-shell-100/72 hover:bg-white/5 hover:text-white'
            }`}
            onClick={() => onModeChange(mode)}
            type="button"
          >
            {modeLabels[mode]}
          </button>
        );
      })}
    </div>
  );
}
