import React, { useId } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { colorPickerStyles, inputStyles } from './ColorPicker.styles';

export interface ColorPickerProps
  extends VariantProps<typeof colorPickerStyles>,
    VariantProps<typeof inputStyles>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ size, fullWidth, label, value, onChange, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className={colorPickerStyles({ size, fullWidth, className })}>
        {label && (
          <label htmlFor={id} className='font-medium text-gray-700'>
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            {...props}
            ref={ref}
            id={id}
            type='color'
            value={value}
            onChange={e => onChange(e.target.value)}
            className={inputStyles({ size })}
          />
          <div
            className='absolute inset-0 rounded border border-black border-opacity-10 pointer-events-none'
            style={{
              backgroundColor: value,
              backgroundSize: '100%',
            }}
          />
        </div>
        <span className='font-mono text-gray-500'>{value}</span>
      </div>
    );
  },
);
