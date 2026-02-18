import React, { useId } from 'react';
import { type VariantProps } from 'class-variance-authority';

import { colorPickerStyles, inputStyles } from './ColorPicker.styles';
import { Label, LabelPosition } from '../Label';
import { cn } from '../../utils';

export interface ColorPickerProps
  extends
    VariantProps<typeof colorPickerStyles>,
    VariantProps<typeof inputStyles>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
  labelPosition?: LabelPosition;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    { size, label, value, labelPosition, onChange, className, ...props },
    ref,
  ) => {
    const id = useId();
    const defaultLabelPosition: LabelPosition = labelPosition || 'left';
    const inputClassName = cn(inputStyles({ size }), 'color-input');
    const labelClassName = '!me-1';
    const colorPickerClassName = colorPickerStyles({
      size,
      className,
    });

    return (
      <div className={colorPickerClassName}>
        {label ? (
          <Label
            text={label}
            position={defaultLabelPosition}
            htmlFor={id}
            size={size}
            className={labelClassName}
          >
            <input
              {...props}
              ref={ref}
              id={id}
              type='color'
              value={value}
              onChange={e => onChange(e.target.value)}
              className={inputClassName}
            />
          </Label>
        ) : (
          <input
            {...props}
            ref={ref}
            id={id}
            type='color'
            value={value}
            onChange={e => onChange(e.target.value)}
            className={inputClassName}
          />
        )}
      </div>
    );
  },
);
