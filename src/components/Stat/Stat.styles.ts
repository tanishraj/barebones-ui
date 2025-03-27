import { cva } from 'class-variance-authority';

export const statsStyles = cva('stats', {
  variants: {
    direction: {
      horizontal: 'stats-horizontal',
      vertical: 'stats-vertical',
    },
    shadow: {
      true: 'shadow',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    shadow: false,
  },
});
