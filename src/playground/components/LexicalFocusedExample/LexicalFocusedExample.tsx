import { useState } from 'react';

import { LexicalEditor } from '@/components';
import { ChangeLogs } from '@/components/LexicalFocused/types';
import { ReactTooltipAdapter } from '@/components/LexicalFocused/adapters/tooltip';

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
$$e=mc^2$$

## Link:
[Lexical Documentation](https://lexical.dev/docs/)

## Table

| Column 1 | Column 2 |
| -------- | -------- |
| Row 1    | Row 1 [1]  |
| Row 2    | Row 2    |

`;

export const LexicalFocusedExample = () => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [logs, setLogs] = useState({} as ChangeLogs);

  return (
    <div className='card-bordered p-4 shadow-xs'>
      <div className='card-title'>LexicalFocusedExample</div>
      <div className='card-body flex flex-col flex-wrap gap-2'>
        <LexicalEditor
          markdown={content}
          onChange={setContent}
          onChangeLogs={setLogs}
          tooltipProvider={ReactTooltipAdapter}
        />
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
          <p className='text-sm text-gray-500'>{content}</p>
        </div>
      </div>
    </div>
  );
};
