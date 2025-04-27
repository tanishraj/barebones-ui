import { VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

import { progressStyles } from './Progress.styles';

type ProgressProps = HTMLAttributes<HTMLProgressElement> &
  VariantProps<typeof progressStyles> & {
    value?: number;
    max?: number;
    indeterminate?: boolean;
  };

export const Progress = ({
  value,
  max = 100,
  variant,
  indeterminate = false,
  className,
  ...props
}: ProgressProps) => {
  return (
    <progress
      className={clsx(progressStyles({ variant }), className)}
      value={indeterminate ? undefined : value}
      max={indeterminate ? undefined : max}
      {...props}
    />
  );
};
