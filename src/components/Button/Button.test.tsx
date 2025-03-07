import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Button } from './Button';
import type {
  ButtonVariant,
  ButtonSize,
  ButtonOutline,
  ButtonLayout,
} from './types';

describe('Button Component', () => {
  // Basic rendering tests
  test('renders without crashing', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  // Icon handling tests
  test('renders icon when provided', () => {
    render(<Button icon='🚀' />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  test('iconPosition applies correct flex class', () => {
    const { rerender } = render(<Button icon='🚀' iconPosition='left' />);
    expect(screen.getByRole('button')).toHaveClass('flex-row');

    rerender(<Button icon='🚀' iconPosition='right' />);
    expect(screen.getByRole('button')).toHaveClass('flex-row-reverse');
  });

  // Disabled state tests
  test('applies disabled styles and attributes', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  test('onClick is not called when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Interaction tests
  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Style variant tests
  test.each([
    ['primary', 'btn-primary'],
    ['secondary', 'btn-secondary'],
    ['accent', 'btn-accent'],
    ['neutral', 'btn-neutral'],
    ['info', 'btn-info'],
    ['success', 'btn-success'],
    ['warning', 'btn-warning'],
    ['error', 'btn-error'],
    ['ghost', 'btn-ghost'],
    ['link', 'btn-link'],
  ])('applies variant %s', (variant, expectedClass) => {
    render(<Button variant={variant as ButtonVariant} />);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  test.each([
    ['solid', 'btn-outline'],
    ['dashed', 'btn-dash'],
  ])('applies outline %s', (outline, expectedClass) => {
    render(<Button outline={outline as ButtonOutline} />);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  test.each([
    ['xs', 'btn-xs'],
    ['sm', 'btn-sm'],
    ['md', 'btn-md'],
    ['lg', 'btn-lg'],
    ['xl', 'btn-xl'],
  ])('applies size %s', (size, expectedClass) => {
    render(<Button size={size as ButtonSize} />);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  test.each([
    ['wide', 'btn-wide'],
    ['block', 'btn-block'],
    ['square', 'btn-square'],
    ['circle', 'btn-circle'],
  ])('applies layout %s', (layout, expectedClass) => {
    render(<Button layout={layout as ButtonLayout} />);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  // State tests
  test('applies active class when active', () => {
    render(<Button active />);
    expect(screen.getByRole('button')).toHaveClass('btn-active');
  });

  test('applies soft color class when softColor is true', () => {
    render(<Button softColor />);
    expect(screen.getByRole('button')).toHaveClass('btn-soft');
  });

  // Class name handling
  test('applies custom className', () => {
    render(<Button className='custom-class' />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  // Default props tests
  test('applies default classes when no props are provided', () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn-md');
    expect(button).toHaveClass('flex-row');
    expect(button).not.toHaveClass('btn-disabled');
    expect(button).not.toHaveClass('btn-active');
    expect(button).not.toHaveClass('btn-soft');
  });

  // Combined content test
  test('renders both icon and children', () => {
    render(<Button icon='🚀'>Launch</Button>);

    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('Launch')).toBeInTheDocument();
  });
});
