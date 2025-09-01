import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Check, Type, Maximize2 } from 'lucide-react';
import katex from 'katex';

interface KatexEquationAltererProps {
  onConfirm: (equation: string, inline: boolean) => void;
  initialEquation?: string;
  initialInline?: boolean;
}

const EQUATION_EXAMPLES = [
  { label: 'Quadratic', value: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
  { label: 'Integral', value: '\\int_{a}^{b} f(x)dx' },
  { label: 'Sum', value: '\\sum_{i=1}^{n} x_i' },
  { label: 'Matrix', value: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
  { label: 'Fraction', value: '\\frac{a}{b}' },
  { label: 'Sqrt', value: '\\sqrt{x}' },
  { label: 'Limit', value: '\\lim_{x \\to \\infty} f(x)' },
  { label: 'Vector', value: '\\vec{v} = \\langle v_1, v_2, v_3 \\rangle' },
];

export default function KatexEquationAlterer({
  onConfirm,
  initialEquation = '',
  initialInline = true,
}: KatexEquationAltererProps): JSX.Element {
  const [equation, setEquation] = useState(initialEquation);
  const [inline, setInline] = useState(initialInline);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const previewElement = previewRef.current;
    if (previewElement) {
      try {
        katex.render(equation || '\\text{Enter equation...}', previewElement, {
          displayMode: !inline,
          errorColor: '#cc0000',
          output: 'html',
          strict: 'warn',
          throwOnError: false,
          trust: false,
        });
        setPreviewError(null);
      } catch (error) {
        setPreviewError('Invalid LaTeX syntax');
        previewElement.innerHTML = `<span style="color: #cc0000;">Invalid equation</span>`;
      }
    }
  }, [equation, inline]);

  const handleConfirm = useCallback(() => {
    if (equation.trim() && !previewError) {
      onConfirm(equation, inline);
    }
  }, [equation, inline, previewError, onConfirm]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handleConfirm();
      }
    },
    [handleConfirm],
  );

  const insertExample = useCallback((exampleValue: string) => {
    setEquation(exampleValue);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* Display Mode Toggle */}
      <div className="flex items-center gap-4">
        <label className="label cursor-pointer">
          <span className="text-sm font-medium mr-2">Display mode:</span>
          <div className="btn-group">
            <button
              className={`btn btn-sm ${inline ? 'btn-active' : ''}`}
              onClick={() => setInline(true)}
            >
              <Type className="h-4 w-4 mr-1" />
              Inline
            </button>
            <button
              className={`btn btn-sm ${!inline ? 'btn-active' : ''}`}
              onClick={() => setInline(false)}
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Block
            </button>
          </div>
        </label>
      </div>

      {/* LaTeX Input */}
      <div>
        <label className="label">
          <span className="text-sm font-medium">LaTeX Expression</span>
          <span className="text-xs text-base-content/70">
            Press Ctrl+Enter to insert
          </span>
        </label>
        <textarea
          ref={inputRef}
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="textarea textarea-bordered w-full h-24 font-mono text-sm"
          placeholder="e.g., x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}"
        />
        {previewError && (
          <label className="label">
            <span className="text-xs text-error">{previewError}</span>
          </label>
        )}
      </div>

      {/* Examples */}
      <div>
        <label className="label">
          <span className="text-sm font-medium">Quick Examples</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {EQUATION_EXAMPLES.map((example) => (
            <button
              key={example.label}
              onClick={() => insertExample(example.value)}
              className="btn btn-xs btn-outline"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="label">
          <span className="text-sm font-medium">Preview</span>
        </label>
        <div className="border border-base-300 rounded-lg p-4 min-h-[80px] bg-base-200 overflow-x-auto">
          <div
            ref={previewRef}
            className={inline ? 'inline-block' : 'text-center'}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleConfirm}
          disabled={!equation.trim() || !!previewError}
          className="btn btn-primary btn-sm"
        >
          <Check className="h-4 w-4 mr-1" />
          Insert Equation
        </button>
      </div>
    </div>
  );
}