import { cva } from 'class-variance-authority';

export const ContentEditableStyles = cva(
  'w-full min-h-20 outline-0 border border-base-300 rounded-lg p-2 text-base text-base-content bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:cursor-not-allowed disabled:opacity-50 dark:bg-base-200 dark:border-base-400 dark:text-base-content dark:focus:border-primary dark:focus:ring-primary/20',
);
