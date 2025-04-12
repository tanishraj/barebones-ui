import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import { Status } from './Status';

describe('Status Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Status />);
    expect(container.firstChild).toBeInTheDocument();
  });

  describe('Variants', () => {
    const variants = [
      'neutral',
      'primary',
      'secondary',
      'accent',
      'info',
      'success',
      'warning',
      'error',
    ] as const;

    variants.forEach(variant => {
      test(`applies ${variant} variant class`, () => {
        const { container } = render(<Status variant={variant} />);
        const element = container.querySelector('.status');
        expect(element).toHaveClass(`status-${variant}`);
      });
    });
  });

  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      test(`applies ${size} size class`, () => {
        const { container } = render(<Status size={size} />);
        const element = container.querySelector('.status');
        expect(element).toHaveClass(`status-${size}`);
      });
    });
  });

  describe('Animation', () => {
    test('applies bounce animation class', () => {
      const { container } = render(<Status animate='bounce' />);
      const element = container.querySelector('.status');
      expect(element).toHaveClass('animate-bounce');
    });

    test('renders ping animation structure correctly', () => {
      const { container } = render(
        <Status animate='ping' variant='neutral' size='md' />,
      );

      const parent = container.querySelector('.inline-grid');
      expect(parent).toBeInTheDocument();

      const children = parent?.children;
      expect(children).toHaveLength(2);

      const [animatedElement, staticElement] = children || [];
      expect(animatedElement).toHaveClass('animate-ping');
      expect(animatedElement).toHaveClass('status-neutral');
      expect(animatedElement).toHaveClass('status-md');

      expect(staticElement).not.toHaveClass('animate-ping');
      expect(staticElement).toHaveClass('status-neutral');
      expect(staticElement).toHaveClass('status-md');
    });
  });

  test('applies custom className when not using ping animation', () => {
    const { container } = render(<Status className='custom-class' />);
    const element = container.querySelector('.status');
    expect(element).toHaveClass('custom-class');
  });

  test('does not apply custom className when using ping animation', () => {
    const { container } = render(
      <Status animate='ping' className='custom-class' />,
    );
    const elements = container.querySelectorAll('div');

    elements.forEach(element => {
      expect(element).not.toHaveClass('custom-class');
    });
  });
});
