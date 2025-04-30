import { cva } from 'class-variance-authority';

export const skeletonVariants = cva('skeleton', {
  variants: {
    variant: {
      circle: 'rounded-full',
      rectangle: '',
      text: 'h-4',
    },
  },
  defaultVariants: {
    variant: 'rectangle',
  },
});
