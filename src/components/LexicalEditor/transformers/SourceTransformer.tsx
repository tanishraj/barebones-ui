import { TextMatchTransformer } from '@lexical/markdown';
import { LexicalNode } from 'lexical';

import { $createSourceNode, $isSourceNode } from '../nodes/SourceNode';

export const SOURCE_TRANSFORMER: TextMatchTransformer = {
  export: (node: LexicalNode) => {
    if (!$isSourceNode(node)) {
      return null;
    }
    return `[${node.__ids}]`;
  },
  importRegExp: /\[(\d+(?:,\d+)*)\]/,
  regExp: /\[(\d+(?:,\d+)*)\]$/,
  replace: (textNode, match) => {
    const [, id] = match;
    const sourceIds = id.split(',');
    const sourceNode = $createSourceNode(sourceIds);
    textNode.replace(sourceNode);
  },
  trigger: ']',
  type: 'text-match',
};
