import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders with string content', () => {
    render(
      <Tooltip content='hello'>
        <button>Hover me</button>
      </Tooltip>,
    );
    const tooltip = document.querySelector('[data-tip="hello"]');
    expect(tooltip).toBeInTheDocument();
  });

  it('renders with custom content', () => {
    render(
      <Tooltip content={<div data-testid='custom-content'>Custom</div>}>
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(
      <Tooltip content='hello' variant='primary'>
        <button>Button</button>
      </Tooltip>,
    );
    expect(container.firstChild).toHaveClass('tooltip-primary');
  });

  it('applies position classes', () => {
    const { container } = render(
      <Tooltip content='hello' position='bottom'>
        <button>Button</button>
      </Tooltip>,
    );
    expect(container.firstChild).toHaveClass('tooltip-bottom');
  });

  it('applies open class', () => {
    const { container } = render(
      <Tooltip content='hello' open>
        <button>Button</button>
      </Tooltip>,
    );
    expect(container.firstChild).toHaveClass('tooltip-open');
  });

  it('applies responsive class', () => {
    const { container } = render(
      <Tooltip content='hello' responsive>
        <button>Button</button>
      </Tooltip>,
    );
    expect(container.firstChild).toHaveClass('lg:tooltip');
  });
});
