import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Accordion } from './Accordion';

const testItems = [
  { title: 'Item 1', content: 'Content 1' },
  { title: 'Item 2', content: 'Content 2' },
  { title: 'Item 3', content: 'Content 3' },
];

describe('Accordion', () => {
  it('renders all items', () => {
    render(<Accordion name='accordion' items={testItems} />);
    testItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('shows content when clicked', async () => {
    render(<Accordion name='accordion' items={testItems} />);
    const firstItem = screen.getByText('Item 1');

    fireEvent.click(firstItem);
    expect(screen.getByText('Content 1')).toBeVisible();

    const secondItem = screen.getByText('Item 2');
    fireEvent.click(secondItem);
    expect(screen.queryByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('respects defaultOpenIndex', () => {
    render(
      <Accordion name='accordion' items={testItems} defaultOpenIndex={0} />,
    );
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('toggles icon style', () => {
    const { container } = render(
      <Accordion name='accordion' items={testItems} iconStyle='plus' />,
    );
    expect(container.querySelector('.collapse-plus')).toBeInTheDocument();
  });
});
