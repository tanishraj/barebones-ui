import { cva } from 'class-variance-authority';

export const carouselStyles = cva('carousel', {
  variants: {
    snapPosition: {
      start: 'carousel-start',
      center: 'carousel-center',
      end: 'carousel-end',
    },
    verticalScroll: {
      true: 'carousel-vertical',
      false: '',
    },
  },
  defaultVariants: {},
});
