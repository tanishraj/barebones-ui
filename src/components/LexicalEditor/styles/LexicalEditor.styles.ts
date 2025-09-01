import { cva, type VariantProps } from 'class-variance-authority';

export const editorContainerStyles = cva(
  'relative rounded-lg border border-base-300 bg-base-100 shadow-sm transition-all duration-200',
  {
    variants: {
      focused: {
        true: 'border-primary/30',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
      readOnly: {
        true: 'bg-base-200',
        false: '',
      },
    },
    defaultVariants: {
      focused: false,
      disabled: false,
      readOnly: false,
    },
  },
);

export const toolbarStyles =
  'flex items-center justify-between p-2 bg-base-100 border-b border-base-300 rounded-t-lg';

export const contentEditableStyles =
  'relative outline-none p-4 min-h-[100px] prose prose-base max-w-none focus:outline-none [&_.editor-equation]:cursor-pointer [&_.editor-equation]:select-none [&_.editor-equation]:user-select-none [&_.editor-equation-inline]:inline-block [&_.editor-equation-inline]:px-1 [&_.editor-equation-block]:block [&_.editor-equation-block]:text-center [&_.editor-equation-block]:py-4 [&_.editor-equation-block]:my-2 [&_pre]:bg-base-200 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_code]:bg-base-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono';

export const editorContentStyles = 'overflow-y-auto relative';

// Table styles as Tailwind classes
export const tableStyles = {
  table: 'border-collapse w-full my-4',
  tableRow: 'border-b border-base-300 last:border-b-0',
  tableCell: 'border border-base-300 p-2 min-w-[75px] align-top relative',
  tableCellHeader: 'bg-base-200 font-semibold text-sm',
  tableCellSelected: 'bg-primary/10',
  tableCellSelectionColor: 'bg-primary/20',
};

export type EditorContainerVariants = VariantProps<
  typeof editorContainerStyles
>;
