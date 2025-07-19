import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';

import { useAppSettings } from './context/SettingsContext';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { ContentEditableUi } from './ui/ContentEditable';
import ShortcutsPlugin from './plugins/ShortcutPlugin/ShortcutPlugin';
import { TableActionMenuPlugin } from './plugins/TableActionMenuPlugin';
import { TableCellResizerPlugin } from './plugins/TableCellResizer';
import { TableHoverActionsPlugin } from './plugins/TableHoverActionsPlugin';
import { TableOfContentsPlugin } from './plugins/TableOfContentsPlugin';
import { FloatingLinkEditorPlugin } from './plugins/FloatingLinkEditorPlugin';
import { ContentPlugin } from './plugins/ContentPlugin';
import { EquationsPlugin } from './plugins/EquationsPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';

export interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onContentUpdate?: (isContentUpdated: boolean) => void;
  onFormatUpdate?: (isFormatUpdated: boolean) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const {
    settings: {
      isRichText,
      listStrictIndent,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
      showTableOfContents,
      showTreeView,
    },
  } = useAppSettings();

  const [editor] = useLexicalComposerContext();
  const placeholder = isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

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
                  <div className='editor' ref={onRef}>
                    <ContentEditableUi placeholder={placeholder} />
                  </div>
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />

            <HistoryPlugin />
            <EquationsPlugin />
            <TablePlugin
              hasCellMerge={tableCellMerge}
              hasCellBackgroundColor={tableCellBackgroundColor}
              hasHorizontalScroll={tableHorizontalScroll}
            />
            <TableCellResizerPlugin />
            <ListPlugin hasStrictIndent={listStrictIndent} />
            <TabIndentationPlugin maxIndent={7} />
            {floatingAnchorElem && (
              <>
                <FloatingLinkEditorPlugin
                  anchorElem={floatingAnchorElem}
                  isLinkEditMode={isLinkEditMode}
                  setIsLinkEditMode={setIsLinkEditMode}
                />
                <TableActionMenuPlugin
                  anchorElem={floatingAnchorElem}
                  cellMerge={true}
                />
              </>
            )}
            {floatingAnchorElem && !isSmallWidthViewport && (
              <>
                <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
              </>
            )}
            <ContentPlugin value={value} onChange={onChange} />
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={
                <ContentEditableUi
                  placeholder={placeholder}
                  aria-placeholder={placeholder}
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
          </>
        )}
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
};
