import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

import { ListRow as ListRowComponent } from './ListRow';
import { ListCol as ListColComponent } from './ListCol';
import { listStyles } from './List.styles';

export type ListProps = ComponentPropsWithoutRef<'ul'>;

const ListComponent = forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => (
    <ul ref={ref} className={clsx(listStyles, className)} {...props}>
      {children}
    </ul>
  ),
);

ListComponent.displayName = 'List';
ListRowComponent.displayName = 'ListRow';
ListColComponent.displayName = 'ListCol';

export const ListRow = ListRowComponent;
export const ListCol = ListColComponent;

type ListCompoundComponent = typeof ListComponent & {
  Row: typeof ListRowComponent;
  Col: typeof ListColComponent;
};

const List = ListComponent as ListCompoundComponent;
List.Row = ListRowComponent;
List.Col = ListColComponent;

export { List };
