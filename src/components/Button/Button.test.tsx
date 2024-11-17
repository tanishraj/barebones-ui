import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-blue-500');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant='secondary'>Secondary</Button>);
    let buttonElement = screen.getByRole('button', { name: /secondary/i });
    expect(buttonElement).toHaveClass('bg-gray-500');

    rerender(<Button variant='ghost'>Ghost</Button>);
    buttonElement = screen.getByRole('button', { name: /ghost/i });
    expect(buttonElement).toHaveClass('bg-transparent');

    rerender(<Button variant='link'>Link</Button>);
    buttonElement = screen.getByRole('button', { name: /link/i });
    expect(buttonElement).toHaveClass('underline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size='sm'>Small</Button>);
    let buttonElement = screen.getByRole('button', { name: /small/i });
    expect(buttonElement).toHaveClass('px-2 py-1 text-sm');

    rerender(<Button size='lg'>Large</Button>);
    buttonElement = screen.getByRole('button', { name: /large/i });
    expect(buttonElement).toHaveClass('px-6 py-3 text-lg');
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
