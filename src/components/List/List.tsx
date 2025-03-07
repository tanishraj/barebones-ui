import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

// List component
const listStyles = clsx('list rounded-box bg-base-100 shadow-md');

type ListProps = ComponentPropsWithoutRef<'ul'>;

const ListComponent = forwardRef<HTMLUListElement, ListProps>(
  ({ className, children, ...props }, ref) => (
    <ul ref={ref} className={clsx(listStyles, className)} {...props}>
      {children}
    </ul>
  ),
);

// ListRow component
const listRowStyles = 'list-row';

type ListRowProps = ComponentPropsWithoutRef<'li'>;

const ListRowComponent = forwardRef<HTMLLIElement, ListRowProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={clsx(listRowStyles, className)} {...props}>
      {children}
    </li>
  ),
);

// ListCol component
const listColVariants = cva([''], {
  variants: {
    wrap: {
      true: 'list-col-wrap',
    },
    grow: {
      true: 'list-col-grow',
    },
  },
});

type ListColProps = VariantProps<typeof listColVariants> &
  ComponentPropsWithoutRef<'div'>;

const ListColComponent = forwardRef<HTMLDivElement, ListColProps>(
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

ListComponent.displayName = 'List';
ListRowComponent.displayName = 'ListRow';
ListColComponent.displayName = 'ListCol';

export const ListRow = ListRowComponent;
export const ListCol = ListColComponent;

// Create final exports with compound components
export const List = Object.assign(ListComponent, {
  Row: ListRowComponent,
  Col: ListColComponent,
});
