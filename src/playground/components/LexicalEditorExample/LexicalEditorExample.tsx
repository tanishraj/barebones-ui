import { useState } from 'react';

import { LexicalEditor } from '@/components';

const DEFAULT_CONTENT = `
This is a **sample editor** to test the **Lexical Editor** component.
You can type here and see how the editor behaves.
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
