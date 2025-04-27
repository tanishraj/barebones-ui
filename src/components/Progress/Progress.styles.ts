import { cva } from 'class-variance-authority';

export const progressStyles = cva('progress', {
  variants: {
    variant: {
      primary: 'progress-primary',
      secondary: 'progress-secondary',
      accent: 'progress-accent',
      neutral: 'progress-neutral',
      info: 'progress-info',
      success: 'progress-success',
      warning: 'progress-warning',
      error: 'progress-error',
    },
  },
});
