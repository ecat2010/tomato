import type { PomodoroDurations } from '../hooks/usePomodoroTimer';

type SettingsPanelProps = {
  durations: PomodoroDurations;
  formatDurationLabel: (mode: keyof PomodoroDurations) => string;
  onChange: (durations: PomodoroDurations) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
};

export function SettingsPanel({
  durations,
  formatDurationLabel,
  onChange,
  theme,
  onThemeToggle,
}: SettingsPanelProps) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-black/15 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">时长设置</p>
          <p className="mt-1 text-xs text-shell-100/65">修改后会即时更新到当前模式。</p>
        </div>
        <button
          className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/6 px-4 text-sm text-shell-50 transition hover:bg-white/10"
          onClick={onThemeToggle}
          type="button"
        >
          {theme === 'dark' ? '切换浅色' : '切换深色'}
        </button>
      </div>

      <div className="space-y-3">
        {(['focus', 'shortBreak', 'longBreak'] as const).map((mode) => (
          <label key={mode} className="grid gap-2 text-sm text-shell-100/80">
            <span>{formatDurationLabel(mode)}</span>
            <div className="flex items-center gap-3">
              <input
                className="min-h-11 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-base text-white outline-none transition focus:border-ember-300/70 focus:ring-2 focus:ring-ember-300/30"
                max={90}
                min={1}
                onChange={(event) => {
                  const value = Number(event.currentTarget.value);

                  onChange({
                    ...durations,
                    [mode]: Number.isNaN(value) ? durations[mode] : value,
                  });
                }}
                type="number"
                value={durations[mode]}
              />
              <span className="text-xs uppercase tracking-[0.24em] text-shell-100/50">min</span>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
