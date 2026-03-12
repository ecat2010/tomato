import { render, screen } from '@testing-library/react';
import { TimerRing } from './TimerRing';

describe('TimerRing', () => {
  it('renders remaining time and mode label', () => {
    render(<TimerRing currentModeLabel="专注中" progress={0.4} remainingSeconds={1499} />);

    expect(screen.getByText('专注中')).toBeInTheDocument();
    expect(screen.getByRole('timer')).toHaveTextContent('24:59');
  });
});
