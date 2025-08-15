import { FC } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import './ContentEditable.css';

type LexicalContentEditableProps = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export const ContentEditableUi: FC<LexicalContentEditableProps> = ({
  className,
  placeholder,
  placeholderClassName,
}): JSX.Element => {
  return (
    <ContentEditable
      className={className ?? 'ContentEditable__root'}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? 'ContentEditable__placeholder'}>
          {placeholder}
        </div>
      }
    />
  );
};
