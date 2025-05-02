import { cva } from 'class-variance-authority';

export const rangeStyles = cva('range', {
  variants: {
    variant: {
      neutral: 'range-neutral',
      primary: 'range-primary',
      secondary: 'range-secondary',
      accent: 'range-accent',
      success: 'range-success',
      warning: 'range-warning',
      info: 'range-info',
      error: 'range-error',
    },
    size: {
      xs: 'range-xs',
      sm: 'range-sm',
      md: 'range-md',
      lg: 'range-lg',
      xl: 'range-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
