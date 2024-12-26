import { cva } from 'class-variance-authority';

export const modalStyles = cva('', {
  variants: {
    size: {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-2xl',
      full: 'w-full',
    },
    responsive: {
      true: 'modal-bottom sm:modal-middle',
      false: '',
    },
  },
  defaultVariants: {
    size: 'medium',
    responsive: false,
  },
});
