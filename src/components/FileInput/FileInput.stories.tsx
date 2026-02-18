import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Upload, Camera, Music, FileText, Film } from 'lucide-react';

import { FileInput } from './FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Components/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'File input component based on DaisyUI with preview, file list, and validation features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the file input',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
      ],
      description: 'Color variant of the file input',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border on file input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file input',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    label: {
      control: 'text',
      description: 'Label for the file input',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
      description: 'Position of the label',
    },
    helper: {
      control: 'text',
      description: 'Helper text below input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    success: {
      control: 'text',
      description: 'Success message',
    },
    showPreview: {
      control: 'boolean',
      description: 'Show image preview',
    },
    showFileList: {
      control: 'boolean',
      description: 'Show selected files list',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Choose a file',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Upload Document',
    helper: 'PDF, DOC, or DOCX (max 10MB)',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <FileInput size='xs' label='Extra Small' />
      <FileInput size='sm' label='Small' />
      <FileInput size='md' label='Medium (default)' />
      <FileInput size='lg' label='Large' />
      <FileInput size='xl' label='Extra Large' />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <FileInput variant='primary' label='Primary' />
      <FileInput variant='secondary' label='Secondary' />
      <FileInput variant='accent' label='Accent' />
      <FileInput variant='neutral' label='Neutral' />
      <FileInput variant='info' label='Info' />
      <FileInput variant='success' label='Success' />
      <FileInput variant='warning' label='Warning' />
      <FileInput variant='error' label='Error' />
      <FileInput variant='ghost' label='Ghost (no background)' />
    </div>
  ),
};

export const WithImagePreview: Story = {
  args: {
    label: 'Profile Picture',
    accept: 'image/*',
    showPreview: true,
    helper: 'Upload an image file to see preview',
  },
};

export const WithFileList: Story = {
  args: {
    label: 'Upload Documents',
    multiple: true,
    showFileList: true,
    helper: 'Select multiple files to see the list',
  },
};

export const WithPreviewAndList: Story = {
  args: {
    label: 'Upload Files',
    multiple: true,
    showPreview: true,
    showFileList: true,
    helper: 'Images will show preview, all files will be listed',
  },
};

export const FileTypeRestrictions: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-80'>
      <FileInput
        label='Images Only'
        accept='image/*'
        helper='Only image files allowed'
        showPreview
      />
      <FileInput
        label='PDF Documents'
        accept='.pdf'
        helper='Only PDF files'
        showFileList
      />
      <FileInput label='Audio Files' accept='audio/*' helper='MP3, WAV, etc.' />
      <FileInput
        label='Video Files'
        accept='video/*'
        helper='MP4, AVI, MOV, etc.'
      />
      <FileInput
        label='Specific Types'
        accept='.jpg,.jpeg,.png,.gif'
        helper='JPG, JPEG, PNG, GIF only'
        showPreview
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <FileInput label='With Success' success='File uploaded successfully!' />
      <FileInput
        label='With Error'
        error='File upload failed. Please try again.'
      />
      <FileInput
        label='With Size Limit'
        maxFileSize={1024 * 1024} // 1MB
        helper='Maximum file size: 1MB'
        showFileList
      />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className='flex flex-col gap-6 w-96'>
      <FileInput label='Top Label (Default)' labelPosition='top' />
      <FileInput label='Left Label' labelPosition='left' />
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <FileInput label='Disabled Input' disabled />
      <FileInput label='Disabled with Files' disabled value='document.pdf' />
    </div>
  ),
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload Multiple Files',
    multiple: true,
    showFileList: true,
    helper: 'Select multiple files at once',
  },
};

export const ControlledComponent: Story = {
  render: () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleFileChange = (fileList: FileList | null) => {
      setFiles(fileList);
      if (fileList && fileList.length > 0) {
        setUploadStatus(`Selected ${fileList.length} file(s)`);
      } else {
        setUploadStatus('');
      }
    };

    const handleUpload = () => {
      if (files && files.length > 0) {
        setUploadStatus('Uploading...');
        setTimeout(() => {
          setUploadStatus('Upload complete!');
        }, 2000);
      }
    };

    return (
      <div className='w-80 space-y-4'>
        <FileInput
          label='Controlled File Input'
          onChange={handleFileChange}
          showFileList
          multiple
          helper={uploadStatus}
        />
        <button
          className='btn btn-primary w-full'
          onClick={handleUpload}
          disabled={!files || files.length === 0}
        >
          Upload Files
        </button>
      </div>
    );
  },
};

export const ImageUploader: Story = {
  render: () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (files: FileList | null) => {
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreview(null);
      }
    };

    const handleUpload = () => {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        setPreview(null);
      }, 2000);
    };

    return (
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>
            <Camera className='h-5 w-5' />
            Profile Picture
          </h2>

          {preview && (
            <div className='flex justify-center my-4'>
              <div className='avatar'>
                <div className='w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={preview} alt='Preview' />
                </div>
              </div>
            </div>
          )}

          <FileInput
            label='Choose Image'
            accept='image/*'
            onChange={handleFileChange}
            helper='JPG, PNG or GIF (max 5MB)'
            maxFileSize={5 * 1024 * 1024}
          />

          <div className='card-actions justify-end mt-4'>
            <button
              className={`btn btn-primary ${uploading ? 'loading' : ''}`}
              onClick={handleUpload}
              disabled={!preview || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const DocumentUploadForm: Story = {
  render: () => (
    <form className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Submit Application</h2>

        <FileInput
          label='Resume/CV *'
          accept='.pdf,.doc,.docx'
          helper='PDF or Word document (max 2MB)'
          maxFileSize={2 * 1024 * 1024}
          required
          showFileList
        />

        <FileInput
          label='Cover Letter'
          accept='.pdf,.doc,.docx'
          helper='Optional'
          maxFileSize={2 * 1024 * 1024}
          showFileList
        />

        <FileInput
          label='Portfolio'
          accept='.pdf,.zip'
          helper='PDF or ZIP file (max 10MB)'
          maxFileSize={10 * 1024 * 1024}
          showFileList
        />

        <FileInput
          label='References'
          accept='.pdf,.doc,.docx'
          helper='Up to 3 files'
          maxFileSize={2 * 1024 * 1024}
          multiple
          showFileList
        />

        <div className='card-actions justify-end mt-4'>
          <button type='button' className='btn btn-ghost'>
            Cancel
          </button>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    </form>
  ),
};

export const MediaUploader: Story = {
  render: () => {
    const [selectedType, setSelectedType] = useState('image');

    const getAcceptType = () => {
      switch (selectedType) {
        case 'image':
          return 'image/*';
        case 'video':
          return 'video/*';
        case 'audio':
          return 'audio/*';
        case 'document':
          return '.pdf,.doc,.docx,.txt';
        default:
          return '*';
      }
    };

    const getIcon = () => {
      switch (selectedType) {
        case 'image':
          return <Camera className='h-4 w-4' />;
        case 'video':
          return <Film className='h-4 w-4' />;
        case 'audio':
          return <Music className='h-4 w-4' />;
        case 'document':
          return <FileText className='h-4 w-4' />;
        default:
          return <Upload className='h-4 w-4' />;
      }
    };

    return (
      <div className='w-96 space-y-4'>
        <div className='tabs tabs-boxed'>
          <button
            className={`tab ${selectedType === 'image' ? 'tab-active' : ''}`}
            onClick={() => setSelectedType('image')}
          >
            Images
          </button>
          <button
            className={`tab ${selectedType === 'video' ? 'tab-active' : ''}`}
            onClick={() => setSelectedType('video')}
          >
            Videos
          </button>
          <button
            className={`tab ${selectedType === 'audio' ? 'tab-active' : ''}`}
            onClick={() => setSelectedType('audio')}
          >
            Audio
          </button>
          <button
            className={`tab ${selectedType === 'document' ? 'tab-active' : ''}`}
            onClick={() => setSelectedType('document')}
          >
            Documents
          </button>
        </div>

        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <div className='flex items-center gap-2 mb-2'>
              {getIcon()}
              <span className='font-semibold capitalize'>
                Upload {selectedType}
              </span>
            </div>

            <FileInput
              accept={getAcceptType()}
              showPreview={selectedType === 'image'}
              showFileList
              multiple
              helper={`Select ${selectedType} files to upload`}
            />

            <button className='btn btn-primary mt-4'>
              <Upload className='h-4 w-4' />
              Upload Files
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className='flex flex-col gap-4 w-80'>
      <FileInput label='Rounded' className='!rounded-full' />
      <FileInput label='With Shadow' className='shadow-lg' />
      <FileInput
        label='Custom Border'
        className='!border-2 !border-dashed !border-primary'
      />
    </div>
  ),
};
