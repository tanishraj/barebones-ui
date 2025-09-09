import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder='Test input' />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label='Email' placeholder='Enter email' />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('applies size variant classes', () => {
    const { rerender } = render(<Input size='xs' placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-xs');

    rerender(<Input size='lg' placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-lg');
  });

  it('applies color variant classes', () => {
    const { rerender } = render(<Input variant='primary' placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-primary');

    rerender(<Input variant='error' placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-error');
  });

  it('applies bordered class when bordered is true', () => {
    const { rerender } = render(<Input bordered={true} placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-bordered');

    rerender(<Input bordered={false} placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).not.toHaveClass('input-bordered');
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder='test' />);
    const input = screen.getByPlaceholderText('test');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('renders helper text', () => {
    render(<Input helper='This is helper text' placeholder='test' />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('renders error message and applies error class', () => {
    render(<Input error='Invalid input' placeholder='test' />);
    const errorText = screen.getByText('Invalid input');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-error');
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-error');
  });

  it('renders success message and applies success class', () => {
    render(<Input success='Valid input' placeholder='test' />);
    const successText = screen.getByText('Valid input');
    expect(successText).toBeInTheDocument();
    expect(successText).toHaveClass('text-success');
    expect(screen.getByPlaceholderText('test')).toHaveClass('input-success');
  });

  it('prioritizes error over success message', () => {
    render(
      <Input
        error='Error message'
        success='Success message'
        helper='Helper text'
        placeholder='test'
      />
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders start adornment', () => {
    render(
      <Input
        startAdornment={<span data-testid='start-icon'>@</span>}
        placeholder='test'
      />
    );
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  it('renders end adornment', () => {
    render(
      <Input
        endAdornment={<span data-testid='end-icon'>✓</span>}
        placeholder='test'
      />
    );
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('renders both start and end adornments', () => {
    render(
      <Input
        startAdornment={<span data-testid='start'>$</span>}
        endAdornment={<span data-testid='end'>.00</span>}
        placeholder='test'
      />
    );
    expect(screen.getByTestId('start')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const handleChange = jest.fn();
    render(
      <Input
        placeholder='test'
        onChange={handleChange}
      />
    );
    
    const input = screen.getByPlaceholderText('test');
    await userEvent.type(input, 'Hello');
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder='test' />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('test');
  });

  it('renders with different input types', () => {
    const { rerender } = render(<Input type='email' placeholder='email' />);
    expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email');

    rerender(<Input type='password' placeholder='password' />);
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password');

    rerender(<Input type='number' placeholder='number' />);
    expect(screen.getByPlaceholderText('number')).toHaveAttribute('type', 'number');
  });

  it('positions label on top by default', () => {
    const { container } = render(
      <Input label='Top Label' labelPosition='top' placeholder='test' />
    );
    const formControl = container.querySelector('.form-control');
    const label = container.querySelector('.label');
    
    expect(formControl).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.querySelector('.label-text')).toHaveTextContent('Top Label');
  });

  it('positions label on the left when specified', () => {
    const { container } = render(
      <Input label='Left Label' labelPosition='left' placeholder='test' />
    );
    const labelElement = container.querySelector('.label.cursor-pointer');
    
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('gap-3');
    expect(labelElement?.querySelector('.label-text')).toHaveTextContent('Left Label');
  });

  it('accepts and applies custom className', () => {
    render(
      <Input
        className='custom-class another-class'
        placeholder='test'
      />
    );
    expect(screen.getByPlaceholderText('test')).toHaveClass('custom-class', 'another-class');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input
        placeholder='test'
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
    
    const input = screen.getByPlaceholderText('test');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('supports required attribute', () => {
    render(<Input required placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toBeRequired();
  });

  it('supports readonly attribute', () => {
    render(<Input readOnly value='readonly text' placeholder='test' />);
    const input = screen.getByDisplayValue('readonly text');
    expect(input).toHaveAttribute('readOnly');
  });

  it('supports maxLength attribute', () => {
    render(<Input maxLength={10} placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveAttribute('maxLength', '10');
  });

  it('supports pattern attribute', () => {
    render(<Input pattern='[0-9]*' placeholder='test' />);
    expect(screen.getByPlaceholderText('test')).toHaveAttribute('pattern', '[0-9]*');
  });
});