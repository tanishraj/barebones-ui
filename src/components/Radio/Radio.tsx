import { type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { radioStyles } from './Radio.styles';
import { cn } from '../../utils';

export interface RadioProps
  extends
    Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'disabled'>,
    VariantProps<typeof radioStyles> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, variant, disabled, ...props }, ref) => {
    const radioClassName = cn(
      radioStyles({ size, variant, disabled }),
      className,
    );

    return (
      <input
        type='radio'
        className={radioClassName}
        disabled={disabled!}
        ref={ref}
        {...props}
      />
    );
  },
);
