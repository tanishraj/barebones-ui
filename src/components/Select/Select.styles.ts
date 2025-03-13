import { cva } from 'class-variance-authority';

export const selectStyles = cva('select', {
  variants: {
    variant: {
      primary: 'select-primary',
      secondary: 'select-secondary',
      accent: 'select-accent',
      info: 'select-info',
      success: 'select-success',
      warning: 'select-warning',
      error: 'select-error',
      ghost: 'select-ghost',
    },
    size: {
      xs: 'select-xs',
      sm: 'select-sm',
      md: 'select-md',
      lg: 'select-lg',
      xl: 'select-xl',
    },
    disabled: {
      true: 'select-disabled',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
