import { cva } from 'class-variance-authority';

export const cardStyles = cva('card', {
  variants: {
    variant: {
      default: 'bg-base-100',
      bordered: 'card-bordered',
      'full-image': 'image-full',
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
      default: '',
      compact: 'card-compact',
      normal: 'card-normal',
      side: 'card-side',
    },
    shadowSize: {
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
    size: 'normal',
  },
});
