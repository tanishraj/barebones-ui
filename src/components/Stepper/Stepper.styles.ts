import { cva } from 'class-variance-authority';

export const stepsContainerStyles = cva(['steps'], {
  variants: {
    direction: {
      horizontal: '',
      vertical: 'steps-vertical',
    },
    responsive: {
      true: 'steps-vertical lg:steps-horizontal',
      false: '',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

export const stepItemStyles = cva(['step'], {
  variants: {
    variant: {
      primary: 'step-primary',
      secondary: 'step-secondary',
      accent: 'step-accent',
      info: 'step-info',
      success: 'step-success',
      warning: 'step-warning',
      error: 'step-error',
      neutral: 'step-neutral',
    },
  },
});
