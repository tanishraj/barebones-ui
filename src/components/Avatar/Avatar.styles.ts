import { cva } from 'class-variance-authority';

export const sizeAndShapeStyles = cva('bg-neutral', {
  variants: {
    size: {
      xs: 'h-8 w-8',
      sm: 'h-12 w-12',
      md: 'h-16 w-16',
      lg: 'h-24 w-24',
    },
    shape: {
      squircle: 'mask mask-squircle',
      hexagon: 'mask mask-hexagon',
      triangle: 'mask mask-triangle',
      circle: 'rounded-full',
      square: 'rounded',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});

export const textStyles = cva('text-neutral-content', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-md',
      md: 'text-xl',
      lg: 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const shapeStyles = cva('', {
  variants: {
    shape: {
      squircle: 'mask mask-squircle',
      hexagon: 'mask mask-hexagon',
      triangle: 'mask mask-triangle',
      circle: 'rounded-full',
      square: 'rounded',
    },
  },
  defaultVariants: {
    shape: 'circle',
  },
});

export const statusStyles = cva('', {
  variants: {
    status: {
      online: 'online',
      offline: 'offline',
      none: '',
    },
  },
  defaultVariants: {
    status: 'none',
  },
});
