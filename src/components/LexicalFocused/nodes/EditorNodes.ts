import { ParagraphNode, TextNode, type Klass, type LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  ParagraphNode,
  TextNode,
  HeadingNode,
];
