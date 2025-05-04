import { cva } from 'class-variance-authority';

export const labelContainerStyles = cva('', {
  variants: {
    type: {
      input: 'input',
      select: 'select',
      float: 'floating-label',
    },
  },
});
