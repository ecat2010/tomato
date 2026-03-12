import type { PropsWithChildren } from 'react';
import type { TimerMode } from '../hooks/usePomodoroTimer';

type PomodoroCardProps = PropsWithChildren<{
  accentMode: TimerMode;
  pulseKey: number;
}>;

const accents: Record<TimerMode, string> = {
  focus: 'from-ember-500/20 via-transparent to-shell-300/10',
  shortBreak: 'from-shell-200/20 via-transparent to-white/10',
  longBreak: 'from-[#9f5e69]/30 via-transparent to-ember-400/15',
};

export function PomodoroCard({ accentMode, children, pulseKey }: PomodoroCardProps) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-float backdrop-blur-2xl sm:p-8 lg:p-10"
      data-pulse-key={pulseKey}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accents[accentMode]} opacity-90`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_24%,transparent_72%,rgba(255,255,255,0.02))]" />
      <div className="relative">{children}</div>
    </section>
  );
}
