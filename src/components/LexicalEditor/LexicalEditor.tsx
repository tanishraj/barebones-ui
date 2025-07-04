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
`;

export const LexicalEditorExample = () => {
  const [content, setContent] = useState<string>(DEFAULT_CONTENT);

  return (
    <div>
      <h1>Lexical Editor Example</h1>
      <LexicalEditor value={content} onChange={setContent} />
      <div>Content: {content}</div>
    </div>
  );
};
