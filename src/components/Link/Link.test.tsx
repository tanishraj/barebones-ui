import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Link } from './Link';
import { LinkVariants } from './types';

describe('Link', () => {
  it('renders with default classes', () => {
    render(<Link href='/'>Default</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('link');
    expect(link).not.toHaveClass('link-primary');
    expect(link).not.toHaveClass('link-hover');
  });

  it('applies color variant classes', () => {
    const { rerender } = render(<Link href='/'>Test</Link>);

    const colors = [
      'primary',
      'secondary',
      'accent',
      'neutral',
      'success',
      'info',
      'warning',
      'error',
    ];

    colors.forEach(color => {
      rerender(
        <Link href='/' variant={color as LinkVariants}>
          Test
        </Link>,
      );
      expect(screen.getByRole('link')).toHaveClass(`link-${color}`);
    });
  });

  it('applies hoverUnderline class', () => {
    render(
      <Link href='/' hoverUnderline>
        Hover
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass('link-hover');
  });

  it('combines className prop', () => {
    render(
      <Link href='/' className='custom-class'>
        Test
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass('link custom-class');
  });

  it('passes href correctly', () => {
    render(<Link href='/test-path'>Test</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/test-path');
  });

  it('renders children correctly', () => {
    render(<Link href='/'>Child Content</Link>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
