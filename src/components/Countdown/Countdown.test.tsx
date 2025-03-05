import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VariantProps } from 'class-variance-authority';

import { Countdown } from './Countdown';
import { countdownStyles } from './Countdown.styles';

describe('Countdown', () => {
  // Test rendering of the value prop
  test('renders the correct value', () => {
    const value = 5;
    const { getByText } = render(<Countdown value={value} />);
    expect(getByText(value.toString())).toBeInTheDocument();
  });

  // Parameterized test for each size variant
  test.each([
    { size: 'sm', expectedClass: 'text-xl' },
    { size: 'md', expectedClass: 'text-2xl' },
    { size: 'lg', expectedClass: 'text-4xl' },
    { size: 'xl', expectedClass: 'text-6xl' },
  ])(
    'applies $expectedClass class when size is $size',
    ({ size, expectedClass }) => {
      const { container } = render(
        <Countdown
          value={10}
          size={size as VariantProps<typeof countdownStyles>['size']}
        />,
      );
      const outerSpan = container.querySelector('span.countdown');
      expect(outerSpan).toHaveClass(expectedClass);
    },
  );

  // Test default size (sm)
  test('uses default sm size when size prop is omitted', () => {
    const { container } = render(<Countdown value={10} />);
    const outerSpan = container.querySelector('span.countdown');
    expect(outerSpan).toHaveClass('text-xl');
  });

  // Test CSS variable injection
  test('applies --value CSS variable inline', () => {
    const value = 15;
    const { getByText } = render(<Countdown value={value} />);
    const innerSpan = getByText(value.toString());
    expect(innerSpan).toHaveStyle({ '--value': String(value) });
  });
});
