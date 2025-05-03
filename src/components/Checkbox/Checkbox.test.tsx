import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  test('renders with label', () => {
    render(<Checkbox label='Test Checkbox' />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  test('handles disabled state', () => {
    render(<Checkbox label='Disabled' disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('handles default checked state', () => {
    render(<Checkbox label='Checked' defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('applies size classes', () => {
    const { container } = render(<Checkbox size='lg' />);
    expect(container.firstChild).toHaveClass('checkbox-lg');
  });

  test('applies variant classes', () => {
    const { container } = render(<Checkbox variant='success' />);
    expect(container.firstChild).toHaveClass('checkbox-success');
  });
});
