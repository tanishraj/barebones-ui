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

export const accordionStyles = cva('collapse', {
  variants: {
    bordered: {
      true: 'border border-base-200',
      false: 'bg-base-200',
    },
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
    bordered: false,
    iconStyle: 'chevron',
  },
});
