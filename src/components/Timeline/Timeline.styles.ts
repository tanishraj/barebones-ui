import { cva } from 'class-variance-authority';

export const timelineOrientationStyles = cva('timeline', {
  variants: {
    orientation: {
      vertical: 'timeline-vertical',
      horizontal: 'timeline-horizontal',
    },
  },
});

export const timelineContentAlignmentStyles = cva('', {
  variants: {
    contentAlign: {
      compact: 'timeline-compact',
      spacious: 'timeline-box',
    },
    startContentAlign: {
      compact: 'timeline-start-compact',
      spacious: 'timeline-box',
    },
    endContentAlign: {
      compact: 'timeline-end-compact',
      spacious: 'timeline-box',
    },
  },
});

export const timelineConnectorStyles = cva('', {
  variants: {
    connectorColor: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      info: 'bg-info',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
      neutral: 'bg-neutral',
    },
  },
});

export const timelineMarkerStyles = cva('', {
  variants: {
    markerColor: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      neutral: 'text-neutral',
    },
  },
});
