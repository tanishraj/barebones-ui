import type { Klass, LexicalNode } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

import { SourceNode } from './SourceNode';
import { EquationNode } from './EquationNode';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  EquationNode,
  SourceNode,
  LinkNode,
  AutoLinkNode,
];
