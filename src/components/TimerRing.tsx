import { formatClock } from '../hooks/usePomodoroTimer';

type TimerRingProps = {
  remainingSeconds: number;
  progress: number;
  currentModeLabel: string;
};

const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerRing({ remainingSeconds, progress, currentModeLabel }: TimerRingProps) {
  const safeProgress = Math.max(0, Math.min(progress, 1));
  const dashOffset = CIRCUMFERENCE * (1 - safeProgress);

  return (
    <section className="relative flex items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_72%)] px-4 py-8 sm:px-8">
      <div className="absolute h-72 w-72 rounded-full border border-white/5 bg-white/[0.03] blur-2xl" />

      <svg
        aria-hidden="true"
        className="-rotate-90 drop-shadow-[0_16px_30px_rgba(228,96,76,0.28)]"
        height="300"
        viewBox="0 0 300 300"
        width="300"
      >
        <circle
          cx="150"
          cy="150"
          fill="none"
          r={RADIUS}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="12"
        />
        <circle
          cx="150"
          cy="150"
          fill="none"
          r={RADIUS}
          stroke="url(#timer-gradient)"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          strokeWidth="12"
        />
        <defs>
          <linearGradient id="timer-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb8a5" />
            <stop offset="50%" stopColor="#e4604c" />
            <stop offset="100%" stopColor="#9f5e69" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-shell-100/60">{currentModeLabel}</p>
        <p className="font-mono text-[3.75rem] font-semibold leading-none text-white sm:text-[4.8rem]" role="timer">
          {formatClock(remainingSeconds)}
        </p>
      </div>
    </section>
  );
}
