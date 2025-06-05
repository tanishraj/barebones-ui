import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  Redo,
  Strikethrough,
  Subscript,
  Superscript,
  UnderlineIcon,
  Undo,
} from 'lucide-react';

export enum RichTextToolbarActions {
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'strikethrough',
  SUBSCRIPT = 'subscript',
  SUPERSCRIPT = 'superscript',
  HIGHLIGHT = 'highlight',
  CODE = 'code',
  LEFT_ALIGN = 'leftAlign',
  CENTER_ALIGN = 'centerAlign',
  RIGHT_ALIGN = 'rightAlign',
  JUSTIFY_ALIGN = 'justifyAlign',
  UNDO = 'undo',
  REDO = 'redo',
}

export const RICH_TEXT_TOOLBAR_OPTIONS = [
  {
    id: RichTextToolbarActions.BOLD,
    label: 'Bold',
    icon: <Bold />,
  },
  {
    id: RichTextToolbarActions.ITALIC,
    label: 'Italic',
    icon: <Italic />,
  },
  {
    id: RichTextToolbarActions.UNDERLINE,
    label: 'Underline',
    icon: <UnderlineIcon />,
  },
  {
    id: RichTextToolbarActions.STRIKETHROUGH,
    label: 'Strikethrough',
    icon: <Strikethrough />,
  },
  {
    id: RichTextToolbarActions.SUBSCRIPT,
    label: 'Subscript',
    icon: <Subscript />,
  },
  {
    id: RichTextToolbarActions.SUPERSCRIPT,
    label: 'Superscript',
    icon: <Superscript />,
  },
  {
    id: RichTextToolbarActions.HIGHLIGHT,
    label: 'Highlight',
    icon: <Highlighter />,
  },
  {
    id: RichTextToolbarActions.CODE,
    label: 'Code',
    icon: <Code />,
  },
  {
    id: RichTextToolbarActions.LEFT_ALIGN,
    label: 'Left Align',
    icon: <AlignLeft />,
  },
  {
    id: RichTextToolbarActions.CENTER_ALIGN,
    label: 'Center Align',
    icon: <AlignCenter />,
  },
  {
    id: RichTextToolbarActions.RIGHT_ALIGN,
    label: 'Align Right',
    icon: <AlignRight />,
  },
  {
    id: RichTextToolbarActions.JUSTIFY_ALIGN,
    label: 'Justify Align',
    icon: <AlignJustify />,
  },
  {
    id: RichTextToolbarActions.UNDO,
    label: 'Undo',
    icon: <Undo />,
  },
  {
    id: RichTextToolbarActions.REDO,
    label: 'Redo',
    icon: <Redo />,
  },
];

export const LOW_PRIORIRTY = 1;
export const HEADINGS = [
  { label: 'Select Heading', value: '' },
  {
    label: 'H1',
    value: 'h1',
  },
  {
    label: 'H2',
    value: 'h2',
  },
  {
    label: 'H3',
    value: 'h3',
  },
  {
    label: 'H4',
    value: 'h4',
  },
  {
    label: 'H5',
    value: 'h5',
  },
  {
    label: 'H6',
    value: 'h6',
  },
];
