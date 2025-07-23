import { ParagraphNode, TextNode, type Klass, type LexicalNode } from 'lexical';
import { HeadingNode } from '@lexical/rich-text';

import { EquationNode } from './EquationNode';

export const EditorNodes: Array<Klass<LexicalNode>> = [
  ParagraphNode,
  TextNode,
  HeadingNode,
  EquationNode,
];
