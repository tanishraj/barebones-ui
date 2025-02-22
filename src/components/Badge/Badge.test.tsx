import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge component', () => {
  test('renders children correctly', () => {
    render(<Badge>Test Child</Badge>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  test('applies base "badge" class', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge).toHaveClass('badge');
  });

  describe('variant prop', () => {
    const variants = [
      'neutral',
      'primary',
      'secondary',
      'accent',
      'ghost',
      'info',
      'success',
      'warning',
      'error',
    ] as const;

    test.each(variants)('applies correct class for variant %s', variant => {
      render(<Badge variant={variant}>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass(`badge-${variant}`);
    });
  });

  describe('size prop', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    test.each(sizes)('applies correct class for size %s', size => {
      render(<Badge size={size}>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass(`badge-${size}`);
    });

    test('applies default size md when size is not provided', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('badge-md');
    });
  });

  describe('outline prop', () => {
    test('applies outline class when outline is true', () => {
      render(<Badge outline>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).toHaveClass('badge-outline');
    });

    test('does not apply outline class when outline is false', () => {
      render(<Badge outline={false}>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).not.toHaveClass('badge-outline');
    });

    test('does not apply outline class when outline is not provided', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge).not.toHaveClass('badge-outline');
    });
  });

  test('combines multiple classes correctly', () => {
    render(
      <Badge variant='success' size='lg' outline>
        Combination Test
      </Badge>,
    );
    const badge = screen.getByText('Combination Test');

    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-success');
    expect(badge).toHaveClass('badge-lg');
    expect(badge).toHaveClass('badge-outline');
  });
});
