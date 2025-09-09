import React from 'react';

import { toolbarStyles } from '../../styles/LexicalEditor.styles';
import { useToolbarState } from '../../hooks/useToolbarState';
import { Divider } from '../../components/Divider';
import { BlockTypeSection } from './sections/BlockTypeSection';
import { HistorySection } from './sections/HistorySection';
import { FormatSection } from './sections/FormatSection';
import { LinkSection } from './sections/LinkSection';
import { ListSection } from './sections/ListSection';
import { QuoteSection } from './sections/QuoteSection';
import { EquationSection } from './sections/EquationSection';
import { TableSection } from './sections/TableSection';
import { SourceSection } from './sections/SourceSection';

const ToolbarPlugin: React.FC = () => {
  const { editor, editorState } = useToolbarState();

  return (
    <div className={toolbarStyles}>
      {/* Main toolbar items - start */}
      <div className='flex items-center gap-1 flex-1'>
        <BlockTypeSection editor={editor} editorState={editorState} />
        <Divider />
        <FormatSection editor={editor} editorState={editorState} />
        <QuoteSection editor={editor} editorState={editorState} />
        <Divider />
        <LinkSection editor={editor} editorState={editorState} />
        <Divider />
        <ListSection editor={editor} editorState={editorState} />
        <Divider />
        <EquationSection editor={editor} />
        <TableSection editor={editor} />
        <SourceSection editor={editor} />
      </div>

      {/* History controls - end */}
      <div className='flex items-center gap-1'>
        <HistorySection editor={editor} editorState={editorState} />
      </div>
    </div>
  );
};

export default ToolbarPlugin;
