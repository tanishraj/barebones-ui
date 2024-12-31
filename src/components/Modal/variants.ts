import { cva } from 'class-variance-authority';

export const modalStyles = cva('', {
  variants: {
    size: {
      sm: 'modal-sm',
      md: 'w-11/12 max-w-5xl',
      lg: 'modal-lg',
      full: 'modal-xl',
    },
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
