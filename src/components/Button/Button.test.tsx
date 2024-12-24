import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Button from './Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button', { name: /default button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn btn-md flex-row');
    expect(button).not.toBeDisabled();
  });

  it('applies the correct variant class', () => {
    render(<Button variant='primary'>Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('btn-primary');
  });

  it('applies the correct outline class', () => {
    render(<Button outline='dotted'>Dotted Outline</Button>);
    const button = screen.getByRole('button', { name: /dotted outline/i });
    expect(button).toHaveClass('btn-outline border-dotted');
  });

  it('applies the correct size class', () => {
    render(<Button size='lg'>Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('btn-lg');
  });

  it('handles the icon and iconPosition props', () => {
    const Icon = <span data-testid='icon'>⭐</span>;
    render(
      <Button icon={Icon} iconPosition='right'>
        Button with Icon
      </Button>,
    );
    const button = screen.getByRole('button', { name: /button with icon/i });
    expect(button).toHaveClass('flex-row-reverse');
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('disables the button when the disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  it('triggers the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    const button = screen.getByRole('button', { name: /clickable button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not trigger onClick when the button is disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Non-Clickable Button
      </Button>,
    );
    const button = screen.getByRole('button', {
      name: /non-clickable button/i,
    });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom Button</Button>);
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('renders correctly with icon only', () => {
    const Icon = <span data-testid='icon'>⭐</span>;
    render(<Button icon={Icon} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });

  it('applies default classes when no props are provided', () => {
    render(<Button>Default Classes Button</Button>);
    const button = screen.getByRole('button', {
      name: /default classes button/i,
    });
    expect(button).toHaveClass('btn btn-md flex-row');
  });
});
