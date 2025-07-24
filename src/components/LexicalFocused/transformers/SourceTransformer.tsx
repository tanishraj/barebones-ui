import { TextMatchTransformer } from '@lexical/markdown';
import { LexicalNode } from 'lexical';

import { $createSourceNode, $isSourceNode } from '../nodes/SourceNode';

export const SOURCE_TRANSFORMER: TextMatchTransformer = {
  export: (node: LexicalNode) => {
    if (!$isSourceNode(node)) {
      return null;
    }
    return `[${node.__ids.join(',')}]`;
  },
  importRegExp: /\[(\d+(?:\s*,\s*\d+)*)\]/,
  regExp: /\[(\d+(?:\s*,\s*\d+)*)\]$/,
  replace: (textNode, match) => {
    const [, id] = match;
    const sourceIds = id.split(',').map(s => s.trim());
    const sourceNode = $createSourceNode(sourceIds);
    textNode.replace(sourceNode);
  },
  trigger: ']',
  type: 'text-match',
};
