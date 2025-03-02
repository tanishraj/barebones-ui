import { cva } from 'class-variance-authority';

export const accordionContainerStyles = cva('', {
  variants: {
    merged: {
      true: 'join join-vertical w-full',
      false: 'flex flex-col gap-2',
    },
  },
});

export const titleStyles = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const bgStyles = cva('bg-base-200', {
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
  },
  defaultVariants: {},
});

export const borderStyles = cva('', {
  variants: {
    variant: {
      primary: 'border-primary text-primary',
      secondary: 'border-secondary text-secondary',
      accent: 'border-accent text-accent',
      info: 'border-info text-info',
      success: 'border-success text-success',
      warning: 'border-warning text-warning',
      error: 'border-error text-error',
      neutral: 'border-neutral text-neutral',
    },
    bordered: {
      true: 'border',
      false: '',
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const accordionStyles = cva('collapse', {
  variants: {
    iconStyle: {
      plus: 'collapse-plus',
      chevron: 'collapse-arrow',
    },
    merged: {
      true: 'join-item',
      false: '',
    },
  },
  defaultVariants: {
    iconStyle: 'chevron',
  },
});
