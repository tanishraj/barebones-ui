import { type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { inputStyles } from './Input.styles';
import { cn } from '../../utils';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputStyles> & {
    label?: string;
    labelPosition?: 'top' | 'left';
    helper?: React.ReactNode;
    error?: React.ReactNode;
    success?: React.ReactNode;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      variant,
      bordered,
      label,
      labelPosition = 'top',
      helper,
      error,
      success,
      startAdornment,
      endAdornment,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputClassName = cn(
      inputStyles({ size, variant, bordered }),
      error && 'input-error',
      success && 'input-success',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    );

    const inputElement = (
      <div className='relative w-full'>
        {(startAdornment || endAdornment) ? (
          <label className={cn(
            'input flex items-center gap-2',
            inputClassName,
            !props.value && !props.defaultValue && props.placeholder && 'placeholder-shown',
          )}>
            {startAdornment && (
              <span className='flex items-center text-base-content/70'>
                {startAdornment}
              </span>
            )}
            <input
              type='text'
              className='grow bg-transparent border-none outline-none focus:outline-none p-0'
              disabled={disabled}
              ref={ref}
              {...props}
            />
            {endAdornment && (
              <span className='flex items-center text-base-content/70'>
                {endAdornment}
              </span>
            )}
          </label>
        ) : (
          <input
            type='text'
            className={inputClassName}
            disabled={disabled}
            ref={ref}
            {...props}
          />
        )}
        
        {/* Helper text */}
        {(helper || error || success) && (
          <div className='label'>
            <span className={cn(
              'label-text-alt',
              error && 'text-error',
              success && 'text-success',
            )}>
              {error || success || helper}
            </span>
          </div>
        )}
      </div>
    );

    if (!label) {
      return inputElement;
    }

    if (labelPosition === 'left') {
      return (
        <div className='form-control'>
          <label className='label cursor-pointer gap-3'>
            <span className='label-text'>{label}</span>
            {inputElement}
          </label>
        </div>
      );
    }

    // Default: labelPosition === 'top'
    return (
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
        {inputElement}
      </div>
    );
  },
);

Input.displayName = 'Input';