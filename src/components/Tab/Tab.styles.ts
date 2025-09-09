import { cva } from 'class-variance-authority';

export const tabsStyles = cva('tabs', {
  variants: {
    variant: {
      default: '',
      boxed: 'tabs-boxed',
      bordered: 'tabs-bordered',
      lifted: 'tabs-lifted',
    },
    size: {
      xs: 'tabs-xs',
      sm: 'tabs-sm',
      md: 'tabs-md',
      lg: 'tabs-lg',
      xl: 'tabs-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const tabStyles = cva('tab', {
  variants: {
    active: {
      true: 'tab-active',
      false: '',
    },
    disabled: {
      true: 'tab-disabled',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
});

export const tabContentStyles = cva('tab-content', {
  variants: {
    visible: {
      true: 'block',
      false: 'hidden',
    },
  },
  defaultVariants: {
    visible: false,
  },
});