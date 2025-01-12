import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Dropdown } from './Dropdown';

describe('Dropdown Component', () => {
  it('renders with default props', () => {
    render(<Dropdown label='Test Dropdown' />);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /test dropdown/i }),
    ).toBeInTheDocument();
  });

  it('renders with items prop', () => {
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

  it('triggers item click events', () => {
    const handleClick = vi.fn();
    const items = [{ label: 'Clickable Item', onClick: handleClick }];
    render(<Dropdown label='Dropdown' items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /Dropdown/i }));

    const item = screen.getByText(/clickable item/i);
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom content via children', () => {
    render(
      <Dropdown label='Custom Content'>
        <div data-testid='custom-child'>Custom Child</div>
      </Dropdown>,
    );
    fireEvent.click(screen.getByRole('button', { name: /custom content/i }));
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });

  it('applies position and alignment classes', () => {
    render(
      <Dropdown label='Positioned Dropdown' position='top' alignment='start' />,
    );
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-top dropdown-start');
  });

  it('handles toggle behavior correctly', () => {
    render(<Dropdown label='Toggle Behavior' />);
    const button = screen.getByRole('button', { name: /toggle behavior/i });
    fireEvent.click(button);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-toggle');
  });

  it('handles hover behavior correctly', () => {
    render(<Dropdown label='Hover Behavior' behavior='hover' />);
    const dropdown = screen.getByTestId('dropdown');
    fireEvent.mouseEnter(dropdown);
    expect(dropdown).toHaveClass('dropdown-hover');
  });

  it('forces open state with forceOpen behavior', () => {
    render(<Dropdown label='Force Open' behavior='forceOpen' />);
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-open');
  });

  it('closes on outside click with clickOutsideClose behavior', () => {
    render(<Dropdown label='Close on Outside' behavior='clickOutsideClose' />);
    const button = screen.getByRole('button', { name: /close on outside/i });
    fireEvent.click(button); // Open dropdown
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('dropdown-close');
    fireEvent.click(document.body); // Click outside
    expect(dropdown).toHaveClass('dropdown-close');
  });

  it('applies variant and size classes to the trigger button', () => {
    render(<Dropdown label='Styled Button' variant='primary' size='lg' />);
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button).toHaveClass('btn-primary btn-lg');
  });

  it('renders with custom trigger className', () => {
    render(
      <Dropdown label='Custom Trigger' triggerClassName='custom-trigger' />,
    );
    const button = screen.getByRole('button', { name: /custom trigger/i });
    expect(button).toHaveClass('custom-trigger');
  });

  it('renders with custom menu className', () => {
    const items = [{ label: 'Item 1' }, { label: 'Item 2' }];
    render(
      <Dropdown
        label='Custom Menu'
        items={items}
        menuClassName='custom-menu'
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /custom menu/i }));
    const menu = screen.getByRole('menu');
    expect(menu).toHaveClass('custom-menu');
  });

  it('renders disabled state', () => {
    render(<Dropdown label='Disabled Dropdown' disabled />);
    const button = screen.getByRole('button', { name: /disabled dropdown/i });
    expect(button).toHaveClass('btn-disabled');
  });
});
