import { FC, useState } from 'react';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';

import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { TableCellResizerPlugin } from './plugins/TableCellResizer';
import { EquationsPlugin } from './plugins/EquationsPlugin';
import { LexicalAutoLinkPlugin } from './plugins/AutoLinkPlugin';
import { TableHoverActionsPlugin } from './plugins/TableHoverActionsPlugin';
import { FloatingLinkEditorPlugin } from './plugins/FloatingLinkEditorPlugin';
import { DraggableBlockPlugin } from './plugins/DraggableBlockPlugin';
import { EditablePlugin } from './plugins/EditablePlugin';
import { LinkPlugin } from './plugins/LinkPlugin';
import { TableActionMenuPlugin } from './plugins/TableActionMenuPlugin';
import { ContentEditableUi } from './components/ContentEditableUi';
import { SourceTooltips } from './components/SourceTooltips';
import ShortcutsPlugin from './plugins/ShortcutsPlugin/ShortcutsPlugin';
import { useAppSettings } from './context/SettingsContext';
import { ContentPlugin } from './plugins/ContentPlugin';
import { EditorProps } from './types';

import { cn } from '@/utils';

const DEFAULT_PLACEHOLDER = 'Type something...';

export const Editor: FC<EditorProps> = ({
  markdown,
  onChange,
  onChangeLogs,
  placeholder,
  editorShellClassName,
  isEditable = false,
}) => {
  const {
    settings: {
      listStrictIndent,
      tableCellMerge,
      tableCellBackgroundColor,
      tableHorizontalScroll,
      hasLinkAttributes,
      hasDraggableBlocks,
    },
  } = useAppSettings();

  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const contentEditableClassName = cn('content-editable', {
    'pl-10': hasDraggableBlocks && isEditable,
  });
  const placeholderClassName = cn('content-editable-placeholder', {
    'left-10': hasDraggableBlocks && isEditable,
  });

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

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
      <LexicalAutoLinkPlugin />
      <RichTextPlugin
        contentEditable={
          <div className='editor-scroller'>
            <div className='editor' ref={onRef}>
              <ContentEditableUi
                className={contentEditableClassName}
                placeholder={placeholder || DEFAULT_PLACEHOLDER}
                placeholderClassName={placeholderClassName}
                aria-placeholder={placeholder || DEFAULT_PLACEHOLDER}
              />
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
      <LinkPlugin hasLinkAttributes={hasLinkAttributes} />
      <ClickableLinkPlugin disabled={isEditable} />
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
      {floatingAnchorElem && hasDraggableBlocks && (
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
      )}
      {floatingAnchorElem && (
        <TableHoverActionsPlugin anchorElem={floatingAnchorElem} />
      )}
      <EditablePlugin isEditable={isEditable} />
      <ContentPlugin
        markdown={markdown}
        onChange={onChange}
        onChangeLogs={onChangeLogs}
      />
      <SourceTooltips />
    </div>
  );
};
