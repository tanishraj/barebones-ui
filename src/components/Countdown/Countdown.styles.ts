import { cva } from 'class-variance-authority';

export const countdownStyles = cva('countdown', {
  variants: {
    size: {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-4xl',
      xl: 'text-6xl',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
