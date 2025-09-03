/**
 * Keyboard shortcuts configuration
 * Aligned with Lexical Playground implementation
 */

const IS_APPLE = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

export const SHORTCUTS = Object.freeze({
  // Text formatting shortcuts
  BOLD: IS_APPLE ? '⌘B' : 'Ctrl+B',
  ITALIC: IS_APPLE ? '⌘I' : 'Ctrl+I',
  UNDERLINE: IS_APPLE ? '⌘U' : 'Ctrl+U',
  STRIKETHROUGH: IS_APPLE ? '⌘⇧X' : 'Ctrl+Shift+X',
  CODE: IS_APPLE ? '⌘E' : 'Ctrl+E',
  
  // Block formatting shortcuts
  NORMAL: IS_APPLE ? '⌘⌥0' : 'Ctrl+Alt+0',
  HEADING1: IS_APPLE ? '⌘⌥1' : 'Ctrl+Alt+1',
  HEADING2: IS_APPLE ? '⌘⌥2' : 'Ctrl+Alt+2',
  HEADING3: IS_APPLE ? '⌘⌥3' : 'Ctrl+Alt+3',
  HEADING4: IS_APPLE ? '⌘⌥4' : 'Ctrl+Alt+4',
  HEADING5: IS_APPLE ? '⌘⌥5' : 'Ctrl+Alt+5',
  HEADING6: IS_APPLE ? '⌘⌥6' : 'Ctrl+Alt+6',
  QUOTE: IS_APPLE ? '⌃⇧Q' : 'Ctrl+Shift+Q',
  CODE_BLOCK: IS_APPLE ? '⌘⌥C' : 'Ctrl+Alt+C',
  
  // List shortcuts
  NUMBERED_LIST: IS_APPLE ? '⌘⇧7' : 'Ctrl+Shift+7',
  BULLET_LIST: IS_APPLE ? '⌘⇧8' : 'Ctrl+Shift+8',
  CHECK_LIST: IS_APPLE ? '⌘⇧9' : 'Ctrl+Shift+9',
  
  // Link and other commands
  INSERT_LINK: IS_APPLE ? '⌘K' : 'Ctrl+K',
  CLEAR_FORMATTING: IS_APPLE ? '⌘\\' : 'Ctrl+\\',
  
  // Indentation
  INDENT: IS_APPLE ? '⌘]' : 'Ctrl+]',
  OUTDENT: IS_APPLE ? '⌘[' : 'Ctrl+[',
  
  // Alignment
  LEFT_ALIGN: IS_APPLE ? '⌘⇧L' : 'Ctrl+Shift+L',
  CENTER_ALIGN: IS_APPLE ? '⌘⇧E' : 'Ctrl+Shift+E',
  RIGHT_ALIGN: IS_APPLE ? '⌘⇧R' : 'Ctrl+Shift+R',
  JUSTIFY_ALIGN: IS_APPLE ? '⌘⇧J' : 'Ctrl+Shift+J',
  
  // History
  UNDO: IS_APPLE ? '⌘Z' : 'Ctrl+Z',
  REDO: IS_APPLE ? '⌘⇧Z' : 'Ctrl+Y',
});