import type { JSX } from 'react';

import * as React from 'react';
import { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import KatexRenderer from './KatexRenderer';

type Props = {
  initialEquation?: string;
  onConfirm: (equation: string, inline: boolean) => void;
};

export default function KatexEquationAlterer({
  onConfirm,
  initialEquation = '',
}: Props): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [equation, setEquation] = useState<string>(initialEquation);
  const [inline, setInline] = useState<boolean>(true);

  const onClick = useCallback(() => {
    onConfirm(equation, inline);
  }, [onConfirm, equation, inline]);

  const onCheckboxChange = useCallback(() => {
    setInline(!inline);
  }, [setInline, inline]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Inline</span>
        <input 
          type="checkbox" 
          className="checkbox checkbox-sm"
          checked={inline} 
          onChange={onCheckboxChange} 
        />
      </div>
      
      <div>
        <label className="label">
          <span className="text-sm font-medium">Equation</span>
        </label>
        {inline ? (
          <input
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className="input input-bordered w-full font-mono text-sm"
            placeholder="E.g. x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
          />
        ) : (
          <textarea
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
            className="textarea textarea-bordered w-full h-24 font-mono text-sm"
            placeholder="E.g. x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
          />
        )}
      </div>
      
      <div>
        <label className="label">
          <span className="text-sm font-medium">Visualization</span>
        </label>
        <div className="border border-base-300 rounded-lg p-4 min-h-[80px] bg-base-200 flex items-center justify-center">
          <ErrorBoundary onError={(e) => editor._onError(e)} fallback={null}>
            <KatexRenderer
              equation={equation}
              inline={false}
              onDoubleClick={() => null}
            />
          </ErrorBoundary>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={onClick}
          className="btn btn-primary btn-sm"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}