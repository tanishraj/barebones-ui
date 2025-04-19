import { cva } from 'class-variance-authority';

export const timelineStyles = cva('timeline', {
  variants: {
    direction: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal',
    },
  },
});

export const timelineContentStyles = cva('', {
  variants: {
    contentLayout: {
      compact: 'timeline-compact',
      box: 'timeline-box',
    },
    startContentLayout: {
      compact: 'timeline-start-compact',
      box: 'timeline-box',
    },
    endContentLayout: {
      compact: 'timeline-end-compact',
      box: 'timeline-box',
    },
  },
});
