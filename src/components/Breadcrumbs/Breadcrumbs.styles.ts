import { cva } from 'class-variance-authority';

export const breadcrumbVariants = cva('breadcrumbs', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
