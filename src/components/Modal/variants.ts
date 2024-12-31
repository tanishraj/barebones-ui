import { cva } from 'class-variance-authority';

export const modalStyles = cva('', {
  variants: {
    position: {
      top: 'modal-top',
      bottom: 'modal-bottom',
      center: 'modal-middle',
    },
    isOpen: {
      true: 'modal-open',
      false: '',
    },
    isResponsive: {
      true: 'modal-bottom sm:modal-middle',
      false: '',
    },
  },
  defaultVariants: {
    isResponsive: false,
  },
});
