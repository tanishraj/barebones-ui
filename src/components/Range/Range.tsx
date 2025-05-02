import { VariantProps } from 'class-variance-authority';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '../../utils';
import { rangeStyles } from './Range.styles';

type RangeProps = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof rangeStyles> & {
    showLabels?: boolean;
  };

const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    {
      variant,
      size,
      showLabels = false,
      className,
      min = 0,
      max = 100,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const minNum = Number(min);
    const maxNum = Number(max);
    const stepNum = Number(step);
    const stepsCount = Math.floor((maxNum - minNum) / stepNum) + 1;

    const inputElement = (
      <input
        type='range'
        ref={ref}
        min={minNum}
        max={maxNum}
        step={stepNum}
        className={cn(rangeStyles({ variant, size }), className)}
        {...props}
      />
    );

    if (!showLabels) {
      return inputElement;
    }

    return (
      <div className='w-full max-w-xs'>
        {inputElement}
        <div className='flex justify-between px-2.5 mt-2 text-xs'>
          {Array.from({ length: stepsCount }).map((_, i) => (
            <span key={`marker-${i}`}>|</span>
          ))}
        </div>
        <div className='flex justify-between px-2.5 mt-2 text-xs'>
          {Array.from({ length: stepsCount }).map((_, i) => (
            <span key={`label-${i}`}>{i + 1}</span>
          ))}
        </div>
      </div>
    );
  },
);

Range.displayName = 'Range';

export default Range;
