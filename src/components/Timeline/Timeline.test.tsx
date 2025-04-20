import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Timeline } from './Timeline';

const mockEvents = [
  { startLabel: '2023-Q1', endLabel: 'Launch MVP' },
  { startLabel: '2023-Q2', endLabel: 'User Testing' },
  { startLabel: '2023-Q3', endLabel: 'Public Release' },
];

describe('Timeline', () => {
  it('renders correct number of events', () => {
    render(<Timeline events={mockEvents} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockEvents.length);
    expect(screen.getByText('2023-Q1')).toBeInTheDocument();
    expect(screen.getByText('Public Release')).toBeInTheDocument();
  });

  it('shows connectors when enabled', () => {
    const { container } = render(
      <Timeline events={mockEvents} showConnectors />,
    );
    expect(container.querySelectorAll('hr')).toHaveLength(
      mockEvents.length * 2,
    );
  });

  it('hides connectors when showConnectors is false', () => {
    const { container } = render(
      <Timeline events={mockEvents} showConnectors={false} />,
    );
    expect(container.querySelectorAll('hr')).toHaveLength(
      mockEvents.length * 2 - 2,
    );
  });

  it('applies correct orientation class', () => {
    const { rerender } = render(
      <Timeline events={mockEvents} orientation='horizontal' />,
    );
    expect(screen.getByRole('list')).toHaveClass('timeline-horizontal');

    rerender(<Timeline events={mockEvents} orientation='vertical' />);
    expect(screen.getByRole('list')).toHaveClass('timeline-vertical');
  });

  it('renders custom marker when provided', () => {
    const customMarker = <div data-testid='custom-marker' />;
    render(<Timeline events={mockEvents} customMarker={customMarker} />);
    expect(screen.getAllByTestId('custom-marker')).toHaveLength(
      mockEvents.length,
    );
  });

  it('applies content alignment variants', () => {
    render(<Timeline events={mockEvents} contentAlign='compact' />);
    expect(screen.getByText('Launch MVP')).toHaveClass('timeline-compact');
  });
});
