import { type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, useRef, ChangeEvent } from 'react';
import { Upload, X, File, FileText, Image, Music, Video, Archive } from 'lucide-react';

import { fileInputStyles } from './FileInput.styles';
import { cn } from '../../utils';

export type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange'> &
  VariantProps<typeof fileInputStyles> & {
    label?: string;
    labelPosition?: 'top' | 'left';
    helper?: React.ReactNode;
    error?: React.ReactNode;
    success?: React.ReactNode;
    onChange?: (files: FileList | null, event: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    showPreview?: boolean;
    showFileList?: boolean;
    maxFileSize?: number; // in bytes
    acceptedFileTypes?: string[];
    buttonText?: string;
  };

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return <Image className='h-4 w-4' />;
  if (fileType.startsWith('video/')) return <Video className='h-4 w-4' />;
  if (fileType.startsWith('audio/')) return <Music className='h-4 w-4' />;
  if (fileType.includes('pdf')) return <FileText className='h-4 w-4' />;
  if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) 
    return <Archive className='h-4 w-4' />;
  return <File className='h-4 w-4' />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      size,
      variant,
      bordered,
      label,
      labelPosition = 'top',
      helper,
      error,
      success,
      disabled,
      onChange,
      onClear,
      showPreview = false,
      showFileList = false,
      maxFileSize,
      acceptedFileTypes,
      accept,
      multiple,
      buttonText,
      ...props
    },
    ref,
  ) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const combinedRef = ref || fileInputRef;

    const fileInputClassName = cn(
      fileInputStyles({ size, variant, bordered }),
      (error || validationError) && 'file-input-error',
      success && 'file-input-success',
      disabled && 'opacity-50 cursor-not-allowed',
      className,
    );

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      setValidationError(null);

      if (!files || files.length === 0) {
        setSelectedFiles([]);
        setPreview(null);
        onChange?.(null, e);
        return;
      }

      // Validate file size
      if (maxFileSize) {
        const oversizedFiles = Array.from(files).filter(file => file.size > maxFileSize);
        if (oversizedFiles.length > 0) {
          setValidationError(
            `File(s) too large. Maximum size is ${formatFileSize(maxFileSize)}`
          );
          return;
        }
      }

      // Validate file types
      if (acceptedFileTypes && acceptedFileTypes.length > 0) {
        const invalidFiles = Array.from(files).filter(
          file => !acceptedFileTypes.some(type => file.type.includes(type))
        );
        if (invalidFiles.length > 0) {
          setValidationError(
            `Invalid file type(s). Accepted types: ${acceptedFileTypes.join(', ')}`
          );
          return;
        }
      }

      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      // Generate preview for first image file
      if (showPreview && fileArray[0]?.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(fileArray[0]);
      } else {
        setPreview(null);
      }

      onChange?.(files, e);
    };

    const handleClear = () => {
      setSelectedFiles([]);
      setPreview(null);
      setValidationError(null);
      if (combinedRef && typeof combinedRef !== 'function' && combinedRef.current) {
        combinedRef.current.value = '';
      }
      onClear?.();
    };

    const handleRemoveFile = (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      
      if (newFiles.length === 0) {
        setPreview(null);
        if (combinedRef && typeof combinedRef !== 'function' && combinedRef.current) {
          combinedRef.current.value = '';
        }
      }
    };

    const inputElement = (
      <div className='w-full'>
        <input
          type='file'
          className={fileInputClassName}
          disabled={disabled}
          ref={combinedRef}
          accept={accept || acceptedFileTypes?.join(',')}
          multiple={multiple}
          onChange={handleFileChange}
          {...props}
        />
        
        {/* Preview */}
        {showPreview && preview && (
          <div className='mt-2'>
            <div className='relative inline-block'>
              <img 
                src={preview} 
                alt='Preview' 
                className='h-32 w-32 object-cover rounded-lg border border-base-300'
              />
              {!disabled && (
                <button
                  type='button'
                  onClick={handleClear}
                  className='absolute -top-2 -right-2 btn btn-circle btn-xs btn-error'
                  aria-label='Remove file'
                >
                  <X className='h-3 w-3' />
                </button>
              )}
            </div>
          </div>
        )}

        {/* File List */}
        {showFileList && selectedFiles.length > 0 && (
          <div className='mt-2 space-y-1'>
            {selectedFiles.map((file, index) => (
              <div 
                key={`${file.name}-${index}`}
                className='flex items-center justify-between p-2 bg-base-200 rounded-lg'
              >
                <div className='flex items-center gap-2'>
                  {getFileIcon(file.type)}
                  <div className='text-sm'>
                    <div className='font-medium'>{file.name}</div>
                    <div className='text-xs text-base-content/60'>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
                {!disabled && (
                  <button
                    type='button'
                    onClick={() => handleRemoveFile(index)}
                    className='btn btn-ghost btn-xs'
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className='h-3 w-3' />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Helper text */}
        {(helper || error || validationError || success) && (
          <div className='label'>
            <span className={cn(
              'label-text-alt',
              (error || validationError) && 'text-error',
              success && 'text-success',
            )}>
              {error || validationError || success || helper}
            </span>
          </div>
        )}
      </div>
    );

    if (!label) {
      return inputElement;
    }

    if (labelPosition === 'left') {
      return (
        <div className='form-control'>
          <label className='label cursor-pointer gap-3'>
            <span className='label-text'>{label}</span>
            {inputElement}
          </label>
        </div>
      );
    }

    // Default: labelPosition === 'top'
    return (
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>{label}</span>
        </label>
        {inputElement}
      </div>
    );
  },
);

FileInput.displayName = 'FileInput';