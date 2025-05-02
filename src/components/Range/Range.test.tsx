import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Range from './Range';

describe('Range', () => {
  it('renders with default props', () => {
    render(<Range value={40} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveClass('range');
    expect(input).toHaveClass('range-md');
    expect(input).toHaveAttribute('value', '40');
  });

  it('applies color variant', () => {
    render(<Range variant='primary' value={40} />);
    expect(screen.getByRole('slider')).toHaveClass('range-primary');
  });

  it('applies size variant', () => {
    render(<Range size='lg' value={40} />);
    expect(screen.getByRole('slider')).toHaveClass('range-lg');
  });

  it('shows labels when showLabels is true', () => {
    render(<Range showLabels min={0} max={100} step={25} value={25} />);
    expect(screen.getAllByText('|')).toHaveLength(5);
    expect(screen.getAllByText(/1|2|3|4|5/)).toHaveLength(5);
  });

  it('matches snapshot', () => {
    const { container } = render(<Range value={40} />);
    expect(container).toMatchSnapshot();
  });
});
