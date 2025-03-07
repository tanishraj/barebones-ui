import { cva } from 'class-variance-authority';

export const cardStyles = cva('card', {
  variants: {
    variant: {
      default: 'bg-base-200',
      bordered: 'card-border',
      dashed: 'card-dash',
      glass: 'glass',
      primary: 'bg-primary text-primary-content',
      secondary: 'bg-secondary text-secondary-content',
      neutral: 'bg-neutral text-neutral-content',
      accent: 'bg-accent text-accent-content',
      info: 'bg-info text-info-content',
      success: 'bg-success text-success-content',
      warning: 'bg-warning text-warning-content',
      error: 'bg-error text-error-content',
    },
    size: {
      xs: 'card-xs',
      sm: 'card-sm',
      md: 'card-md',
      lg: 'card-lg',
      xl: 'card-xl',
    },
    layout: {
      default: '',
      full: 'image-full',
      side: 'card-side',
    },
    shadow: {
      none: '',
      xs: 'shadow-xs',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    layout: 'default',
    size: 'lg',
  },
});
