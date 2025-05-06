import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Radio } from './Radio';

describe('Radio', () => {
  it('should render with default classNames', () => {
    const { container } = render(<Radio name='radio-test' />);
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveClass('radio');
  });

  it('should apply size classes', () => {
    const { container } = render(<Radio name='radio-test' size='xs' />);
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveClass('radio-xs');
  });

  it('should apply variant classes', () => {
    const { container } = render(<Radio name='radio-test' variant='primary' />);
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveClass('radio-primary');
  });

  it('should apply disabled classes and attributes', () => {
    const { container } = render(<Radio name='radio-test' disabled />);
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveClass('disabled', 'cursor-not-allowed', 'opacity-50');
    expect(input).toBeDisabled();
  });

  it('should combine custom className', () => {
    const { container } = render(
      <Radio name='radio-test' className='custom-class' />,
    );
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveClass('custom-class');
  });
});
