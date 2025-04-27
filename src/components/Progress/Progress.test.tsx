import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Progress } from './Progress';

describe('Progress', () => {
  it('renders progress element', () => {
    render(<Progress value={40} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies color variant class', () => {
    const { container } = render(<Progress value={40} variant='primary' />);
    expect(container.querySelector('.progress-primary')).toBeInTheDocument();
  });

  it('sets value and max attributes', () => {
    render(<Progress value={50} max={200} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('value', '50');
    expect(progress).toHaveAttribute('max', '200');
  });

  it('omits value and max when indeterminate', () => {
    render(<Progress indeterminate />);
    const progress = screen.getByRole('progressbar');
    expect(progress).not.toHaveAttribute('value');
    expect(progress).not.toHaveAttribute('max');
  });

  it('merges custom class names', () => {
    render(<Progress value={30} className='custom-class' />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass('custom-class');
  });

  it('defaults max to 100 when not indeterminate', () => {
    render(<Progress value={75} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('max', '100');
  });
});
