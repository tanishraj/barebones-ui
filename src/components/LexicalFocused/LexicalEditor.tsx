import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { Editor } from './Editor';
import { ToolbarContext } from './context/ToolbarContext';
import { EditorNodes } from './nodes';
import { EditorTheme } from './themes';
import { EditorProps } from './types';
import './LexicalEditor.css';
import { TooltipProvider, TooltipProviderWrapper } from './adapters/tooltip';
import { SourceContext } from './context/SourceContext';

export interface LexicalEditorProps extends EditorProps {
  tooltipProvider?: TooltipProvider;
}

const DUMMY_SOURCES = [
  {
    id: '1',
    name: 'Source 1',
    content: 'Source 1',
  },
  {
    id: '2',
    name: 'Source 2',
    content: 'Source 2',
  },
  {
    id: '3',
    name: 'Source 3',
    content: 'Source 3',
  },
];

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
        <SourceContext value={DUMMY_SOURCES}>
          <TooltipProviderWrapper provider={tooltipProvider}>
            <Editor {...restProps} />
          </TooltipProviderWrapper>
        </SourceContext>
      </ToolbarContext>
    </LexicalComposer>
  );
};
