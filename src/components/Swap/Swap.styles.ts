import { cva } from 'class-variance-authority';

export const swapStyles = cva('', {
  variants: {
    animationType: {
      rotate: 'swap-rotate',
      flip: 'swap-flip',
      fade: '',
    },
    isActive: {
      true: 'swap-active',
      false: '',
    },
  },
  defaultVariants: {
    animationType: 'fade',
    isActive: false,
  },
});
