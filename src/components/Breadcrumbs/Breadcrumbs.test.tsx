import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Breadcrumbs, type BreadcrumbsItem } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  const mockItems: BreadcrumbsItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Current Product' },
  ];

  it('renders the correct number of items', () => {
    render(<Breadcrumbs items={mockItems} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockItems.length);
  });

  it('renders links for all items except the last one', () => {
    render(<Breadcrumbs items={mockItems} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockItems.length - 1);
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('Products');
  });

  it('renders the last item as span', () => {
    render(<Breadcrumbs items={mockItems} />);
    const lastItem = screen.getByText('Current Product');
    expect(lastItem.tagName).toBe('SPAN');
  });

  it('applies correct href attributes', () => {
    render(<Breadcrumbs items={mockItems} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/products');
  });

  it('applies default class names correctly', () => {
    const { container } = render(<Breadcrumbs items={mockItems} />);
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('breadcrumbs');
  });

  it('merges custom class names correctly', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Breadcrumbs items={mockItems} className={customClass} />,
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('breadcrumbs', customClass);
  });

  it('handles accessibility attributes', () => {
    render(<Breadcrumbs items={mockItems} />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('applies correct text colors', () => {
    render(<Breadcrumbs items={mockItems} />);
    const links = screen.getAllByRole('link');
    const lastItem = screen.getByText('Current Product');

    links.forEach(link => {
      expect(link).toHaveClass('text-neutral-500');
      expect(link).toHaveClass('hover:text-neutral-700');
    });

    expect(lastItem).toHaveClass('text-neutral-900');
  });

  it('renders correctly with single item', () => {
    const singleItem = [{ label: 'Standalone' }];
    render(<Breadcrumbs items={singleItem} />);
    const listItems = screen.getAllByRole('listitem');
    const span = screen.getByText('Standalone');

    expect(listItems).toHaveLength(1);
    expect(span.tagName).toBe('SPAN');
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
