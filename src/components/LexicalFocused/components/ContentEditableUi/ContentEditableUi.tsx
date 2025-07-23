import { FC } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import { cn } from '@/utils';

type ContentEditableUiProps = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export const ContentEditableUi: FC<ContentEditableUiProps> = ({
  className,
  placeholder,
  placeholderClassName,
}): JSX.Element => {
  return (
    <ContentEditable
      className={cn(
        'border-0 text-base block relative outline-0 px-2 py-2 min-h-[150px]',
        className,
      )}
      aria-placeholder={placeholder}
      placeholder={
        <div
          className={cn(
            'text-base text-gray-400 overflow-hidden absolute text-ellipsis top-2 left-2 right-2 select-none whitespace-nowrap inline-block pointer-events-none',
            placeholderClassName,
          )}
        >
          {placeholder}
        </div>
      }
    />
  );
};
