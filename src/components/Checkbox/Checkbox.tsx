import { type VariantProps } from 'class-variance-authority';
import { forwardRef, useEffect } from 'react';

import { checkboxStyles } from './Checkbox.styles';
import { cn } from '../../utils';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof checkboxStyles> & {
    indeterminate?: boolean;
    label?: string;
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, size, variant, indeterminate, label, disabled, ...props },
    ref,
  ) => {
    const checkboxClassName = cn(
      checkboxStyles({ size, variant, className }),
      disabled && 'opacity-50 cursor-not-allowed',
    );

    useEffect(() => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.indeterminate = indeterminate ?? false;
      }
    }, [ref, indeterminate]);

    const inputComponent = (
      <input
        type='checkbox'
        className={checkboxClassName}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );

    return label ? (
      <label className='label cursor-pointer gap-2'>
        {inputComponent}
        <span className='label-text'>{label}</span>
      </label>
    ) : (
      inputComponent
    );
  },
);
