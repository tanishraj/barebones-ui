import { cva } from 'class-variance-authority';

export const buttonStyles = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      neutral: 'btn-neutral',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      ghost: 'btn-ghost',
      link: 'btn-link',
    },
    outline: {
      solid: 'btn-outline',
      dotted: 'dotted btn-outline',
      dashed: 'dashed btn-outline',
      double: 'double btn-outline',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    iconPosition: {
      left: 'flex-row-reverse',
      right: 'flex-row',
    },
    disabled: {
      true: 'btn-disabled',
    },
  },
  defaultVariants: {
    size: 'md',
    iconPosition: 'left',
    disabled: false,
  },
});
