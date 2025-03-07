import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Select } from './Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

describe('Select', () => {
  it('renders correctly', () => {
    render(<Select name='test' options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays label', () => {
    render(<Select name='test' options={options} label='Test Label' />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Select name='test' options={options} helperText='Helper Text' />);
    expect(screen.getByText('Helper Text')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select name='test' options={options} />);
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select name='test' options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
