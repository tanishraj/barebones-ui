import { cva } from 'class-variance-authority';

export const badgeStyles = cva('badge', {
  variants: {
    variant: {
      neutral: 'badge-neutral',
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      ghost: 'badge-ghost',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
    size: {
      xs: 'badge-xs',
      sm: 'badge-sm',
      md: 'badge-md',
      lg: 'badge-lg',
    },
    outline: {
      true: 'badge-outline',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
