import { TRANSFORMERS as BASE_TRANSFORMERS } from '@lexical/markdown';

import { MARKDOWN_TRANSFORMERS } from './MarkdownTransformers';

export const EDITOR_TRANSFORMERS = [
  ...BASE_TRANSFORMERS,
  ...MARKDOWN_TRANSFORMERS,
];
