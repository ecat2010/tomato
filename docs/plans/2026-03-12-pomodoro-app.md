# Pomodoro App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建立一個可直接運行、具高質感 UI、支援本地保存與自動階段流轉嘅 React + Tailwind 番茄時鐘單頁應用。

**Architecture:** 以 `Vite + React + TypeScript` 建立單頁前端，將計時核心邏輯集中喺自訂 hook，畫面拆成模式切換、環形倒數、控制列、統計與設定面板幾個元件。時間運算會以 timestamp 差值為準，減少背景分頁或重繪導致嘅計時漂移，並以 localStorage 保存設定、深色模式同今日完成次數。

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, Web Audio API, localStorage, SVG progress ring, Vitest, React Testing Library

---

### Task 1: 初始化專案骨架

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`

**Step 1: Write the failing test**

建立最基本 render 測試，預期首頁會出現番茄時鐘標題。

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL，因為元件與測試環境尚未完成。

**Step 3: Write minimal implementation**

建立 Vite + React + Tailwind 基礎檔案，同時令 `App` 至少 render 一個基本標題。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.tsx`
Expected: PASS

**Step 5: Commit**

如果日後放入 git repo：
`git add .`
`git commit -m "feat: scaffold pomodoro app"`

### Task 2: 建立計時核心 hook

**Files:**
- Create: `src/hooks/usePomodoroTimer.ts`
- Create: `src/hooks/useDocumentTitle.ts`
- Test: `src/hooks/usePomodoroTimer.test.ts`

**Step 1: Write the failing test**

先寫測試覆蓋以下行為：
- 初始為 25 分鐘專注
- 開始後時間遞減
- 暫停後停止遞減
- 切換模式會重置到對應時長

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/hooks/usePomodoroTimer.test.ts`
Expected: FAIL，因為 hook 未存在或行為未實作。

**Step 3: Write minimal implementation**

建立 hook 狀態：
- `mode`
- `remainingSeconds`
- `isRunning`
- `completedPomodoros`
- `todayCompleted`
- `start`, `pause`, `reset`, `skip`, `setMode`, `updateDurations`

使用 `Date.now()` 差值更新剩餘秒數，避免 interval 漂移。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/hooks/usePomodoroTimer.test.ts`
Expected: PASS

**Step 5: Commit**

`git add src/hooks`
`git commit -m "feat: add pomodoro timer hook"`

### Task 3: 建立本地保存與跨日邏輯

**Files:**
- Create: `src/hooks/useLocalStorage.ts`
- Modify: `src/hooks/usePomodoroTimer.ts`
- Test: `src/hooks/useLocalStorage.test.ts`
- Test: `src/hooks/usePomodoroTimer.test.ts`

**Step 1: Write the failing test**

新增測試：
- 自訂時長會保存並重新載入
- 今日完成次數會保存
- 日期改變時今日完成次數會歸零

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/hooks/useLocalStorage.test.ts src/hooks/usePomodoroTimer.test.ts`
Expected: FAIL

**Step 3: Write minimal implementation**

加入 localStorage 工具與日期 key 檢查：
- `pomodoro-settings`
- `pomodoro-stats`
- `pomodoro-theme`

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/hooks/useLocalStorage.test.ts src/hooks/usePomodoroTimer.test.ts`
Expected: PASS

**Step 5: Commit**

`git add src/hooks`
`git commit -m "feat: persist pomodoro settings and stats"`

### Task 4: 建立主卡與環形倒數 UI

**Files:**
- Create: `src/components/PomodoroCard.tsx`
- Create: `src/components/TimerRing.tsx`
- Create: `src/components/ModeTabs.tsx`
- Create: `src/components/StatsPanel.tsx`
- Modify: `src/App.tsx`
- Test: `src/components/TimerRing.test.tsx`
- Test: `src/App.test.tsx`

**Step 1: Write the failing test**

覆蓋畫面是否 render：
- 模式切換按鈕
- 大號倒數
- 輪次與今日完成次數
- 鼓勵文案

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.tsx src/components/TimerRing.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

建立精緻單卡片介面、SVG progress ring、半透明卡片樣式與 responsive 排版。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.tsx src/components/TimerRing.test.tsx`
Expected: PASS

**Step 5: Commit**

`git add src/components src/App.tsx src/index.css`
`git commit -m "feat: build pomodoro card interface"`

### Task 5: 加入控制列、動畫同提示音

**Files:**
- Create: `src/components/ControlBar.tsx`
- Create: `src/components/StatusToast.tsx`
- Create: `src/lib/audio.ts`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `src/App.test.tsx`

**Step 1: Write the failing test**

新增測試：
- 開始／暫停／重置／下一階段按鈕可觸發對應行為
- 階段完成時會出現狀態提示

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

加入控制按鈕、過渡動畫、狀態 toast，同時用 Web Audio API 產生短促柔和提示音。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/App.test.tsx`
Expected: PASS

**Step 5: Commit**

`git add src/components src/lib src/App.tsx src/index.css`
`git commit -m "feat: add controls feedback and sound cues"`

### Task 6: 加入設定面板與深色模式

**Files:**
- Create: `src/components/SettingsPanel.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Test: `src/components/SettingsPanel.test.tsx`

**Step 1: Write the failing test**

測試：
- 可修改三種時長
- 輸入後會反映到狀態
- 深色模式切換會改變根節點狀態

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/SettingsPanel.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

建立設定面板與 theme toggle，將樣式 token 透過 class 或 CSS variables 切換。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run src/components/SettingsPanel.test.tsx`
Expected: PASS

**Step 5: Commit**

`git add src/components src/App.tsx src/index.css`
`git commit -m "feat: add settings panel and theme toggle"`

### Task 7: 補完文件標題與收尾驗證

**Files:**
- Modify: `src/hooks/useDocumentTitle.ts`
- Modify: `src/App.tsx`
- Create: `README.md`
- Test: `src/App.test.tsx`

**Step 1: Write the failing test**

新增測試：
- document title 會跟剩餘時間與模式改變
- 暫停狀態 title 正確

**Step 2: Run test to verify it fails**

Run: `npm test -- --run src/App.test.tsx`
Expected: FAIL

**Step 3: Write minimal implementation**

完善 title 更新、README 運行說明、細節 polish。

**Step 4: Run test to verify it passes**

Run: `npm test -- --run`
Expected: PASS，全數測試通過。

**Step 5: Commit**

`git add README.md src`
`git commit -m "feat: finalize polished pomodoro experience"`
