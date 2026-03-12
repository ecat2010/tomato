import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the pomodoro interface', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /专注更深，节奏更稳。/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '开始' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '短休息' })).toBeInTheDocument();
    expect(screen.getByText(/保持专注，你正在靠近目标/i)).toBeInTheDocument();
  });
});
