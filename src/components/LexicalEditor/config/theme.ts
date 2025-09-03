/**
 * Lexical Editor Theme Configuration
 * Maps Lexical's internal elements to Tailwind CSS classes
 * Aligned with Lexical Playground implementation
 */

import type { EditorThemeClasses } from 'lexical';

export const editorTheme: EditorThemeClasses = {
  // Text direction classes
  ltr: 'text-left',
  rtl: 'text-right',

  // Paragraph styling - aligned with playground
  paragraph: 'mb-0 relative',

  // Quote styling
  quote:
    'ml-5 mb-2.5 text-[15px] text-gray-600 border-l-4 border-l-gray-300 pl-4',

  // Heading styles - aligned with playground
  heading: {
    h1: 'text-2xl text-gray-900 font-normal m-0',
    h2: 'text-[15px] text-gray-600 font-bold m-0 uppercase',
    h3: 'text-xs m-0 uppercase',
    h4: 'text-lg font-semibold m-0',
    h5: 'text-base font-semibold m-0',
    h6: 'text-sm font-semibold m-0',
  },

  // List styles
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal list-inside space-y-1 mb-3 ml-4',
    ul: 'list-disc list-inside space-y-1 mb-3 ml-4',
    listitem: 'mb-1',
    listitemChecked: 'line-through opacity-60',
    listitemUnchecked: '',
    checklist: 'pl-0',
    olDepth: [
      'list-[upper-alpha]',
      'list-[lower-alpha]',
      'list-[upper-roman]',
      'list-[lower-roman]',
      'list-decimal',
    ],
  },

  // Text formatting
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    code: 'bg-gray-100 py-px px-1 font-mono text-[94%]',
    subscript: 'text-[0.8em] align-sub',
    superscript: 'text-[0.8em] align-super',
    highlight: 'bg-yellow-100 border-b-2 border-yellow-300',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  },

  // Link styling
  link: 'text-blue-600 hover:underline cursor-pointer',

  // Code block styling
  code: 'bg-gray-100 font-mono block p-2 leading-normal text-sm mt-2 mb-2 overflow-x-auto relative',

  codeHighlight: {
    atrule: 'text-blue-600',
    attr: 'text-blue-600',
    boolean: 'text-purple-700',
    builtin: 'text-teal-700',
    cdata: 'text-gray-500',
    char: 'text-teal-700',
    class: 'text-pink-600',
    'class-name': 'text-pink-600',
    comment: 'text-gray-500',
    constant: 'text-purple-700',
    deleted: 'text-red-600',
    doctype: 'text-gray-500',
    entity: 'text-amber-700',
    function: 'text-pink-600',
    important: 'text-orange-600',
    inserted: 'text-green-600',
    keyword: 'text-blue-600',
    namespace: 'text-orange-600',
    number: 'text-purple-700',
    operator: 'text-amber-700',
    prolog: 'text-gray-500',
    property: 'text-purple-700',
    punctuation: 'text-gray-600',
    regex: 'text-orange-600',
    selector: 'text-teal-700',
    string: 'text-teal-700',
    symbol: 'text-purple-700',
    tag: 'text-purple-700',
    url: 'text-amber-700',
    variable: 'text-orange-600',
  },

  // Table styling
  table: 'border-collapse w-full my-4',
  tableCell: 'border border-base-300 p-2 min-w-[75px] align-top relative',
  tableCellHeader: 'bg-base-200 font-semibold',
  tableRow: '',
  tableSelected: 'outline outline-2 outline-primary',
  tableCellResizer: 'absolute right-0 top-0 bottom-0 w-1 cursor-col-resize',
  tableCellActionButton: '',
  tableCellActionButtonContainer: '',

  // Image styling
  image: 'max-w-full h-auto',

  // Inline Image styling
  inlineImage: 'inline-block max-w-full align-bottom',

  // Horizontal rule
  hr: 'my-4 border-t border-gray-300',

  // Indent
  indent: '[--lexical-indent-base-value:40px]',

  // Mark
  mark: 'bg-yellow-100 border-b-2 border-yellow-300',
  markOverlap: 'bg-yellow-200 border-b-2 border-yellow-400',

  // Hashtag
  hashtag: 'bg-blue-100 border-b border-blue-300',

  // Block cursor
  blockCursor: 'bg-black/5 select-none',

  // Character limit
  characterLimit: 'text-red-500',
  
  // Equation styling
  equation: 'cursor-default inline-block align-middle',
};
