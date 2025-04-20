import { cva } from 'class-variance-authority';

export const timelineStyles = cva('timeline', {
  variants: {
    direction: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal',
    },
  },
});

export const timelineContentStyles = cva('', {
  variants: {
    contentLayout: {
      compact: 'timeline-compact',
      box: 'timeline-box',
    },
    startContentLayout: {
      compact: 'timeline-start-compact',
      box: 'timeline-box',
    },
    endContentLayout: {
      compact: 'timeline-end-compact',
      box: 'timeline-box',
    },
  },
});

export const timelineBorderStyles = cva('', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      neutral: 'bg-neutral',
    },
    completedVariant: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      neutral: 'bg-neutral',
    },
  },
});

export const timelineIconStyles = cva('', {
  variants: {
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      neutral: 'text-neutral',
    },
    completedVariant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      neutral: 'text-neutral',
    },
  },
});
