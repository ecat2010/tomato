type StatsPanelProps = {
  currentRound: number;
  currentModeLabel: string;
  todayCompleted: number;
  nextLongBreakIn: number;
};

const statCard =
  'rounded-[1.35rem] border border-white/10 bg-black/15 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]';

export function StatsPanel({
  currentRound,
  currentModeLabel,
  todayCompleted,
  nextLongBreakIn,
}: StatsPanelProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      <article className={statCard}>
        <p className="text-xs uppercase tracking-[0.3em] text-shell-100/55">当前模式</p>
        <p className="mt-3 text-xl font-medium text-white">{currentModeLabel}</p>
      </article>
      <article className={statCard}>
        <p className="text-xs uppercase tracking-[0.3em] text-shell-100/55">番茄轮次</p>
        <p className="mt-3 text-xl font-medium text-white">第 {currentRound} 轮</p>
      </article>
      <article className={statCard}>
        <p className="text-xs uppercase tracking-[0.3em] text-shell-100/55">今日完成</p>
        <p className="mt-3 text-xl font-medium text-white">{todayCompleted} 次</p>
        <p className="mt-2 text-sm text-shell-100/60">距离长休息还有 {nextLongBreakIn} 次专注</p>
      </article>
    </section>
  );
}
