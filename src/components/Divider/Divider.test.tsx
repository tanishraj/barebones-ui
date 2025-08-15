import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders without crashing', () => {
    render(<Divider />);
    const divider = document.querySelector('.divider');
    expect(divider).toBeInTheDocument();
  });

  it('renders with children text', () => {
    render(<Divider>OR</Divider>);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('applies default vertical orientation', () => {
    render(<Divider />);
    const divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider');
    expect(divider).not.toHaveClass('divider-horizontal');
  });

  it('applies horizontal orientation when specified', () => {
    render(<Divider orientation='horizontal' />);
    const divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-horizontal');
  });

  it('applies color variants correctly', () => {
    const { rerender } = render(<Divider variant='primary' />);
    let divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-primary');

    rerender(<Divider variant='secondary' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-secondary');

    rerender(<Divider variant='accent' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-accent');

    rerender(<Divider variant='success' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-success');

    rerender(<Divider variant='warning' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-warning');

    rerender(<Divider variant='info' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-info');

    rerender(<Divider variant='error' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-error');

    rerender(<Divider variant='neutral' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-neutral');
  });

  it('applies position variants correctly', () => {
    const { rerender } = render(<Divider position='start' />);
    let divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-start');

    rerender(<Divider position='end' />);
    divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider-end');

    rerender(<Divider position='center' />);
    divider = document.querySelector('.divider');
    expect(divider).not.toHaveClass('divider-start');
    expect(divider).not.toHaveClass('divider-end');
  });

  it('applies custom className', () => {
    render(<Divider className='custom-class' />);
    const divider = document.querySelector('.divider');
    expect(divider).toHaveClass('custom-class');
  });

  it('combines multiple props correctly', () => {
    render(
      <Divider
        orientation='horizontal'
        variant='primary'
        position='start'
        className='custom-class'
      >
        Test
      </Divider>,
    );
    const divider = document.querySelector('.divider');
    expect(divider).toHaveClass('divider');
    expect(divider).toHaveClass('divider-horizontal');
    expect(divider).toHaveClass('divider-primary');
    expect(divider).toHaveClass('divider-start');
    expect(divider).toHaveClass('custom-class');
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders without text when children is not provided', () => {
    render(<Divider />);
    const divider = document.querySelector('.divider');
    expect(divider).toBeInTheDocument();
    expect(divider?.textContent).toBe('');
  });

  it('maintains proper structure with default props', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild as HTMLElement;
    expect(divider.tagName).toBe('DIV');
    expect(divider).toHaveClass('divider');
  });
});
