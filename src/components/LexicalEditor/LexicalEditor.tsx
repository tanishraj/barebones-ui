import { LexicalComposer } from '@lexical/react/LexicalComposer';

export const LexicalEditor = () => {
  return (
    <LexicalComposer initialConfig={}>
      <div className='lexical-editor'>
        {/* Your editor content goes here */}
        <p>Start typing...</p>
      </div>
    </LexicalComposer>
  );
};
