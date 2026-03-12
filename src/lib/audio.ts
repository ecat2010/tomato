let audioContext: AudioContext | null = null;

export function primeAudio() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume();
  }
}

export function playSoftChime() {
  if (typeof window === 'undefined') {
    return;
  }

  primeAudio();

  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(660, now);
  oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.25);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.035, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.45);
}
