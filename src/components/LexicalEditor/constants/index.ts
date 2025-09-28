// Editor Constants
export const EDITOR_NAMESPACE = 'lexical-editor';

// Toolbar Constants
export const BLOCK_TYPES = {
  paragraph: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  quote: 'Quote',
  code: 'Code Block',
} as const;

// Editor Dimensions
export const DEFAULT_MIN_HEIGHT = '150px';
export const DEFAULT_MAX_HEIGHT = '500px';

// Floating Element Constants
export const VERTICAL_GAP = 10;
export const HORIZONTAL_OFFSET = 5;

// Link Constants
export const SUPPORTED_URL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];
export const DEFAULT_LINK_PROTOCOL = 'https://';

// Command Priorities (Lexical specific)
export const COMMAND_PRIORITY = {
  CRITICAL: 4,
  HIGH: 3,
  NORMAL: 2,
  LOW: 1,
  EDITOR: 0,
} as const;

// Toolbar Section Names
export const TOOLBAR_SECTIONS = {
  BLOCK_TYPE: 'blockType',
  FORMAT: 'format',
  LIST: 'list',
  LINK: 'link',
  HISTORY: 'history',
} as const;