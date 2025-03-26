import { cva } from 'class-variance-authority';

export const statTitleStyles = cva('stat-title', {
  variants: {
    variant: {
      primary: 'text-primary-content',
      secondary: 'text-secondary-content',
      accent: 'text-accent-content',
      info: 'text-info-content',
      success: 'text-success-content',
      warning: 'text-warning-content',
      error: ' text-error-content',
      neutral: 'text-neutral-content',
    },
  },
});

export const statsStyles = cva('stats', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-content',
      secondary: 'bg-secondary text-secondary-content',
      accent: 'bg-accent text-accent-content',
      info: 'bg-info text-info-content',
      success: 'bg-success text-success-content',
      warning: 'bg-warning text-warning-content',
      error: 'bg-error  text-error-content',
      neutral: 'bg-neutral text-neutral-content',
    },
    direction: {
      horizontal: 'stats-horizontal',
      vertical: 'stats-vertical',
    },
    shadow: {
      true: 'shadow',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    shadow: false,
  },
});
