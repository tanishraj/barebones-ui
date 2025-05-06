import { cva } from 'class-variance-authority';

export const ratingContainerStyles = cva('rating', {
  variants: {
    size: {
      xs: 'rating-xs',
      sm: 'rating-sm',
      md: 'rating-md',
      lg: 'rating-lg',
      xl: 'rating-xl',
    },
    half: {
      true: 'rating-half',
    },
  },
});

export const ratingItemStyles = cva(['mask'], {
  variants: {
    maskType: {
      star: 'mask-star',
      'star-2': 'mask-star-2',
      heart: 'mask-heart',
    },
    isHalf1: {
      true: 'mask-half-1',
    },
    isHalf2: {
      true: 'mask-half-2',
    },
  },
});
