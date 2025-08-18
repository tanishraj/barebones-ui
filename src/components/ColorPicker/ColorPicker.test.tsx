import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { ColorPicker } from './ColorPicker';
import type { ColorPickerProps } from './ColorPicker';

describe('ColorPicker', () => {
  const defaultProps: ColorPickerProps = {
    value: '#3b82f6',
    onChange: vi.fn(),
  };

  it('renders without a label', () => {
    render(<ColorPicker {...defaultProps} />);
    const input = screen.getByDisplayValue('#3b82f6');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'color');
    expect(input).toHaveClass('color-input');
  });

  it('renders with a label on the left', () => {
    render(<ColorPicker {...defaultProps} label='Primary Color' />);

    const label = screen.getByText('Primary Color');
    expect(label).toBeInTheDocument();

    const input = screen.getByDisplayValue('#3b82f6');
    expect(input.closest('label')).toContainElement(label);
  });

  it('renders with a label on the right', () => {
    render(
      <ColorPicker
        {...defaultProps}
        label='Accent Color'
        labelPosition='right'
      />,
    );

    const label = screen.getByText('Accent Color');
    const input = screen.getByDisplayValue('#3b82f6');

    // Verify label comes after input in DOM
    expect(input.compareDocumentPosition(label)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<ColorPicker {...defaultProps} size='xs' />);
    const xsInput = screen.getByDisplayValue('#3b82f6');
    expect(xsInput).toHaveClass('h-4 w-4');

    rerender(<ColorPicker {...defaultProps} size='sm' />);
    expect(xsInput).toHaveClass('h-5 w-5');

    rerender(<ColorPicker {...defaultProps} size='lg' />);
    expect(xsInput).toHaveClass('h-7 w-7');
  });

  it('calls onChange when color is changed', () => {
    render(<ColorPicker {...defaultProps} />);
    const input = screen.getByDisplayValue('#3b82f6');

    fireEvent.change(input, { target: { value: '#ef4444' } });
    expect(defaultProps.onChange).toHaveBeenCalledWith('#ef4444');
  });

  it('applies custom className', () => {
    render(<ColorPicker {...defaultProps} className='custom-class' />);

    const wrapper = screen.getByDisplayValue('#3b82f6').closest('div');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('passes additional input attributes', () => {
    render(
      <ColorPicker {...defaultProps} disabled aria-label='Color selector' />,
    );

    const input = screen.getByDisplayValue('#3b82f6');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'Color selector');
  });

  it('has proper accessibility attributes', () => {
    render(<ColorPicker {...defaultProps} label='Theme Color' />);

    const input = screen.getByDisplayValue('#3b82f6');

    expect(input).toHaveAttribute('id');
  });

  it('handles labelPosition correctly', () => {
    render(
      <ColorPicker
        {...defaultProps}
        label='Position Test'
        labelPosition='left'
      />,
    );

    const labelLeft = screen.getByText('Position Test');
    const input = screen.getByDisplayValue('#3b82f6');
    expect(labelLeft.compareDocumentPosition(input)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
