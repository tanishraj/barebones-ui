import { cva } from 'class-variance-authority';

export const EditorContainerStyles = cva(['relative w-full']);

export const PlaceholderStyles = cva([
  'absolute top-0 left-0 pointer-events-none',
  'py-2 px-3 text-base text-base-content/50 leading-[25px]',
]);

export const ContentEditableStyles = cva([
  'w-full min-h-40 outline-0 border border-base-300',
  'rounded-lg py-2 px-3 text-base text-base-content',
]);
