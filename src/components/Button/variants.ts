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
      dotted: 'btn-outline border-dotted',
      dashed: 'dashed btn-outline border-dashed',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
    iconPosition: {
      left: 'flex-row',
      right: 'flex-row-reverse',
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
