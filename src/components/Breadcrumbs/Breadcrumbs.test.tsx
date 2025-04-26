// Breadcrumb.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Breadcrumbs from './Breadcrumbs';
import { HomeIcon } from './Breadcrumbs.stories';

describe('Breadcrumb', () => {
  const defaultItems = [
    { label: 'Home', href: '/' },
    { label: 'Documents', href: '/documents' },
    { label: 'Add Document' },
  ];

  const itemsWithIcons = [
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon className='h-4 w-4 stroke-current' />,
    },
    { label: 'Documents', href: '/documents' },
    { label: 'Add Document' },
  ];

  // Test 1: Basic rendering
  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumbs items={defaultItems} />);

    // Should render all items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Add Document')).toBeInTheDocument();

    // First two items should be links
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Documents').closest('a')).toHaveAttribute(
      'href',
      '/documents',
    );

    // Last item should not be a link
    expect(screen.getByText('Add Document').closest('a')).toBeNull();
  });

  // Test 2: Icon rendering
  it('displays icons when provided', () => {
    render(<Breadcrumbs items={itemsWithIcons} />);

    // Check for SVG elements (icons)
    const svgElements = screen.getAllByRole('img', { hidden: true });
    expect(svgElements.length).toBe(1); // Only first item has icon

    // Verify icon is in the correct item
    expect(screen.getByText('Home').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Documents').querySelector('svg')).toBeNull();
  });

  // Test 3: Size variants
  it('applies correct size classes', () => {
    const { rerender } = render(<Breadcrumbs items={defaultItems} size='sm' />);
    expect(screen.getByRole('navigation')).toHaveClass('text-sm');

    rerender(<Breadcrumbs items={defaultItems} size='md' />);
    expect(screen.getByRole('navigation')).toHaveClass('text-base');

    rerender(<Breadcrumbs items={defaultItems} size='lg' />);
    expect(screen.getByRole('navigation')).toHaveClass('text-lg');
  });

  // Test 4: Max width handling
  it('handles maxWidth prop correctly', () => {
    render(<Breadcrumbs items={defaultItems} maxWidth='max-w-xs' />);

    const breadcrumbDiv = screen.getByRole('navigation');
    expect(breadcrumbDiv).toHaveClass('max-w-xs');

    // Check truncation class on all items
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('truncate');
    });
  });

  // Test 5: Last item not clickable
  it('renders last item as span', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const lastItem = screen.getByText('Add Document');
    expect(lastItem.closest('a')).toBeNull();
    expect(lastItem.tagName).toBe('SPAN');
  });

  // Test 6: Accessibility
  it('has proper accessibility attributes', () => {
    render(<Breadcrumbs items={defaultItems} />);

    // Navigation role
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // List structure
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  // Test 7: Custom class names
  it('merges custom class names correctly', () => {
    render(<Breadcrumbs items={defaultItems} className='custom-class' />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });
});
