import { cva } from 'class-variance-authority';

export const colorPickerStyles = cva('inline-flex', {
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
    size: 'md',
  },
});

export const inputStyles = cva(
  'cursor-pointer appearance-none rounded-sm transition-all duration-200',
  {
    variants: {
      size: {
        xs: 'h-4 w-4',
        sm: 'h-5 w-5',
        md: 'h-6 w-6',
        lg: 'h-7 w-7',
        xl: 'h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
