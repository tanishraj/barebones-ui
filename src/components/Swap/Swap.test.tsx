import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Swap } from './Swap';

describe('Swap Component', () => {
  it('renders the Swap component with two children', () => {
    render(
      <Swap>
        <div>First Child</div>
        <div>Second Child</div>
      </Swap>,
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('applies the correct animation class when `animationType` is provided', () => {
    const { container } = render(
      <Swap animationType='rotate'>
        <div>First Child</div>
        <div>Second Child</div>
      </Swap>,
    );

    expect(container.querySelector('.swap-rotate')).toBeInTheDocument();
  });

  it('toggles the active state when `active` prop changes', () => {
    const { rerender, container } = render(
      <Swap active={false}>
        <div>First Child</div>
        <div>Second Child</div>
      </Swap>,
    );

    // Initially, the swap should not be active
    expect(container.querySelector('.swap-active')).not.toBeInTheDocument();

    // Rerender with active=true
    rerender(
      <Swap active={true}>
        <div>First Child</div>
        <div>Second Child</div>
      </Swap>,
    );

    // Now, the swap should be active
    expect(container.querySelector('.swap-active')).toBeInTheDocument();
  });

  it('calls the onChange handler when the swap is toggled', () => {
    const onChange = vi.fn();
    render(
      <Swap active={false} onChange={onChange}>
        <div>First Child</div>
        <div>Second Child</div>
      </Swap>,
    );

    const checkbox = screen.getByRole('checkbox', { hidden: true });
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
