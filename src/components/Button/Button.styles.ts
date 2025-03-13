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
      dashed: 'btn-dash',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      xl: 'btn-xl',
    },
    layout: {
      wide: 'btn-wide',
      block: 'btn-block',
      square: 'btn-square',
      circle: 'btn-circle',
    },
    iconPosition: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
    disabled: {
      true: 'btn-disabled',
    },
    active: {
      true: 'btn-active',
    },
    softColor: {
      true: 'btn-soft',
    },
  },
  defaultVariants: {
    size: 'md',
    iconPosition: 'left',
    disabled: false,
    active: false,
    softColor: false,
  },
});
