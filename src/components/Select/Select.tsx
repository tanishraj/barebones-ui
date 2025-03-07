import { forwardRef } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { selectStyles } from './Select.styles';
import { SelectElementProps, SelectOptions } from './types';

export type SelectProps = SelectElementProps &
  VariantProps<typeof selectStyles> & {
    name: string;
    options: SelectOptions[];
    label?: string;
    helperText?: string;
    className?: string;
  };

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      name,
      options,
      variant,
      size = 'md',
      disabled,
      label,
      helperText,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <fieldset className='fieldset'>
        {label && (
          <label className='label' htmlFor={name}>
            {label}
          </label>
        )}
        <select
          id={name}
          ref={ref}
          className={selectStyles({
            variant,
            size,
            disabled,
            className,
          })}
          disabled={disabled}
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helperText && (
          <label className='label'>
            <span className='label-text-alt'>{helperText}</span>
          </label>
        )}
      </fieldset>
    );
  },
);
