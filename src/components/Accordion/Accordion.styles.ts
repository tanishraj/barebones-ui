import { cva } from 'class-variance-authority';

export const accordionContainerStyles = cva('join join-vertical w-full', {
  variants: {},
});

export const accordionStyles = cva('collapse', {
  variants: {
    bordered: {
      true: 'border border-base-200',
    },
    iconStyle: {
      plus: 'collapse-plus',
      chevron: 'collapse-arrow',
    },
  },
  defaultVariants: {
    bordered: false,
    iconStyle: 'chevron',
  },
});
