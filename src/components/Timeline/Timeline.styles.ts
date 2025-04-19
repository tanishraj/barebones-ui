import { cva } from 'class-variance-authority';

export const timelineStyles = cva('timeline', {
  variants: {
    direction: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal',
    },
  },
});

export const timelineItemStyles = cva('timeline-item', {
  variants: {
    direction: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal',
    },
  },
});
