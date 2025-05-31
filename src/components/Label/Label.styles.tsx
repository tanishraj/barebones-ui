import { cva } from 'class-variance-authority';

export const labelContainerStyles = cva('', {
  variants: {
    type: {
      input: 'input',
      select: 'select',
      float: 'floating-label',
    },
  },
});

export const labelStyles = cva('', {
  variants: {
    size: {
      xs: '!text-xs',
      sm: '!text-sm',
      md: '!text-base',
      lg: '!text-lg',
      xl: '!text-xl',
    },
  },
});
