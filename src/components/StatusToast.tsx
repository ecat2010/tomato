import { useEffect } from 'react';

type StatusToastProps = {
  message: string;
  onDone: () => void;
};

export function StatusToast({ message, onDone }: StatusToastProps) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(onDone, 2800);
    return () => window.clearTimeout(timeoutId);
  }, [message, onDone]);

  if (!message) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-5 py-3 text-sm text-white shadow-glow backdrop-blur-xl"
      role="status"
    >
      {message}
    </div>
  );
}
