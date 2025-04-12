import { VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { ComponentProps, forwardRef } from 'react';

import { tableStyles } from './Table.styles';

type TableProps = ComponentProps<'table'> &
  VariantProps<typeof tableStyles> & {};

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, size, pinRows, pinColumns, children, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={clsx(tableStyles({ size, pinRows, pinColumns }), className)}
        {...props}
      >
        {children}
      </table>
    );
  },
);

Table.displayName = 'Table';

// Table subcomponents
type TableHeadProps = ComponentProps<'thead'>;

const Head = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={clsx('[&>tr]:hover:bg-base-200', className)}
      {...props}
    >
      {children}
    </thead>
  ),
);
Head.displayName = 'Table.Head';

type TableBodyProps = ComponentProps<'tbody'>;

const Body = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={clsx('[&>tr:hover]:bg-base-200', className)}
      {...props}
    >
      {children}
    </tbody>
  ),
);
Body.displayName = 'Table.Body';

type TableRowProps = ComponentProps<'tr'> & {
  active?: boolean;
  hover?: boolean;
};

const Row = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, active, hover = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={clsx(
        {
          'bg-base-200': active,
          'hover:bg-base-200': hover,
        },
        className,
      )}
      {...props}
    />
  ),
);
Row.displayName = 'Table.Row';

type TableHeaderCellProps = ComponentProps<'th'> & {
  action?: boolean;
};

const HeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, action, ...props }, ref) => (
    <th
      ref={ref}
      className={clsx(
        'px-4 py-2 font-medium text-base-content bg-base-200',
        {
          'text-right pr-6': action,
        },
        className,
      )}
      {...props}
    />
  ),
);
HeaderCell.displayName = 'Table.HeaderCell';

type TableCellProps = ComponentProps<'td'> & {
  action?: boolean;
};

const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, action, ...props }, ref) => (
    <td
      ref={ref}
      className={clsx(
        'px-4 py-2',
        {
          'text-right pr-6': action,
        },
        className,
      )}
      {...props}
    />
  ),
);
Cell.displayName = 'Table.Cell';

// Assign subcomponents to Table
const TableComponent = Object.assign(Table, {
  Head,
  Body,
  Row,
  HeaderCell,
  Cell,
});

export { TableComponent as Table };
