import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders the correct text', () => {
    const testText = 'Ctrl+C';
    const { getByText } = render(<Kbd text={testText} />);

    expect(getByText(testText)).toBeInTheDocument();
  });

  it('applies the default size class (md)', () => {
    const { container } = render(<Kbd text='A' />);
    const kbdElement = container.querySelector('kbd');

    expect(kbdElement).toHaveClass('kbd-md');
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  sizes.forEach(size => {
    it(`applies the ${size} size class when provided`, () => {
      const { container } = render(<Kbd text='A' size={size} />);
      const kbdElement = container.querySelector('kbd');

      expect(kbdElement).toHaveClass(`kbd-${size}`);
    });
  });

  it('applies base kbd class along with size class', () => {
    const { container } = render(<Kbd text='A' size='lg' />);
    const kbdElement = container.querySelector('kbd');

    expect(kbdElement).toHaveClass('kbd'); // Base class
    expect(kbdElement).toHaveClass('kbd-lg'); // Size class
  });
});
