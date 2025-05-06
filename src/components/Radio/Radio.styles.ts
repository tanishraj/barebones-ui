import { cva } from 'class-variance-authority';

export const radioStyles = cva('radio', {
  variants: {
    size: {
      xs: 'radio-xs',
      sm: 'radio-sm',
      md: 'radio-md',
      lg: 'radio-lg',
      xl: 'radio-xl',
    },
    variant: {
      neutral: 'radio-neutral',
      primary: 'radio-primary',
      secondary: 'radio-secondary',
      accent: 'radio-accent',
      success: 'radio-success',
      warning: 'radio-warning',
      info: 'radio-info',
      error: 'radio-error',
    },
    disabled: {
      true: 'disabled cursor-not-allowed opacity-50',
    },
  },
});
