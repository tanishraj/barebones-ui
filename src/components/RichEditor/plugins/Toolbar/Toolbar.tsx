import { useEffect, useState } from 'react';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingTagType, $createHeadingNode } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';

import {
  HEADINGS,
  LOW_PRIORIRTY,
  RICH_TEXT_TOOLBAR_OPTIONS,
  RichTextToolbarActions,
} from './constants';
import { Button } from '../../../Button';
import { ToolbarButtonStyles, ToolbarStyles } from './Toolbar.styles';
import { useKeyBindings } from '../../hooks';
import { ColorPlugin } from '../ColorPlugin';
import { ListPlugin } from '../ListPlugin';

import { cn } from '@/utils';
import { Select } from '@/components/Select';

export const ToolbarPlugin = () => {
  const ToolbarClassName = ToolbarStyles();
  const ToolbarButtonClassName = ToolbarButtonStyles();

  const [editor] = useLexicalComposerContext();
  const [disableMap, setDisableMap] = useState<Record<string, boolean>>({
    [RichTextToolbarActions.UNDO]: true,
    [RichTextToolbarActions.REDO]: true,
  });
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({
    [RichTextToolbarActions.BOLD]: false,
    [RichTextToolbarActions.ITALIC]: false,
    [RichTextToolbarActions.UNDERLINE]: false,
    [RichTextToolbarActions.STRIKETHROUGH]: false,
    [RichTextToolbarActions.SUBSCRIPT]: false,
    [RichTextToolbarActions.SUPERSCRIPT]: false,
    [RichTextToolbarActions.HIGHLIGHT]: false,
    [RichTextToolbarActions.CODE]: false,
    [RichTextToolbarActions.LEFT_ALIGN]: false,
    [RichTextToolbarActions.CENTER_ALIGN]: false,
    [RichTextToolbarActions.RIGHT_ALIGN]: false,
    [RichTextToolbarActions.JUSTIFY_ALIGN]: false,
  });

  const updateToolbarState = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const newSelectionMap = {
        [RichTextToolbarActions.BOLD]: selection.hasFormat('bold'),
        [RichTextToolbarActions.ITALIC]: selection.hasFormat('italic'),
        [RichTextToolbarActions.UNDERLINE]: selection.hasFormat('underline'),
        [RichTextToolbarActions.STRIKETHROUGH]:
          selection.hasFormat('strikethrough'),
        [RichTextToolbarActions.SUBSCRIPT]: selection.hasFormat('subscript'),
        [RichTextToolbarActions.SUPERSCRIPT]:
          selection.hasFormat('superscript'),
        [RichTextToolbarActions.HIGHLIGHT]: selection.hasFormat('highlight'),
        [RichTextToolbarActions.CODE]: selection.hasFormat('code'),
      };
      setSelectionMap(newSelectionMap);
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbarState();
          return false;
        },
        LOW_PRIORIRTY,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setDisableMap(prev => ({
            ...prev,
            [RichTextToolbarActions.UNDO]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setDisableMap(prev => ({
            ...prev,
            [RichTextToolbarActions.REDO]: !payload,
          }));
          return false;
        },
        LOW_PRIORIRTY,
      ),
    );
  }, [editor]);

  const handleAction = (actionId: RichTextToolbarActions) => {
    switch (actionId) {
      case RichTextToolbarActions.BOLD:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        break;
      case RichTextToolbarActions.ITALIC:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        break;
      case RichTextToolbarActions.UNDERLINE:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        break;
      case RichTextToolbarActions.STRIKETHROUGH:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        break;
      case RichTextToolbarActions.SUBSCRIPT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
        break;
      case RichTextToolbarActions.SUPERSCRIPT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
        break;
      case RichTextToolbarActions.HIGHLIGHT:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
        break;
      case RichTextToolbarActions.CODE:
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
        break;
      case RichTextToolbarActions.LEFT_ALIGN:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        break;
      case RichTextToolbarActions.CENTER_ALIGN:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        break;
      case RichTextToolbarActions.RIGHT_ALIGN:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        break;
      case RichTextToolbarActions.JUSTIFY_ALIGN:
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        break;
      case RichTextToolbarActions.UNDO:
        editor.dispatchCommand(UNDO_COMMAND, undefined);
        break;
      case RichTextToolbarActions.REDO:
        editor.dispatchCommand(REDO_COMMAND, undefined);
        break;
      default:
        console.warn(`Action ${actionId} is not implemented.`);
        break;
    }
  };

  const getSelectedBtnProps = (isSelected: boolean) =>
    isSelected
      ? {
          className: cn(ToolbarButtonClassName),
        }
      : {
          className: cn(ToolbarButtonClassName),
        };

  useKeyBindings({
    onAction: handleAction,
  });

  const updateHeading = (heading: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $wrapNodes(selection, () => $createHeadingNode(heading));
      }
    });
  };

  return (
    <div className={ToolbarClassName}>
      <Select
        name='headings'
        variant='ghost'
        options={HEADINGS}
        onChange={e => updateHeading(e.target.value as HeadingTagType)}
      />
      {RICH_TEXT_TOOLBAR_OPTIONS.map(item => (
        <Button
          variant={selectionMap[item.id] ? 'primary' : 'ghost'}
          softColor={true}
          size='sm'
          key={item.id}
          icon={item.icon}
          aria-label={item.label}
          disabled={disableMap[item.id]}
          onClick={() => handleAction(item.id)}
          {...getSelectedBtnProps(selectionMap[item.id])}
        />
      ))}
      <ColorPlugin />
      <ListPlugin />
    </div>
  );
};
