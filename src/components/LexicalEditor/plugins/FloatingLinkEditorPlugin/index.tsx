/**
 * FloatingLinkEditorPlugin - Provides a floating UI for link editing
 * Aligned with Lexical Playground implementation
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch,
} from 'react';
import { createPortal } from 'react-dom';
import {
  $getSelection,
  $isRangeSelection,
  $isNodeSelection,
  $isLineBreakNode,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
  LexicalEditor,
  BaseSelection,
  CLICK_COMMAND,
  getDOMSelection,
} from 'lexical';
import {
  $isLinkNode,
  $isAutoLinkNode,
  TOGGLE_LINK_COMMAND,
  $createLinkNode,
} from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent, mergeRegister } from '@lexical/utils';
import { Check, Edit2, ExternalLink, Trash2, X } from 'lucide-react';

import { getSelectedNode } from '../../utils/getSelectedNode';
import { sanitizeUrl } from '../../utils/url';
import { setFloatingElemPositionForLinkEditor } from '../../utils/setFloatingElemPositionForLinkEditor';

interface FloatingLinkEditorProps {
  editor: LexicalEditor;
  isLink: boolean;
  setIsLink: Dispatch<boolean>;
  anchorElem: HTMLElement;
  isLinkEditMode: boolean;
  setIsLinkEditMode: Dispatch<boolean>;
}

function FloatingLinkEditor({
  editor,
  isLink,
  setIsLink,
  anchorElem,
  isLinkEditMode,
  setIsLinkEditMode,
}: FloatingLinkEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [editedLinkUrl, setEditedLinkUrl] = useState('https://');
  const [lastSelection, setLastSelection] = useState<BaseSelection | null>(
    null,
  );

  const $updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);

      if (linkParent) {
        setLinkUrl(linkParent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
      if (isLinkEditMode) {
        setEditedLinkUrl(linkUrl);
      }
    } else if ($isNodeSelection(selection)) {
      const nodes = selection.getNodes();
      if (nodes.length > 0) {
        const node = nodes[0];
        const parent = node.getParent();
        if ($isLinkNode(parent)) {
          setLinkUrl(parent.getURL());
        } else if ($isLinkNode(node)) {
          setLinkUrl(node.getURL());
        } else {
          setLinkUrl('');
        }
        if (isLinkEditMode) {
          setEditedLinkUrl(linkUrl);
        }
      }
    }

    const editorElem = editorRef.current;
    const nativeSelection = getDOMSelection(editor._window);
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();

    if (selection !== null && rootElement !== null && editor.isEditable()) {
      let domRect: DOMRect | undefined;

      if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes();
        if (nodes.length > 0) {
          const element = editor.getElementByKey(nodes[0].getKey());
          if (element) {
            domRect = element.getBoundingClientRect();
          }
        }
      } else if (
        nativeSelection !== null &&
        rootElement.contains(nativeSelection.anchorNode)
      ) {
        domRect =
          nativeSelection.focusNode?.parentElement?.getBoundingClientRect();
      }

      if (domRect) {
        // Create a new DOMRect-like object with adjusted y position
        const adjustedRect = new DOMRect(
          domRect.x,
          domRect.y + 40,
          domRect.width,
          domRect.height,
        );
        setFloatingElemPositionForLinkEditor(
          adjustedRect,
          editorElem,
          anchorElem,
        );
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem);
      }
      setLastSelection(null);
      setIsLinkEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [anchorElem, editor, setIsLinkEditMode, isLinkEditMode, linkUrl]);

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        $updateLinkEditor();
      });
    };

    window.addEventListener('resize', update);

    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update);
    }

    return () => {
      window.removeEventListener('resize', update);

      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update);
      }
    };
  }, [anchorElem.parentElement, editor, $updateLinkEditor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateLinkEditor();
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [editor, $updateLinkEditor, setIsLink, isLink]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      $updateLinkEditor();
    });
  }, [editor, $updateLinkEditor]);

  useEffect(() => {
    if (isLinkEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLinkEditMode, isLink]);

  useEffect(() => {
    const editorElement = editorRef.current;
    if (editorElement === null) {
      return;
    }
    const handleBlur = (event: FocusEvent) => {
      if (!editorElement.contains(event.relatedTarget as Element) && isLink) {
        setIsLink(false);
        setIsLinkEditMode(false);
      }
    };
    editorElement.addEventListener('focusout', handleBlur);
    return () => {
      editorElement.removeEventListener('focusout', handleBlur);
    };
  }, [editorRef, setIsLink, setIsLinkEditMode, isLink]);

  const monitorInputInteraction = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleLinkSubmission(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsLinkEditMode(false);
    }
  };

  const handleLinkSubmission = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault();
    if (lastSelection !== null) {
      if (linkUrl !== '') {
        editor.update(() => {
          editor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl(editedLinkUrl),
          );
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const parent = getSelectedNode(selection).getParent();
            if ($isAutoLinkNode(parent)) {
              const linkNode = $createLinkNode(parent.getURL(), {
                rel: parent.__rel,
                target: parent.__target,
                title: parent.__title,
              });
              parent.replace(linkNode, true);
            }
          }
        });
      }
      setEditedLinkUrl('https://');
      setIsLinkEditMode(false);
    }
  };

  const preventDefault = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <div
      ref={editorRef}
      className='link-editor absolute top-0 left-0 z-50 opacity-0 bg-base-100 shadow-lg rounded-lg border border-base-300'
    >
      {!isLink ? null : isLinkEditMode ? (
        <div className='flex items-center gap-2 p-2'>
          <input
            ref={inputRef}
            className='input input-bordered input-sm w-[250px] link-input'
            value={editedLinkUrl}
            onChange={event => {
              setEditedLinkUrl(event.target.value);
            }}
            onKeyDown={event => {
              monitorInputInteraction(event);
            }}
            placeholder='Enter URL'
          />
          <button
            className='btn btn-ghost btn-xs'
            onMouseDown={preventDefault}
            onClick={() => {
              setIsLinkEditMode(false);
            }}
            aria-label='Cancel'
            title='Cancel'
          >
            <X className='h-3 w-3' />
          </button>
          <button
            className='btn btn-ghost btn-xs text-success'
            onMouseDown={preventDefault}
            onClick={handleLinkSubmission}
            aria-label='Confirm'
            title='Confirm'
          >
            <Check className='h-3 w-3' />
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-2 p-2'>
          <a
            href={sanitizeUrl(linkUrl)}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:text-primary-focus flex items-center gap-1 text-sm max-w-[250px] truncate'
          >
            <ExternalLink className='h-3 w-3 flex-shrink-0' />
            <span className='truncate'>{linkUrl}</span>
          </a>
          <button
            className='btn btn-ghost btn-xs'
            onMouseDown={preventDefault}
            onClick={(event) => {
              event.preventDefault();
              setEditedLinkUrl(linkUrl);
              setIsLinkEditMode(true);
            }}
            aria-label='Edit link'
            title='Edit link'
          >
            <Edit2 className='h-3 w-3' />
          </button>
          <button
            className='btn btn-ghost btn-xs text-error'
            onMouseDown={preventDefault}
            onClick={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
            }}
            aria-label='Remove link'
            title='Remove link'
          >
            <Trash2 className='h-3 w-3' />
          </button>
        </div>
      )}
    </div>
  );
}

function useFloatingLinkEditorToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
): JSX.Element | null {
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLink, setIsLink] = useState(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);

  useEffect(() => {
    function $updateToolbar() {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const focusNode = getSelectedNode(selection);
        const focusLinkNode = $findMatchingParent(focusNode, $isLinkNode);
        const focusAutoLinkNode = $findMatchingParent(
          focusNode,
          $isAutoLinkNode,
        );
        if (!(focusLinkNode || focusAutoLinkNode)) {
          setIsLink(false);
          return;
        }
        const badNode = selection
          .getNodes()
          .filter(node => !$isLineBreakNode(node))
          .find(node => {
            const linkNode = $findMatchingParent(node, $isLinkNode);
            const autoLinkNode = $findMatchingParent(node, $isAutoLinkNode);
            return (
              (focusLinkNode && !focusLinkNode.is(linkNode)) ||
              (linkNode && !linkNode.is(focusLinkNode)) ||
              (focusAutoLinkNode && !focusAutoLinkNode.is(autoLinkNode)) ||
              (autoLinkNode &&
                (!autoLinkNode.is(focusAutoLinkNode) ||
                  autoLinkNode.getIsUnlinked()))
            );
          });
        if (!badNode) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
      } else if ($isNodeSelection(selection)) {
        const nodes = selection.getNodes();
        if (nodes.length === 0) {
          setIsLink(false);
          return;
        }
        const node = nodes[0];
        const parent = node.getParent();
        if ($isLinkNode(parent) || $isLinkNode(node)) {
          setIsLink(true);
        } else {
          setIsLink(false);
        }
      }
    }

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      
      editor.registerCommand(
        CLICK_COMMAND,
        payload => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkNode = $findMatchingParent(node, $isLinkNode);
            if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey)) {
              window.open(linkNode.getURL(), '_blank');
              return true;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_LINK_COMMAND,
      (payload: string | { url: string } | null) => {
        if (payload === null) {
          setIsLink(false);
          setIsLinkEditMode(false);
        } else {
          const url = typeof payload === 'string' ? payload : payload.url;
          if (url === 'https://') {
            // This is a new link being created from toolbar
            setIsLinkEditMode(true);
          }
        }
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return createPortal(
    <FloatingLinkEditor
      editor={editor}
      isLink={isLink}
      setIsLink={setIsLink}
      anchorElem={anchorElem}
      isLinkEditMode={isLinkEditMode}
      setIsLinkEditMode={setIsLinkEditMode}
    />,
    anchorElem,
  );
}

export default function FloatingLinkEditorPlugin({
  anchorElem,
}: {
  anchorElem: HTMLElement;
}) {
  const [editor] = useLexicalComposerContext();

  return useFloatingLinkEditorToolbar(editor, anchorElem);
}