import { cva } from 'class-variance-authority';

export const loaderStyles = cva('loading', {
  variants: {
    type: {
      spinner: 'loading-spinner',
      dots: 'loading-dots',
      ring: 'loading-ring',
      ball: 'loading-ball',
      bars: 'loading-bars',
      infinity: 'loading-infinity',
    },
    size: {
      xs: 'loading-xs',
      sm: 'loading-sm',
      md: 'loading-md',
      lg: 'loading-lg',
      xl: 'loading-xl',
    },
    variant: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      neutral: 'text-neutral',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
    },
  },
  defaultVariants: {
    type: 'spinner',
    size: 'md',
  },
});
