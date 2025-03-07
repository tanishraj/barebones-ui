import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

import { listRowStyles } from './List.styles';

export type ListRowProps = ComponentPropsWithoutRef<'li'>;

export const ListRow = forwardRef<HTMLLIElement, ListRowProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={clsx(listRowStyles, className)} {...props}>
      {children}
    </li>
  ),
);
