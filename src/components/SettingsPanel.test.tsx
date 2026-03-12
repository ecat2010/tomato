import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingsPanel } from './SettingsPanel';
import { DEFAULT_DURATIONS, formatDurationLabel } from '../hooks/usePomodoroTimer';

describe('SettingsPanel', () => {
  it('updates duration fields and toggles theme', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onThemeToggle = vi.fn();

    render(
      <SettingsPanel
        durations={DEFAULT_DURATIONS}
        formatDurationLabel={formatDurationLabel}
        onChange={onChange}
        onThemeToggle={onThemeToggle}
        theme="dark"
      />,
    );

    const input = screen.getByDisplayValue(25);
    await user.clear(input);
    await user.type(input, '30');
    await user.click(screen.getByRole('button', { name: '切换浅色' }));

    expect(onChange).toHaveBeenCalled();
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });
});
