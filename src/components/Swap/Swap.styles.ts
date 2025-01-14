import { cva } from 'class-variance-authority';

export const swapStyles = cva('', {
  variants: {
    animationType: {
      rotate: 'swap-rotate',
      flip: 'swap-flip',
    },
    active: {
      true: 'swap-active',
      false: '',
    },
  },
  defaultVariants: {},
});
