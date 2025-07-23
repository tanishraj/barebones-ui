import { FC, useState } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { ContentEditableUi } from './components/ContentEditableUi';
import { EditorProps } from './types';
import ShortcutsPlugin from './plugins/ShortcutsPlugin/ShortcutsPlugin';

import { cn } from '@/utils';

const DEFAULT_PLACEHOLDER = 'Type something...';

export const Editor: FC<EditorProps> = ({
  placeholder,
  editorShellClassName,
  isEditable = true,
}) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  return (
    <div className={cn('editor-shell', editorShellClassName)}>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
        isEditable={isEditable}
      />
      <ShortcutsPlugin
        editor={activeEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <AutoFocusPlugin />
      <ClearEditorPlugin />
      <RichTextPlugin
        contentEditable={
          <div className='editor-scroller'>
            <div className='editor'>
              <ContentEditableUi
                className='content-editable'
                placeholder={placeholder || DEFAULT_PLACEHOLDER}
                placeholderClassName='content-editable-placeholder'
                aria-placeholder={placeholder || DEFAULT_PLACEHOLDER}
              />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </div>
  );
};
