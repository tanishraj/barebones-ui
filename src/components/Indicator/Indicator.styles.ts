import { cva } from 'class-variance-authority';

export const indicatorStyles = cva('indicator', {
  variants: {},
  defaultVariants: {},
});

export const indicatorItemStyles = cva('indicator-item', {
  variants: {
    horizontal: {
      start: 'indicator-start',
      center: 'indicator-center',
      end: 'indicator-end',
    },
    vertical: {
      top: 'indicator-top',
      middle: 'indicator-middle',
      bottom: 'indicator-bottom',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    horizontal: 'end',
    vertical: 'top',
  },
});
