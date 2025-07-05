import { useState } from 'react';

import { LexicalEditor } from '@/components';

import 'react-tooltip/dist/react-tooltip.css';

const DEFAULT_CONTENT = `
# Lexical Editor Example
This is a **sample editor** to test the **Lexical Editor** component.

## Features
- Rich text editing [1]
- Markdown support [2]

### Usage
You can type in this editor and see how it behaves with different content. [3]

You can type here and see how the editor behaves. [1,2]

## Formular Equations
$e=mc^2$

## Table

| Column 1 | Column 2 |
| -------- | -------- |
| Row 1    | Row 1    |
| Row 2    | Row 2    |
`;

export const LexicalEditorExample = () => {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [hasContentUpdated, setHasContentUpdated] = useState<boolean>(false);
  const [hasFormatUpdated, setHasFormatUpdated] = useState<boolean>(false);

  return (
    <div>
      <h1>Lexical Editor Example</h1>
      <LexicalEditor
        value={content}
        onChange={setContent}
        onDirtyChange={setIsDirty}
        onContentUpdate={setHasContentUpdated}
        onFormatUpdate={setHasFormatUpdated}
      />
      <div>Dirty: {isDirty ? 'true' : 'false'}</div>
      <div>Content Updated: {hasContentUpdated ? 'true' : 'false'}</div>
      <div>Format Updated: {hasFormatUpdated ? 'true' : 'false'}</div>
      <div>Content: {content}</div>
    </div>
  );
};
