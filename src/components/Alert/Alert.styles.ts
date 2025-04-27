import { cva } from 'class-variance-authority';

export const alertStyles = cva('alert', {
  variants: {
    variant: {
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning',
      error: 'alert-error',
    },
    borderStyle: {
      none: '',
      outline: 'alert-outline',
      dash: 'alert-dash',
    },
    softColor: {
      true: 'alert-soft',
      false: '',
    },
    direction: {
      vertical: 'alert-vertical',
      horizontal: 'alert-horizontal',
    },
    responsive: {
      true: 'alert-vertical sm:alert-horizontal',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    borderStyle: 'none',
  },
});
