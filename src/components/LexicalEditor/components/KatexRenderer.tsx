import * as React from 'react';
import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface KatexRendererProps {
  equation: string;
  inline: boolean;
  onDoubleClick?: () => void;
}

export default function KatexRenderer({
  equation,
  inline,
  onDoubleClick,
}: KatexRendererProps): JSX.Element {
  const katexElementRef = useRef<HTMLDivElement | HTMLSpanElement | null>(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;

    if (katexElement !== null) {
      try {
        katex.render(equation || '', katexElement, {
          displayMode: !inline,
          errorColor: '#cc0000',
          output: 'html',
          strict: 'warn',
          throwOnError: false,
          trust: false,
        });
      } catch (error) {
        // If KaTeX fails to parse, show the raw equation
        if (katexElement) {
          katexElement.innerHTML = `<span style="color: #cc0000;">Invalid equation: ${equation}</span>`;
        }
      }
    }
  }, [equation, inline]);

  if (inline) {
    return (
      <span
        ref={katexElementRef as React.RefObject<HTMLSpanElement>}
        onDoubleClick={onDoubleClick}
        className="editor-equation editor-equation-inline"
      />
    );
  }

  return (
    <div
      ref={katexElementRef as React.RefObject<HTMLDivElement>}
      onDoubleClick={onDoubleClick}
      className="editor-equation editor-equation-block"
    />
  );
}