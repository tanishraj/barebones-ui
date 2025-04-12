import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';

import { statusStyles } from './Status.styles';
import { cn } from '../../utils';

export interface StatusProps extends VariantProps<typeof statusStyles> {
  className?: HTMLDivElement['className'];
}

export const Status: FC<StatusProps> = ({
  variant,
  size,
  animate,
  className,
}) => {
  const statusAnimateClassName = statusStyles({ animate });
  const statusClassName = cn('status', statusStyles({ variant, size }));

  return (
    <>
      {animate === 'ping' ? (
        <div className='inline-grid *:[grid-area:1/1]'>
          <div className={cn(statusClassName, statusAnimateClassName)}></div>
          <div className={cn(statusClassName)}></div>
        </div>
      ) : (
        <div
          className={cn(statusClassName, statusAnimateClassName, className)}
        ></div>
      )}
    </>
  );
};
