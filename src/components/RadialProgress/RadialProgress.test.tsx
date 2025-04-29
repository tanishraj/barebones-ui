import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { RadialProgress } from './RadialProgress';

describe('RadialProgress', () => {
  it('renders the value and percentage', () => {
    render(<RadialProgress value={70} />);
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('applies the correct CSS variables', () => {
    const { container } = render(
      <RadialProgress value={70} size='12rem' thickness='2px' />,
    );
    const element = container.querySelector('.radial-progress');
    expect(element).toHaveStyle({
      '--value': '70',
      '--size': '12rem',
      '--thickness': '2px',
    });
  });

  it('applies color and background classes', () => {
    const { container } = render(
      <RadialProgress
        value={70}
        color='primary'
        bgColor='secondary'
        borderColor='accent'
        borderWidth='4'
      />,
    );
    const element = container.querySelector('.radial-progress');
    expect(element).toHaveClass('text-primary');
    expect(element).toHaveClass('bg-secondary');
    expect(element).toHaveClass('border-accent');
    expect(element).toHaveClass('border-4');
  });

  it('has the correct ARIA attributes', () => {
    render(<RadialProgress value={70} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '70');
  });

  it('merges additional className', () => {
    const { container } = render(
      <RadialProgress value={70} className='custom-class' />,
    );
    const element = container.querySelector('.radial-progress');
    expect(element).toHaveClass('custom-class');
  });
});
