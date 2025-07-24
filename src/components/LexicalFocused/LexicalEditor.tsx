import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor } from './Editor';
import { ToolbarContext } from './context/ToolbarContext';
import { EditorNodes } from './nodes';
import { EditorTheme } from './themes';
import { EditorProps } from './types';
import './LexicalEditor.css';
import { TooltipContext, TooltipProvider } from './adapters/tooltip';
import { SourceContext } from './context/SourceContext';

import { MOCK_SECTION_SOURCES } from '@/playground/components/LexicalFocusedExample/mockData';
export interface LexicalEditorProps extends EditorProps {
  tooltipProvider: TooltipProvider;
}

const INITIAL_CONFIG = {
  namespace: 'LexicalEditor',
  onError: (error: Error) => {
    console.error('Lexical Editor Error:', error);
  },
  theme: EditorTheme,
  nodes: EditorNodes,
  editorState: undefined,
};

export const LexicalEditor: FC<LexicalEditorProps> = ({
  tooltipProvider,
  ...restProps
}) => {
  return (
    <LexicalComposer initialConfig={INITIAL_CONFIG}>
      <ToolbarContext>
        <SourceContext value={MOCK_SECTION_SOURCES}>
          <TooltipContext provider={tooltipProvider}>
            <Editor {...restProps} />
          </TooltipContext>
        </SourceContext>
      </ToolbarContext>
    </LexicalComposer>
  );
};
