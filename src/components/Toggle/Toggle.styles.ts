import { cva } from 'class-variance-authority';

export const toggleStyles = cva(['toggle'], {
  variants: {
    size: {
      xs: 'toggle-xs',
      sm: 'toggle-sm',
      md: 'toggle-md',
      lg: 'toggle-lg',
      xl: 'toggle-xl',
    },
    variant: {
      primary: 'toggle-primary',
      secondary: 'toggle-secondary',
      accent: 'toggle-accent',
      neutral: 'toggle-neutral',
      info: 'toggle-info',
      success: 'toggle-success',
      warning: 'toggle-warning',
      error: 'toggle-error',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
