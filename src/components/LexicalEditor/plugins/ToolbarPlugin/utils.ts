import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getRoot,
  $selectAll,
  LexicalEditor,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import {
  $createHeadingNode,
  HeadingTagType,
  $createQuoteNode,
} from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';

export const formatParagraph = (editor: LexicalEditor) => {
  editor.update(() => {
    let selection = $getSelection();

    // If no selection, create one by selecting all content or focusing at the start
    if (!selection) {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      if (firstChild) {
        // Select the first paragraph/block
        firstChild.selectStart();
        selection = $getSelection();
      }
    }

    if (selection) {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  });
};

export const formatHeading = (
  editor: LexicalEditor,
  headingSize: HeadingTagType,
) => {
  if (headingSize) {
    editor.update(() => {
      let selection = $getSelection();

      // If no selection, create one by selecting all content or focusing at the start
      if (!selection) {
        const root = $getRoot();
        const firstChild = root.getFirstChild();
        if (firstChild) {
          // Select the first paragraph/block
          firstChild.selectStart();
          selection = $getSelection();
        }
      }

      if (selection) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  }
};

export const formatBulletList = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'bullet') {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatNumberedList = (
  editor: LexicalEditor,
  blockType: string,
) => {
  if (blockType !== 'number') {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  } else {
    formatParagraph(editor);
  }
};

export const formatQuote = (editor: LexicalEditor, blockType: string) => {
  if (blockType !== 'quote') {
    editor.update(() => {
      let selection = $getSelection();

      // If no selection, create one by selecting all content or focusing at the start
      if (!selection) {
        const root = $getRoot();
        const firstChild = root.getFirstChild();
        if (firstChild) {
          // Select the first paragraph/block
          firstChild.selectStart();
          selection = $getSelection();
        }
      }

      if (selection) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  } else {
    formatParagraph(editor);
  }
};
