import { useState } from 'react';

import { LexicalEditor } from '@/components';
import { ChangeDetection } from '@/components/LexicalEditor/plugins/ContentPlugin';

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

## Link:
[Lexical Documentation](https://lexical.dev/docs/)

## Table

| Column 1 | Column 2 |
| -------- | -------- |
| Row 1    | Row 1    |
| Row 2    | Row 2    |

`;

export const LexicalEditorExample = () => {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);
  const [editorChange, setEditorChange] = useState<ChangeDetection>({
    type: 'NO_CHANGE',
    isContentUpdated: false,
    details: {
      contentChanges: [],
      formatChanges: [],
    },
  });
  const [isEditable, setIsEditable] = useState<boolean>(false);

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1>Lexical Editor Example</h1>
        <button
          className='btn btn-primary'
          onClick={() => setIsEditable(!isEditable)}
        >
          Switch to {isEditable ? 'Preview' : 'Edit'} Mode
        </button>
      </div>
      <LexicalEditor
        value={content}
        onChange={setContent}
        onChangeDetected={setEditorChange}
        isEditable={isEditable}
      />

      <div>HAS_CHANGED: {editorChange.isContentUpdated ? 'true' : 'false'}</div>
      <div>CHANGE_TYPE: {editorChange.type}</div>
      <div>Content: {content}</div>
    </div>
  );
};
