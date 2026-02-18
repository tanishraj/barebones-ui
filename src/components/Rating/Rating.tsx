import { type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef, useId } from 'react';

import { ratingContainerStyles, ratingItemStyles } from './Rating.styles';

export interface RatingProps
  extends
    VariantProps<typeof ratingContainerStyles>,
    VariantProps<typeof ratingItemStyles>,
    Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  color?: string;
  maskType?: 'star' | 'star-2' | 'heart';
  clearable?: boolean;
  name?: string;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      onChange,
      max = 5,
      readOnly = false,
      color = 'bg-orange-400',
      maskType = 'star',
      size = 'md',
      half = false,
      clearable = false,
      name,
      className,
      ...props
    },
    ref,
  ) => {
    const uniqueId = useId();
    const ratingName = name || `rating-${uniqueId}`;

    const handleChange = (newValue: number) => {
      if (!readOnly && onChange) {
        if (clearable && value === newValue) {
          onChange(0);
        } else {
          onChange(newValue);
        }
      }
    };

    const containerClasses = ratingContainerStyles({ size, half, className });

    const items = [];
    const totalItems = half ? max * 2 : max;

    if (clearable && !readOnly) {
      items.push(
        <input
          key='clear'
          type='radio'
          name={ratingName}
          className='rating-hidden'
          aria-label='Clear'
          checked={value === 0}
          onChange={() => handleChange(0)}
        />,
      );
    }

    for (let i = 0; i < totalItems; i++) {
      const itemValue = half ? (i + 1) * 0.5 : i + 1;
      const isChecked = value >= itemValue;
      const isHalf1 = half && i % 2 === 0;
      const isHalf2 = half && i % 2 === 1;

      if (readOnly) {
        items.push(
          <div
            key={i}
            className={clsx(
              ratingItemStyles({ maskType, isHalf1, isHalf2 }),
              isChecked ? color : `${color} bg-opacity-20`,
            )}
            aria-label={`${itemValue} star`}
            aria-current={isChecked ? 'true' : undefined}
          />,
        );
      } else {
        items.push(
          <input
            key={i}
            type='radio'
            name={ratingName}
            className={clsx(
              ratingItemStyles({ maskType, isHalf1, isHalf2 }),
              color,
            )}
            aria-label={`${itemValue} star`}
            value={itemValue}
            checked={value === itemValue}
            onChange={() => handleChange(itemValue)}
          />,
        );
      }
    }

    return (
      <div ref={ref} className={containerClasses} role='group' {...props}>
        {items}
      </div>
    );
  },
);
