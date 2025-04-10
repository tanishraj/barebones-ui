import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';

import { statusStyles } from './Status.styles';
import { cn } from '../../utils';

export interface StatusProps extends VariantProps<typeof statusStyles> {
  className?: HTMLDivElement['className'];
}

export const Status: FC<StatusProps> = ({ variant, size, className }) => {
  const statusClassName = cn(statusStyles({ variant, size }), className);

  return <div aria-label='status' className={statusClassName}></div>;
};
