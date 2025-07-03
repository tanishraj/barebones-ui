import './EquationEditor.css';

import { isHTMLElement } from 'lexical';
import { ChangeEvent, forwardRef, Ref, RefObject } from 'react';

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  setEquation: (equation: string) => void;
};

export const EquationEditor = forwardRef(
  (
    { equation, setEquation, inline }: BaseEquationEditorProps,
    forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
  ): JSX.Element => {
    const onChange = (event: ChangeEvent) => {
      setEquation((event.target as HTMLInputElement).value);
    };

    return inline && isHTMLElement(forwardedRef) ? (
      <span className='EquationEditor_inputBackground'>
        <span className='EquationEditor_dollarSign'>$</span>
        <input
          className='EquationEditor_inlineEditor'
          value={equation}
          onChange={onChange}
          autoFocus={true}
          ref={forwardedRef as RefObject<HTMLInputElement>}
        />
        <span className='EquationEditor_dollarSign'>$</span>
      </span>
    ) : (
      <div className='EquationEditor_inputBackground'>
        <span className='EquationEditor_dollarSign'>{'$$\n'}</span>
        <textarea
          className='EquationEditor_blockEditor'
          value={equation}
          onChange={onChange}
          ref={forwardedRef as RefObject<HTMLTextAreaElement>}
        />
        <span className='EquationEditor_dollarSign'>{'\n$$'}</span>
      </div>
    );
  },
);
