import { type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { forwardRef, useEffect, useRef } from 'react';

import { toggleStyles } from './Toggle.styles';

type ToggleVariantProps = VariantProps<typeof toggleStyles>;

export interface ToggleProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'variant'>,
    ToggleVariantProps {
  labelClassName?: string;
  indeterminate?: boolean;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size,
      variant,
      className,
      children,
      labelClassName,
      indeterminate,
      ...props
    },
    forwardedRef,
  ) => {
    const inputClasses = toggleStyles({ size, variant, className });
    const internalRef = useRef<HTMLInputElement>(null);
    const ref =
      (forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (ref.current && indeterminate !== undefined) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    if (children) {
      return (
        <label className={clsx('toggle', labelClassName)}>
          <input
            type='checkbox'
            className={inputClasses}
            ref={ref}
            {...props}
          />
          {children}
        </label>
      );
    }

    return (
      <input type='checkbox' className={inputClasses} ref={ref} {...props} />
    );
  },
);

Toggle.displayName = 'Toggle';

export default Toggle;
