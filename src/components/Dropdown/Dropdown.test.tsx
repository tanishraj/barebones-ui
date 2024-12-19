import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('btn');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    let buttonElement = screen.getByRole('button', { name: /secondary/i });
    expect(buttonElement).toHaveClass('btn-secondary');

    rerender(<Button variant='ghost'>Ghost</Button>);
    buttonElement = screen.getByRole('button', { name: /ghost/i });
    expect(buttonElement).toHaveClass('btn-ghost');

    rerender(<Button variant='link'>Link</Button>);
    buttonElement = screen.getByRole('button', { name: /link/i });
    expect(buttonElement).toHaveClass('btn-link');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    let buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('btn-sm');

    rerender(<Button size='lg'>Large</Button>);
    buttonElement = screen.getByRole('button', { name: /large/i });
    expect(buttonElement).toHaveClass('btn-lg');
  });

  it('renders with an icon on the left', () => {
    render(
      <Button icon={<span data-testid='icon'>⭐</span>}>Icon Button</Button>,
    );
    const buttonElement = screen.getByRole('button', { name: /icon button/i });
    const iconElement = screen.getByTestId('icon');
    expect(buttonElement).toContainElement(iconElement);
    expect(buttonElement).toHaveClass('flex-row');
  });

  it('renders with an icon on the right', () => {
    render(
      <Button icon={<span data-testid='icon'>⭐</span>} iconPosition='right'>
        Icon Button
      </Button>,
    );
    const buttonElement = screen.getByRole('button', { name: /icon button/i });
    const iconElement = screen.getByTestId('icon');
    expect(buttonElement).toContainElement(iconElement);
    expect(buttonElement).toHaveClass('flex-row-reverse');
  });

  it('handles disabled state', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const buttonElement = screen.getByRole('button', { name: /disabled/i });
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
