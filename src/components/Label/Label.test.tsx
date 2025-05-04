import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label Component', () => {
  it('renders label text when position is provided', () => {
    render(<Label text='Test Label' position='left' />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('does not render label text when position is not provided', () => {
    render(<Label text='Test Label' />);
    expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
  });

  it('renders label on the left when position is "left"', () => {
    render(
      <Label text='Left Label' position='left'>
        <input data-testid='test-input' />
      </Label>,
    );

    const label = screen.getByText('Left Label');
    const input = screen.getByTestId('test-input');
    const parent = label.parentElement;

    expect(parent?.children[0]).toContainElement(label);
    expect(parent?.children[1]).toContainElement(input);
  });

  it('renders label on the right when position is "right"', () => {
    render(
      <Label text='Right Label' position='right'>
        <input data-testid='test-input' />
      </Label>,
    );

    const label = screen.getByText('Right Label');
    const input = screen.getByTestId('test-input');
    const parent = label.parentElement;

    expect(parent?.children[0]).toContainElement(input);
    expect(parent?.children[1]).toContainElement(label);
  });

  it('renders children correctly', () => {
    render(
      <Label position='left'>
        <input data-testid='test-input' />
      </Label>,
    );
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('applies correct class for type "select"', () => {
    render(<Label type='select' text='Test' position='left' />);
    const labelElement = screen.getByText('Test').parentElement;
    expect(labelElement).toHaveClass('select');
  });

  it('applies correct class for type "input" by default', () => {
    render(<Label text='Test' position='left' />);
    const labelElement = screen.getByText('Test').parentElement;
    expect(labelElement).toHaveClass('input');
  });

  it('defaults to type "input" when not provided', () => {
    render(<Label text='Test' position='left' />);
    const labelElement = screen.getByText('Test').parentElement;
    expect(labelElement).toHaveClass('input');
  });
});
