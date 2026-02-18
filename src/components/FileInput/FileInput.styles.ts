import { cva } from 'class-variance-authority';

export const fileInputStyles = cva('file-input', {
  variants: {
    size: {
      xs: 'file-input-xs',
      sm: 'file-input-sm',
      md: 'file-input-md',
      lg: 'file-input-lg',
      xl: 'file-input-xl',
    },
    variant: {
      primary: 'file-input-primary',
      secondary: 'file-input-secondary',
      accent: 'file-input-accent',
      neutral: 'file-input-neutral',
      info: 'file-input-info',
      success: 'file-input-success',
      warning: 'file-input-warning',
      error: 'file-input-error',
      ghost: 'file-input-ghost',
    },
    bordered: {
      true: 'file-input-bordered',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    bordered: true,
  },
});
