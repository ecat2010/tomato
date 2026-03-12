# Tomato

A polished Pomodoro timer web app built with React, TypeScript, Tailwind CSS, and Vite.

## Overview

Tomato is a single-page Pomodoro experience designed to feel calm, refined, and genuinely pleasant to use every day. Instead of looking like a practice demo, it leans into a premium glassmorphism-inspired interface with soft gradients, a circular progress ring, subtle transitions, and a focused one-card layout.

## Features

- Three timer modes: Focus, Short Break, and Long Break
- Default durations: 25 / 5 / 15 minutes
- Start, pause, reset, and skip-to-next-stage controls
- Automatic stage switching when a timer ends
- Circular progress ring around the main countdown
- Live document title updates like `24:31 - 专注中`
- Soft completion chime and gentle animated feedback
- Today completion counter with local persistence
- Custom duration settings stored in `localStorage`
- Refined dark and light themes
- Responsive layout for desktop and mobile

## Visual Direction

- Modern, minimal, immersive UI
- Warm tomato-red and coral accents
- Frosted glass card with soft shadow and blur
- Calm background glow without distracting from the timer
- Clean spacing and restrained micro-interactions

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Vite
- Vitest + Testing Library
- Web Audio API
- `localStorage`

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm test -- --run
```

## Project Structure

```text
src/
  components/
    ControlBar.tsx
    ModeTabs.tsx
    PomodoroCard.tsx
    SettingsPanel.tsx
    StatsPanel.tsx
    StatusToast.tsx
    TimerRing.tsx
  hooks/
    useDocumentTitle.ts
    useLocalStorage.ts
    usePomodoroTimer.ts
  lib/
    audio.ts
  test/
    setup.ts
  App.tsx
  index.css
  main.tsx
```

## Behavior Notes

- The timer uses timestamp-based calculations to reduce drift.
- Finishing a focus session increments the daily completion count.
- Every fourth completed focus session leads into a long break.
- Changing a duration immediately resets the current mode to the new full length.
- If the stored date changes, the app resets the "today completed" counter automatically.

## Quality Checks

This project includes component and hook tests covering:

- timer initialization and countdown behavior
- pause handling
- mode switching
- local storage persistence
- key UI rendering

## Roadmap Ideas

- Ambient sound options
- Session history view
- Keyboard shortcuts
- PWA install support
- Custom long-break interval rules
