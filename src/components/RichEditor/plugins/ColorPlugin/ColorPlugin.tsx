import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from '@lexical/selection';
import { useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';

import { ColorPicker } from '../../Components';
import { LOW_PRIORIRTY } from '../Toolbar/constants';

export const ColorPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [color, setColor] = useState('#ff0000');
  const [backgroundColor, setBackgroundColor] = useState('#ff0000');

  const updateToolbar = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const color = $getSelectionStyleValueForProperty(
        selection,
        'color',
        '#ff0000',
      );
      const backgroundColor = $getSelectionStyleValueForProperty(
        selection,
        'background',
        '#ff0000',
      );
      setColor(color);
      setBackgroundColor(backgroundColor);
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        payload => {
          updateToolbar();
          return false;
        },
        LOW_PRIORIRTY,
      ),
    );
  }, [editor]);

  const updateColor = ({
    property,
    color,
  }: {
    property: 'background' | 'color';
    color: string;
  }) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection) {
        $patchStyleText(selection, { [property]: color });
      }
    });
  };

  return (
    <>
      <ColorPicker
        type='text'
        color={color}
        onChange={color => updateColor({ property: 'color', color })}
      />
      <ColorPicker
        type='bg'
        color={backgroundColor}
        onChange={color => updateColor({ property: 'background', color })}
      />
    </>
  );
};
