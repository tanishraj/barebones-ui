import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<Skeleton />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('skeleton');
  });

  it('applies circle variant correctly', () => {
    const { container } = render(<Skeleton variant='circle' />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('rounded-full');
  });

  it('applies text variant correctly', () => {
    const { container } = render(<Skeleton variant='text' />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('h-4');
  });

  it('merges custom class names', () => {
    const { container } = render(
      <Skeleton className='custom-class h-12 w-12' />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain('custom-class');
    expect(element.className).toContain('h-12');
    expect(element.className).toContain('w-12');
  });
});
