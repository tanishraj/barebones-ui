import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Toggle from './Toggle';

describe('Toggle', () => {
  it('renders correctly', () => {
    render(<Toggle />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('toggle', 'toggle-md');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Toggle size='xs' />);
    expect(screen.getByRole('checkbox')).toHaveClass('toggle-xs');

    rerender(<Toggle size='lg' />);
    expect(screen.getByRole('checkbox')).toHaveClass('toggle-lg');
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Toggle variant='primary' />);
    expect(screen.getByRole('checkbox')).toHaveClass('toggle-primary');

    rerender(<Toggle variant='success' />);
    expect(screen.getByRole('checkbox')).toHaveClass('toggle-success');
  });

  it('handles disabled state', () => {
    render(<Toggle disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('renders with icons when children are provided', () => {
    render(
      <Toggle>
        <span>✓</span>
        <span>✕</span>
      </Toggle>,
    );
    const label = screen.getByRole('checkbox').closest('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('toggle');
    expect(screen.getByText('✓')).toBeInTheDocument();
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Toggle className='custom-class' />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });
});
