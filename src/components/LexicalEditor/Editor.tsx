import { useState } from 'react';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import { useAppSettings } from './context/SettingsContext';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { ContentEditableUi } from './ui/ContentEditable';
import ShortcutsPlugin from './plugins/ShortcutPlugin/ShortcutPlugin';

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
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  return (
    <>
      {isRichText && (
        <ToolbarPlugin
          editor={editor}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
        />
      )}
      {isRichText && (
        <ShortcutsPlugin
          editor={activeEditor}
          setIsLinkEditMode={setIsLinkEditMode}
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
            <TabIndentationPlugin maxIndent={7} />
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
