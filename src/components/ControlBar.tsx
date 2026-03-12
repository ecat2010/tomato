type ControlBarProps = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
};

const buttonBase =
  'inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

export function ControlBar({ isRunning, onStart, onPause, onReset, onNext }: ControlBarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <button
        className={`${buttonBase} border-ember-400/50 bg-ember-500/85 text-white shadow-glow hover:-translate-y-0.5 hover:bg-ember-400 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50`}
        disabled={isRunning}
        onClick={onStart}
        type="button"
      >
        开始
      </button>
      <button
        className={`${buttonBase} border-white/10 bg-white/6 text-shell-50 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50`}
        disabled={!isRunning}
        onClick={onPause}
        type="button"
      >
        暂停
      </button>
      <button
        className={`${buttonBase} border-white/10 bg-white/6 text-shell-50 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0`}
        onClick={onReset}
        type="button"
      >
        重置
      </button>
      <button
        className={`${buttonBase} border-white/10 bg-white/6 text-shell-50 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0`}
        onClick={onNext}
        type="button"
      >
        下一阶段
      </button>
    </div>
  );
}
