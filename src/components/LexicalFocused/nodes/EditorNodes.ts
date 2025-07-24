import { ParagraphNode, TextNode, type Klass, type LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';

import { EquationNode } from './EquationNode';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  ParagraphNode,
  TextNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  EquationNode,
  LinkNode,
  AutoLinkNode,
];
