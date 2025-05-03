import { cva } from 'class-variance-authority';

export const checkboxStyles = cva('checkbox', {
  variants: {
    size: {
      xs: 'checkbox-xs',
      sm: 'checkbox-sm',
      md: 'checkbox-md',
      lg: 'checkbox-lg',
      xl: 'checkbox-xl',
    },
    variant: {
      primary: 'checkbox-primary',
      secondary: 'checkbox-secondary',
      accent: 'checkbox-accent',
      neutral: 'checkbox-neutral',
      info: 'checkbox-info',
      success: 'checkbox-success',
      warning: 'checkbox-warning',
      error: 'checkbox-error',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
