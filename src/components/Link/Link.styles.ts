import { cva } from 'class-variance-authority';

export const linkVariants = cva('link', {
  variants: {
    variant: {
      default: '',
      primary: 'link-primary',
      secondary: 'link-secondary',
      accent: 'link-accent',
      neutral: 'link-neutral',
      success: 'link-success',
      info: 'link-info',
      warning: 'link-warning',
      error: 'link-error',
    },
    hoverUnderline: {
      true: 'link-hover',
    },
  },
  defaultVariants: {
    variant: 'default',
    hoverUnderline: false,
  },
});
