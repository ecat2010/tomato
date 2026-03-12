import { useEffect } from 'react';
import { formatClock } from './usePomodoroTimer';

type UseDocumentTitleOptions = {
  remainingSeconds: number;
  modeLabel: string;
  isRunning: boolean;
};

export function useDocumentTitle({ remainingSeconds, modeLabel, isRunning }: UseDocumentTitleOptions) {
  useEffect(() => {
    document.title = isRunning
      ? `${formatClock(remainingSeconds)} - ${modeLabel}`
      : `已暂停 - ${modeLabel}`;
  }, [isRunning, modeLabel, remainingSeconds]);
}
