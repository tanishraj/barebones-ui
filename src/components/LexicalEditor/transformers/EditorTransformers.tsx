import { TRANSFORMERS as BASE_TRANSFORMERS } from '@lexical/markdown';

import { MARKDOWN_TRANSFORMERS } from '../plugins/MarkdownTransformers';
import { SOURCE_TRANSFORMER } from './SourceTransformer';

export const EDITOR_TRANSFORMERS = [
  ...BASE_TRANSFORMERS,
  ...MARKDOWN_TRANSFORMERS,
  SOURCE_TRANSFORMER,
];
