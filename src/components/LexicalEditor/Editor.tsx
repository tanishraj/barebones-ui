import { useState } from 'react';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';

import { useAppSettings } from './context/SettingsContext';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { ContentEditableUi } from './ui/ContentEditable';

export const Editor = () => {
  const {
    settings: { isRichText, listStrictIndent },
  } = useAppSettings();

  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  const placeholder = isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const [activeEditor, setActiveEditor] = useState(editor);

  return (
    <>
      {isRichText && (
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
        />
      )}
      <div className={`editor-container ${!isRichText ? 'plain-text' : ''}`}>
        {isRichText ? (
          <>
            <RichTextPlugin
              contentEditable={
                <div className='editor-scroller'>
                  <div className='editor'>
                    <ContentEditableUi placeholder={placeholder} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <ListPlugin hasStrictIndent={listStrictIndent} />
          </>
        ) : (
          <PlainTextPlugin
            contentEditable={
              <ContentEditableUi
                placeholder={placeholder}
                aria-placeholder={placeholder}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        )}
      </div>
    </>
  );
};
