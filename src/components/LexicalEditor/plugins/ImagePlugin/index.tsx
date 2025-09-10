import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  PASTE_COMMAND,
  LexicalCommand,
  LexicalEditor,
} from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { $createImageNode, ImageNode, ImagePayload } from '../../nodes/ImageNode';
import { mergeRegister } from '@lexical/utils';
import { $wrapNodeInElement } from '@lexical/utils';
import { $createParagraphNode } from 'lexical';

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand(
  'INSERT_IMAGE_COMMAND',
);

const ACCEPTABLE_IMAGE_TYPES = [
  'image/',
  'image/heic',
  'image/heif',
  'image/gif',
  'image/webp',
];

export default function ImagePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagePlugin: ImageNode not registered on editor');
    }

    const removeCommand = editor.registerCommand<InsertImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = $createImageNode(payload);
        $insertNodes([imageNode]);
        if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
          $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      removeCommand();
    };
  }, [editor]);

  return null;
}

// Drag and Drop handler
export function DragDropPastePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const removeListeners = mergeRegister(
      // Handle paste
      editor.registerCommand(
        PASTE_COMMAND,
        (event: ClipboardEvent) => {
          const files = event.clipboardData?.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (ACCEPTABLE_IMAGE_TYPES.some(type => file.type.includes(type.replace('/', '')))) {
                event.preventDefault();
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result;
                  if (typeof result === 'string') {
                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                      altText: file.name,
                      src: result,
                    });
                  }
                };
                reader.readAsDataURL(file);
                return true;
              }
            }
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      
      // Handle drop
      editor.registerCommand(
        DROP_COMMAND,
        (event: DragEvent) => {
          const files = event.dataTransfer?.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (ACCEPTABLE_IMAGE_TYPES.some(type => file.type.includes(type.replace('/', '')))) {
                event.preventDefault();
                const reader = new FileReader();
                reader.onload = () => {
                  const result = reader.result;
                  if (typeof result === 'string') {
                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                      altText: file.name,
                      src: result,
                    });
                  }
                };
                reader.readAsDataURL(file);
                return true;
              }
            }
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      
      // Handle dragover to allow drop
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (event: DragEvent) => {
          const files = event.dataTransfer?.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (ACCEPTABLE_IMAGE_TYPES.some(type => file.type.includes(type.replace('/', '')))) {
                event.preventDefault();
                return true;
              }
            }
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );

    return removeListeners;
  }, [editor]);

  return null;
}

// Image Upload Dialog
interface ImageUploadDialogProps {
  onSubmit: (payload: InsertImagePayload) => void;
  onClose: () => void;
}

export const ImageUploadDialog: React.FC<ImageUploadDialogProps> = ({
  onSubmit,
  onClose,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [altText, setAltText] = useState('');
  const [isUrlMode, setIsUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ACCEPTABLE_IMAGE_TYPES.some(type => file.type.includes(type.replace('/', '')))) {
      setAltText(file.name.replace(/\.[^/.]+$/, ''));
      
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (imageUrl) {
      onSubmit({
        altText: altText || 'Image',
        src: imageUrl,
      });
      onClose();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    if (text && (text.startsWith('http') || text.startsWith('data:'))) {
      setImageUrl(text);
      setAltText('Image');
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50' onClick={onClose}>
      <div 
        className='bg-base-100 rounded-lg shadow-xl p-6 w-[400px] max-w-[90vw]'
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className='text-lg font-semibold mb-4'>Add Image</h3>
        
        {!imageUrl ? (
          <>
            <div className='space-y-3'>
              {/* Upload Area */}
              <div 
                className='border-2 border-dashed border-base-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer'
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className='w-10 h-10 mx-auto mb-2 text-base-content/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                </svg>
                <p className='text-sm font-medium'>Click to upload image</p>
                <p className='text-xs text-base-content/50 mt-1'>or drag and drop</p>
              </div>

              {/* URL Input */}
              <div className='divider'>OR</div>
              <input
                type='text'
                className='input input-bordered w-full'
                placeholder='Paste image URL...'
                value={isUrlMode ? imageUrl : ''}
                onChange={(e) => {
                  setIsUrlMode(true);
                  setImageUrl(e.target.value);
                  setAltText('Image');
                }}
                onPaste={handlePaste}
              />
            </div>

            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
          </>
        ) : (
          <>
            {/* Preview */}
            <div className='space-y-3'>
              <div className='relative bg-base-200 rounded-lg p-2'>
                <img
                  src={imageUrl}
                  alt='Preview'
                  className='max-w-full max-h-48 mx-auto rounded'
                  onError={() => {
                    alert('Failed to load image');
                    setImageUrl('');
                    setIsUrlMode(false);
                  }}
                />
                <button
                  className='btn btn-circle btn-sm absolute top-1 right-1'
                  onClick={() => {
                    setImageUrl('');
                    setIsUrlMode(false);
                  }}
                >
                  ✕
                </button>
              </div>

              <input
                type='text'
                className='input input-bordered w-full input-sm'
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder='Alt text (for accessibility)'
              />
            </div>
          </>
        )}

        <div className='flex justify-end gap-2 mt-4'>
          <button className='btn btn-ghost btn-sm' onClick={onClose}>
            Cancel
          </button>
          <button 
            className='btn btn-primary btn-sm' 
            onClick={handleSubmit}
            disabled={!imageUrl}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
};