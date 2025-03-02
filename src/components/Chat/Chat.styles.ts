import { cva } from 'class-variance-authority';

export const chatStyles = cva('chat', {
  variants: {
    placement: {
      start: 'chat-start',
      end: 'chat-end',
    },
  },
  defaultVariants: {
    placement: 'start',
  },
});

export const chatBubbleStyles = cva('chat-bubble', {
  variants: {
    variant: {
      neutral: 'chat-bubble-neutral',
      primary: 'chat-bubble-primary',
      secondary: 'chat-bubble-secondary',
      accent: 'chat-bubble-accent',
      info: 'chat-bubble-info',
      success: 'chat-bubble-success',
      warning: 'chat-bubble-warning',
      error: 'chat-bubble-error',
    },
  },
});
