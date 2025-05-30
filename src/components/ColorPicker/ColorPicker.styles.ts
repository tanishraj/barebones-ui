import { cva } from 'class-variance-authority';

export const colorPickerStyles = cva(
  'flex items-center gap-3 transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: false,
    },
  },
);

export const inputStyles = cva(
  'cursor-pointer rounded border border-gray-300 bg-white transition-all',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
