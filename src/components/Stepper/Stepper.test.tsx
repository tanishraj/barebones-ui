import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Stepper, StepperItem } from './Stepper';

describe('Stepper', () => {
  it('renders horizontal steps by default', () => {
    render(
      <Stepper>
        <StepperItem>Test</StepperItem>
      </Stepper>,
    );
    const list = screen.getByRole('list');
    expect(list).toHaveClass('steps');
    expect(list).not.toHaveClass('steps-vertical');
  });

  it('renders vertical steps when direction is vertical', () => {
    render(
      <Stepper direction='vertical'>
        <StepperItem>Test</StepperItem>
      </Stepper>,
    );
    expect(screen.getByRole('list')).toHaveClass('steps-vertical');
  });

  it('renders responsive steps when responsive prop is true', () => {
    render(
      <Stepper responsive>
        <StepperItem>Test</StepperItem>
      </Stepper>,
    );
    expect(screen.getByRole('list')).toHaveClass(
      'steps-vertical lg:steps-horizontal',
    );
  });

  it('applies scrollable wrapper when scrollable prop is true', () => {
    render(
      <Stepper scrollable>
        <StepperItem>Test</StepperItem>
      </Stepper>,
    );
    expect(screen.getByRole('list').parentElement).toHaveClass(
      'overflow-x-auto',
    );
  });

  it('renders step with variant class', () => {
    render(<StepperItem variant='primary'>Test</StepperItem>);
    expect(screen.getByRole('listitem')).toHaveClass('step-primary');
  });

  it('renders data-content attribute', () => {
    render(<StepperItem dataContent='✓'>Test</StepperItem>);
    expect(screen.getByRole('listitem')).toHaveAttribute('data-content', '✓');
  });

  it('renders custom content', () => {
    render(
      <StepperItem>
        <span>Custom</span> Content
      </StepperItem>,
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('combines custom className with base classes', () => {
    render(
      <Stepper className='custom-steps'>
        <StepperItem className='custom-step'>Test</StepperItem>
      </Stepper>,
    );
    expect(screen.getByRole('list')).toHaveClass('custom-steps');
    expect(screen.getByRole('listitem')).toHaveClass('custom-step');
  });
});
