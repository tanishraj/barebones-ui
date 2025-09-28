import React, { useState, useCallback } from 'react';
import { $getRoot, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { TableNode, TableRowNode, TableCellNode } from '@lexical/table';
import { CodeNode, CodeHighlightNode } from '@lexical/code';

import { cn } from '../../utils';
import { LexicalEditorProps } from './types';
import { editorTheme } from './config/theme';
import {
  editorContainerStyles,
  contentEditableStyles,
  editorContentStyles,
} from './styles/LexicalEditor.styles';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import EquationsPlugin from './plugins/EquationsPlugin';
import TablePlugin from './plugins/TablePlugin';
import TableActionMenuPlugin from './plugins/TableActionMenuPlugin';
import InlineCodeExitPlugin from './plugins/InlineCodeExitPlugin';
import ShortcutsPlugin from './plugins/ShortcutsPlugin';
import { EquationNode } from './nodes/EquationNode';
import { SourceNode } from './nodes/SourceNode';
import { ImageNode } from './nodes/ImageNode';
import SourcePlugin from './plugins/SourcePlugin';
import ImagePlugin, { DragDropPastePlugin } from './plugins/ImagePlugin';

const LexicalEditor: React.FC<LexicalEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  disabled = false,
  readOnly = false,
  className,
  showToolbar = true,
  minHeight = '150px',
  maxHeight = '500px',
  autoFocus = false,
  onBlur,
  onFocus,
  theme: customTheme,
  children,
  sources,
  sourceTooltipId = 'source-tooltip',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const initialConfig = {
    namespace: 'LexicalEditor',
    theme: { ...editorTheme, ...customTheme },
    onError: (error: Error) => {
      console.error('[LexicalEditor]:', error);
    },
    editorState: value,
    editable: !disabled && !readOnly,
    nodes: [
      HeadingNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      EquationNode,
      SourceNode,
      ImageNode,
      TableNode,
      TableRowNode,
      TableCellNode,
    ],
  };

  const handleChange = useCallback(
    (editorState: EditorState) => {
      if (onChange) {
        editorState.read(() => {
          const root = $getRoot();
          const content = root.getTextContent();
          onChange(content);
        });
      }
    },
    [onChange],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <div className={cn('w-full', className)}>
      <LexicalComposer initialConfig={initialConfig}>
        <div
          ref={setFloatingAnchorElem}
          className={cn(
            editorContainerStyles({
              focused: isFocused,
              disabled,
              readOnly,
            }),
          )}
        >
          {showToolbar && !readOnly && !disabled && <ToolbarPlugin />}

          <div
            className={cn(editorContentStyles)}
            style={{
              minHeight,
              maxHeight,
            }}
          >
            <RichTextPlugin
              contentEditable={
                <div className='flex flex-col min-h-full'>
                  <ContentEditable
                    className={contentEditableStyles}
                    aria-label='Editor'
                    aria-placeholder={placeholder}
                    placeholder={
                      <div className='editor-placeholder text-base-content/50 pointer-events-none absolute top-4 left-4 select-none'>
                        {placeholder}
                      </div>
                    }
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              }
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />

            <OnChangePlugin onChange={handleChange} />
            <HistoryPlugin />
            {autoFocus && <AutoFocusPlugin />}
            <ListPlugin />
            <TabIndentationPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ShortcutsPlugin />
            <InlineCodeExitPlugin />
            <EquationsPlugin />
            <TablePlugin />
            <TableActionMenuPlugin />
            <ImagePlugin />
            <DragDropPastePlugin />
            <SourcePlugin sources={sources} tooltipId={sourceTooltipId} />
            {floatingAnchorElem && (
              <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
            )}

            {children}
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};

export default LexicalEditor;
