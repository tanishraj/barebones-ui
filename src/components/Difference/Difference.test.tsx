import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Difference } from './Difference';

describe('Difference Component', () => {
  test('renders both children elements', () => {
    render(
      <Difference>
        <div>First</div>
        <div>Second</div>
      </Difference>,
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  test('applies custom className to the figure element', () => {
    const testClassName = 'custom-class';
    render(
      <Difference className={testClassName}>
        <div>First</div>
        <div>Second</div>
      </Difference>,
    );

    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('diff', testClassName);
  });

  test('has correct structure and accessibility attributes', () => {
    const { container } = render(
      <Difference>
        <div>First</div>
        <div>Second</div>
      </Difference>,
    );

    // Verify figure attributes
    const figure = screen.getByRole('figure');
    expect(figure).toHaveAttribute('tabIndex', '0');

    // Check both diff items exist and have correct roles/classes
    const diffItems = screen.getAllByRole('img');
    expect(diffItems).toHaveLength(2);
    expect(diffItems[0]).toHaveClass('diff-item-1');
    expect(diffItems[1]).toHaveClass('diff-item-2');

    // Verify second item's tabIndex
    expect(diffItems[1]).toHaveAttribute('tabIndex', '0');

    // Ensure resizer element exists
    const resizer = container.querySelector('.diff-resizer');
    expect(resizer).toBeInTheDocument();
  });

  test('applies default "diff" className when no custom class provided', () => {
    render(
      <Difference>
        <div>First</div>
        <div>Second</div>
      </Difference>,
    );

    const figure = screen.getByRole('figure');
    expect(figure).toHaveClass('diff');
    expect(figure.className).toBe('diff');
  });
});
