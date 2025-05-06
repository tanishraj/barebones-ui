import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Rating } from './Rating';

describe('Rating', () => {
  it('renders correct number of stars', () => {
    render(<Rating value={3} max={5} />);
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });

  it('renders half stars when enabled', () => {
    render(<Rating value={3} max={5} half />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('applies size classes', () => {
    render(<Rating value={3} size='lg' />);
    expect(screen.getByRole('group')).toHaveClass('rating-lg');
  });

  it('applies color classes', () => {
    render(<Rating value={3} color='bg-green-500' />);
    expect(screen.getAllByRole('radio')[0]).toHaveClass('bg-green-500');
  });

  it('renders read-only stars as divs', () => {
    render(<Rating value={3} readOnly />);
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
    expect(screen.getAllByLabelText(/star/)[0].tagName).toBe('DIV');
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Rating value={0} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('3 star'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('allows clearing when clearable', () => {
    const handleChange = vi.fn();
    render(<Rating value={3} clearable onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Clear'));
    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
