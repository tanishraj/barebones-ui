import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

import { listColVariants } from './List.styles';
import { ListColVariants } from './types';

export type ListColProps = ListColVariants & ComponentPropsWithoutRef<'div'>;

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ wrap, grow, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(listColVariants({ wrap, grow }), className)}
      {...props}
    >
      {children}
    </div>
  ),
);
