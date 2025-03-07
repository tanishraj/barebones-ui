import { cva } from 'class-variance-authority';
import clsx from 'clsx';

export const listStyles = clsx('list rounded-box bg-base-100 shadow-md');

export const listRowStyles = 'list-row';

export const listColVariants = cva([''], {
  variants: {
    wrap: {
      true: 'list-col-wrap',
    },
    grow: {
      true: 'list-col-grow',
    },
  },
});
