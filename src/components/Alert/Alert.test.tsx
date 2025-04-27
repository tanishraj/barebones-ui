import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders with default props', () => {
    render(<Alert title='Test Title' description='Test description' />);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert');
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Alert variant='info' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-info');

    rerender(<Alert variant='success' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-success');

    rerender(<Alert variant='warning' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-warning');

    rerender(<Alert variant='error' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-error');
  });

  it('handles direction prop correctly', () => {
    const { rerender } = render(<Alert direction='vertical' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-vertical');

    rerender(<Alert direction='horizontal' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-horizontal');
  });

  it('handles responsive prop correctly', () => {
    render(<Alert responsive />);
    expect(screen.getByRole('alert')).toHaveClass('alert-vertical');
    expect(screen.getByRole('alert')).toHaveClass('sm:alert-horizontal');
  });

  it('displays custom icon when provided', () => {
    const CustomIcon = vi.fn(() => <svg data-testid='custom-icon' />);
    render(<Alert icon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders actions correctly', () => {
    render(<Alert actions={<button>Test Action</button>} />);
    expect(
      screen.getByRole('button', { name: 'Test Action' }),
    ).toBeInTheDocument();
  });

  it('handles borderStyle prop correctly', () => {
    render(<Alert borderStyle='outline' />);
    expect(screen.getByRole('alert')).toHaveClass('alert-outline');
  });

  it('handles softColor prop correctly', () => {
    render(<Alert softColor />);
    expect(screen.getByRole('alert')).toHaveClass('alert-soft');
  });

  it('accepts custom className', () => {
    render(<Alert className='custom-class' />);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('renders children when provided', () => {
    render(
      <Alert>
        <div data-testid='custom-child'>Custom Content</div>
      </Alert>,
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });

  it('prioritizes children over title/description', () => {
    render(
      <Alert title='Title' description='Description'>
        <div data-testid='child-content'>Child Content</div>
      </Alert>,
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });
});
