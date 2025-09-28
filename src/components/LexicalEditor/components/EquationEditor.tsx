import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import katex from 'katex';

interface EquationEditorProps {
  equation: string;
  setEquation: (equation: string) => void;
  inline: boolean;
}

const EquationEditor = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  EquationEditorProps
>(({ equation, setEquation, inline }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => {
    if (inline) {
      return inputRef.current!;
    }
    return textareaRef.current!;
  });

  useEffect(() => {
    if (inline && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    } else if (!inline && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [inline]);

  if (inline) {
    return (
      <span className="inline-block relative">
        <input
          ref={inputRef}
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          className="input input-bordered input-sm font-mono text-sm min-w-[200px]"
          placeholder="Enter equation..."
        />
      </span>
    );
  }

  return (
    <div className="block my-2">
      <textarea
        ref={textareaRef}
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
        className="textarea textarea-bordered w-full font-mono text-sm"
        placeholder="Enter equation..."
        rows={3}
      />
    </div>
  );
});

EquationEditor.displayName = 'EquationEditor';

export default EquationEditor;