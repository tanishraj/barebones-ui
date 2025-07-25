import { useState } from 'react';

import { Button, LexicalEditor } from '@/components';
import { ChangeLogs } from '@/components/LexicalFocused/types';

const DEFAULT_CONTENT = `
# Lexical Editor Example
This is a **sample editor** to test the **Lexical Editor** component.

## Features
- Rich text editing [1]
- Markdown support [2]

### Usage
You can type in this editor and see how it behaves with different content. [3]

You can type here and see how the editor behaves. [1,2]

## Link:
[Lexical Documentation](https://lexical.dev/docs/)

## Formular Equations [1]
$$e=mc^2$$

## Table

| Column1 | Column2 | Column3 | Column4 | Column5 |
| ------- | ------- | ------- | ------- | ------- |
| Row 1   | Row 1   | Row 1   | Row 1 [1]   | Row 1 [1]   |
| Row 2   | Row 2   | Row 2   | Row 2   | Row 2   |
| Row 3   | Row 3   | Row 3   | Row 3   | Row 3   |
| Row 4   | Row 4   | Row 4   | Row 4   | Row 4   |
| Row 5   | Row 5   | Row 5   | Row 5   | Row 5 [1]   |

[1]: https://lexical.dev/docs/commands
[2]: https://lexical.dev/docs/markdown
[3]: https://lexical.dev/docs/tutorials
`;

export const LexicalFocusedExample = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [logs, setLogs] = useState({} as ChangeLogs);
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className='card-bordered p-4 shadow-xs'>
      <div className='card-title'>LexicalFocusedExample</div>
      <div className='card-body flex flex-col flex-wrap gap-2'>
        <LexicalEditor
          markdown={content}
          onChange={setContent}
          onChangeLogs={setLogs}
          isEditable={isEditable}
        />
        <div className='flex justify-end gap-2 mt-2'>
          {!isEditable ? (
            <Button
              variant='primary'
              onClick={() => setIsEditable(!isEditable)}
            >
              Edit
            </Button>
          ) : (
            <div className='flex items-center gap-2'>
              <Button variant='secondary' onClick={() => setIsEditable(false)}>
                Cancel
              </Button>
              <Button variant='primary' onClick={() => setIsEditable(false)}>
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className='card-footer gap-5 flex flex-col'>
        <div className=''>
          <h3 className='text-lg font-semibold'>Change Logs:</h3>
          <pre className='bg-gray-100 p-2 rounded overflow-x-auto'>
            {JSON.stringify(logs, null, 2)}
          </pre>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Content:</h3>
          <pre className='text-sm text-gray-500 whitespace-pre-wrap font-mono bg-gray-50 p-2 rounded overflow-x-auto'>
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
