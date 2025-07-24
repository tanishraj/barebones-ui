import { ParagraphNode, TextNode, type Klass, type LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

import { EquationNode } from './EquationNode';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  ParagraphNode,
  TextNode,
  HeadingNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  EquationNode,
];
