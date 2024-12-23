import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  it('renders with default props', () => {
    render(<Dropdown label='Test Dropdown' />);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /test dropdown/i }),
    ).toBeInTheDocument();
  });

  it('renders with items', () => {
    const items = [
      { label: 'Item 1', onClick: vi.fn() },
      { label: 'Item 2', onClick: vi.fn() },
    ];
    render(<Dropdown label='With Items' items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /with items/i }));

    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('handles item clicks', () => {
    const handleClick = vi.fn();
    const items = [{ label: 'Item 1', onClick: handleClick }];
    render(<Dropdown label='Clickable Items' items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /clickable items/i }));

    const item = screen.getByText(/item 1/i);
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom content via children', () => {
    render(
      <Dropdown label='Custom Content'>
        <div>Custom Child</div>
      </Dropdown>,
    );
    fireEvent.click(screen.getByRole('button', { name: /custom content/i }));
    expect(screen.getByText(/custom child/i)).toBeInTheDocument();
  });

  it('handles toggle behavior', () => {
    render(<Dropdown label='Toggle Behavior' />);
    const button = screen.getByRole('button', { name: /toggle behavior/i });
    fireEvent.click(button);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).not.toHaveClass('dropdown-open');
  });

  it('handles hover behavior', () => {
    render(<Dropdown label='Hover Behavior' behavior='hover' />);
    const dropdown = screen.getByTestId('dropdown');
    fireEvent.mouseEnter(dropdown);
    expect(dropdown).toHaveClass('dropdown-hover');
  });

  it('forces open state', () => {
    render(<Dropdown label='Force Open' behavior='forceOpen' />);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-open');
  });

  it('closes on outside click when `clickOutsideClose` is enabled', () => {
    render(<Dropdown label='Close on Outside' behavior='clickOutsideClose' />);
    const button = screen.getByRole('button', { name: /close on outside/i });
    fireEvent.click(button); // Open
    expect(screen.getByTestId('dropdown')).not.toHaveClass('dropdown-open');
    fireEvent.click(document.body); // Click outside
    expect(screen.getByTestId('dropdown')).not.toHaveClass('dropdown-open');
  });
});
