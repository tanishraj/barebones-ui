import type { Klass, LexicalNode } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  ListNode,
  ListItemNode,
  TableNode,
  TableCellNode,
  TableRowNode,
];
