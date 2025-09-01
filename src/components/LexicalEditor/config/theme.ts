/**
 * Lexical Editor Theme Configuration
 * Maps Lexical's internal elements to Tailwind CSS classes
 */

export const editorTheme = {
  // Text direction classes
  ltr: 'text-left',
  rtl: 'text-right',

  // Paragraph styling
  paragraph: 'mb-2 text-base',

  // Quote styling
  quote: 'border-l-4 border-base-300 pl-4 italic text-base-content/80 my-3',

  // Heading styles
  heading: {
    h1: 'text-4xl font-bold mb-4 mt-6',
    h2: 'text-3xl font-bold mb-3 mt-5',
    h3: 'text-2xl font-bold mb-3 mt-4',
    h4: 'text-xl font-semibold mb-2 mt-3',
    h5: 'text-lg font-semibold mb-2 mt-2',
    h6: 'text-base font-semibold mb-1 mt-2',
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
  },

  // Text formatting
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline underline-offset-2',
    strikethrough: 'line-through',
    underlineStrikethrough: 'lexical-underline-strikethrough',
    code: 'font-mono text-sm bg-base-200 px-0.5 rounded',
    subscript: 'subscript text-sm',
    superscript: 'superscript text-sm',
    highlight: 'bg-yellow-200 dark:bg-yellow-900/50',
  },

  // Link styling
  link: 'text-primary hover:text-primary-focus underline cursor-pointer transition-colors',

  // Code block styling
  code: 'font-mono text-sm bg-base-200 p-4 rounded-lg block my-3 overflow-x-auto',

  // Table styling
  table: 'border-collapse w-full my-4',
  tableCell: 'border border-base-300 p-2 min-w-[75px] align-top relative hover:bg-base-100/50',
  tableCellHeader: 'border border-base-300 p-2 min-w-[75px] align-top relative bg-base-200 font-semibold text-sm',
  tableRow: 'border-b border-base-300 last:border-b-0',
  tableSelected: 'bg-primary/10',

  // Image styling
  image: 'max-w-full h-auto rounded-lg my-3',

  // Horizontal rule
  horizontalRule: 'border-t-2 border-base-300 my-6',

  // Placeholder
  placeholder: 'text-base-content/50 pointer-events-none absolute top-4 left-4',
};
