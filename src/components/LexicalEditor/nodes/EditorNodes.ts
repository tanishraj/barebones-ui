import type { Klass, LexicalNode } from 'lexical';
import { ListItemNode, ListNode } from '@lexical/list';

export const EditorNodes: Array<Klass<LexicalNode>> = [ListNode, ListItemNode];
