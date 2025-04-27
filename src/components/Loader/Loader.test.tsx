import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('should render with default classes', () => {
    render(<Loader />);
    const loader = screen.getByRole('loader');

    // Base class
    expect(loader).toHaveClass('loading');

    // Default type
    expect(loader).toHaveClass('loading-spinner');

    // Default size
    expect(loader).toHaveClass('loading-md');
  });

  it('should apply type classes', () => {
    const { rerender } = render(<Loader type='dots' />);
    expect(screen.getByRole('loader')).toHaveClass('loading-dots');

    rerender(<Loader type='infinity' />);
    expect(screen.getByRole('loader')).toHaveClass('loading-infinity');
  });

  it('should apply size classes', () => {
    const { rerender } = render(<Loader size='xs' />);
    expect(screen.getByRole('loader')).toHaveClass('loading-xs');

    rerender(<Loader size='lg' />);
    expect(screen.getByRole('loader')).toHaveClass('loading-lg');
  });

  it('should apply variant classes', () => {
    const { rerender } = render(<Loader variant='primary' />);
    expect(screen.getByRole('loader')).toHaveClass('text-primary');

    rerender(<Loader variant='error' />);
    expect(screen.getByRole('loader')).toHaveClass('text-error');
  });

  it('should combine custom className', () => {
    render(<Loader className='custom-class' />);
    const loader = screen.getByRole('loader');

    expect(loader).toHaveClass('custom-class');
    // Should still have default classes
    expect(loader).toHaveClass('loading-spinner');
    expect(loader).toHaveClass('loading-md');
  });

  it('should pass through additional props', () => {
    render(<Loader data-testid='custom-loader' aria-label='Loading' />);

    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
