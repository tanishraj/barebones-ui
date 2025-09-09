import { cva } from 'class-variance-authority';

export const inputStyles = cva('input', {
  variants: {
    size: {
      xs: 'input-xs',
      sm: 'input-sm',
      md: 'input-md',
      lg: 'input-lg',
      xl: 'input-xl',
    },
    variant: {
      primary: 'input-primary',
      secondary: 'input-secondary',
      accent: 'input-accent',
      neutral: 'input-neutral',
      info: 'input-info',
      success: 'input-success',
      warning: 'input-warning',
      error: 'input-error',
      ghost: 'input-ghost',
    },
    bordered: {
      true: 'input-bordered',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    bordered: true,
  },
});