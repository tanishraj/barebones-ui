import { cva } from 'class-variance-authority';

export const statusStyles = cva('status', {
  variants: {
    variant: {
      neutral: 'status-neutral',
      primary: 'status-primary',
      secondary: 'status-secondary',
      accent: 'status-accent',
      info: 'status-info',
      success: 'status-success',
      warning: 'status-warning',
      error: 'status-error',
    },
    size: {
      xs: 'status-xs',
      sm: 'status-sm',
      md: 'status-md',
      lg: 'status-lg',
      xl: 'status-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'xl',
  },
});
