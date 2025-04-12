import { cva } from 'class-variance-authority';

export const tableStyles = cva('table', {
  variants: {
    size: {
      xs: 'table-xs',
      sm: 'table-sm',
      md: 'table-md',
      lg: 'table-lg',
      xl: 'table-xl',
    },
    pinRows: {
      true: 'table-pin-rows',
    },
    pinColumns: {
      true: 'table-pin-cols',
    },
    zebra: {
      true: 'table-zebra',
    },
  },
});
