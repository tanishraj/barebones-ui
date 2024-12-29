import { cva } from 'class-variance-authority';

export const modalStyles = cva('', {
  variants: {
    position: {
      top: 'modal-top',
      bottom: 'modal-bottom',
      middle: 'modal-middle',
    },
    open: {
      true: 'modal-open',
      false: '',
    },
    responsive: {
      true: 'modal-bottom sm:modal-middle',
      false: '',
    },
  },
  defaultVariants: {
    responsive: false,
  },
});
