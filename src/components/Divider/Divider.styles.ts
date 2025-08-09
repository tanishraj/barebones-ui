import { cva } from 'class-variance-authority';

export const dividerStyles = cva('divider', {
  variants: {
    orientation: {
      horizontal: 'divider-horizontal',
      vertical: '',
    },
    variant: {
      default: '',
      neutral: 'divider-neutral',
      primary: 'divider-primary',
      secondary: 'divider-secondary',
      accent: 'divider-accent',
      success: 'divider-success',
      warning: 'divider-warning',
      info: 'divider-info',
      error: 'divider-error',
    },
    position: {
      center: '',
      start: 'divider-start',
      end: 'divider-end',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    variant: 'default',
    position: 'center',
  },
});
