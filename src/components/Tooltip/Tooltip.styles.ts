import { cva } from 'class-variance-authority';

export const tooltipStyles = cva('', {
  variants: {
    responsive: {
      true: 'lg:tooltip',
      false: 'tooltip',
    },
    variant: {
      neutral: 'tooltip-neutral',
      primary: 'tooltip-primary',
      secondary: 'tooltip-secondary',
      accent: 'tooltip-accent',
      info: 'tooltip-info',
      success: 'tooltip-success',
      warning: 'tooltip-warning',
      error: 'tooltip-error',
    },
    position: {
      top: 'tooltip-top',
      bottom: 'tooltip-bottom',
      left: 'tooltip-left',
      right: 'tooltip-right',
    },
    open: {
      true: 'tooltip-open',
    },
  },
  defaultVariants: {
    responsive: false,
  },
});
