import { EditorThemeClasses } from 'lexical';

export const theme: EditorThemeClasses = {
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
    subscript: 'subscript',
    superscript: 'superscript',
    code: 'font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded',
  },
  heading: {
    h1: 'text-4xl font-bold mt-4 mb-2',
    h2: 'text-3xl font-semibold mt-3 mb-2',
    h3: 'text-2xl font-semibold mt-2 mb-1',
    h4: 'text-xl font-medium mt-2 mb-1',
    h5: 'text-lg font-medium mt-1 mb-1',
    h6: 'text-base font-medium mt-1 mb-1',
  },
  // List theme to support multiple level list items
  list: {
    ul: 'list-disc pl-6 mb-2',
    ol: 'list-decimal pl-6 mb-2',
    listitem: 'mb-1',
    nested: {
      listitem: 'pl-4',
    },
  },
};
