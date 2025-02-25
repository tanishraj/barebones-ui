import { cva } from 'class-variance-authority';

export const cardVariants = cva('card', {
  variants: {
    variant: {
      default: 'bg-base-100',
      bordered: 'card-bordered',
      image: 'image-full',
    },
    size: {
      default: '',
      compact: 'card-compact',
      normal: 'card-normal',
      side: 'card-side',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
