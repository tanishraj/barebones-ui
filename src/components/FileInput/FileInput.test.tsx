import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createRef } from 'react';

import { FileInput } from './FileInput';

// Mock file for testing
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

type MockFileReader = Pick<
  FileReader,
  'readAsDataURL' | 'onloadend' | 'result'
>;

describe('FileInput', () => {
  it('renders file input element', () => {
    render(<FileInput />);
    const input =
      screen.getByRole('textbox', { hidden: true }) ||
      document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
  });

  it('renders with label', () => {
    render(<FileInput label='Upload File' />);
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('applies size variant classes', () => {
    const { rerender } = render(<FileInput size='xs' />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('file-input-xs');

    rerender(<FileInput size='lg' />);
    expect(input).toHaveClass('file-input-lg');
  });

  it('applies color variant classes', () => {
    const { rerender } = render(<FileInput variant='primary' />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('file-input-primary');

    rerender(<FileInput variant='error' />);
    expect(input).toHaveClass('file-input-error');
  });

  it('applies bordered class when bordered is true', () => {
    const { rerender } = render(<FileInput bordered={true} />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('file-input-bordered');

    rerender(<FileInput bordered={false} />);
    expect(input).not.toHaveClass('file-input-bordered');
  });

  it('handles disabled state', () => {
    render(<FileInput disabled />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('renders helper text', () => {
    render(<FileInput helper='Choose a file to upload' />);
    expect(screen.getByText('Choose a file to upload')).toBeInTheDocument();
  });

  it('renders error message and applies error class', () => {
    render(<FileInput error='File upload failed' />);
    const errorText = screen.getByText('File upload failed');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-error');
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('file-input-error');
  });

  it('renders success message and applies success class', () => {
    render(<FileInput success='File uploaded successfully' />);
    const successText = screen.getByText('File uploaded successfully');
    expect(successText).toBeInTheDocument();
    expect(successText).toHaveClass('text-success');
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('file-input-success');
  });

  it('accepts specific file types', () => {
    render(<FileInput accept='image/*' />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', 'image/*');
  });

  it('allows multiple file selection', () => {
    render(<FileInput multiple />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('multiple');
  });

  it('handles file selection', () => {
    const handleChange = jest.fn();
    render(<FileInput onChange={handleChange} />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = createMockFile('test.txt', 1024, 'text/plain');

    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.any(FileList),
      expect.any(Object),
    );
  });

  it('validates file size', async () => {
    render(
      <FileInput
        maxFileSize={1024} // 1KB
        showFileList
      />,
    );

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const largeFile = createMockFile('large.txt', 2048, 'text/plain'); // 2KB

    Object.defineProperty(input, 'files', {
      value: [largeFile],
      writable: false,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/File\(s\) too large/)).toBeInTheDocument();
    });
  });

  it('validates file types', async () => {
    render(<FileInput acceptedFileTypes={['image']} showFileList />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const textFile = createMockFile('test.txt', 1024, 'text/plain');

    Object.defineProperty(input, 'files', {
      value: [textFile],
      writable: false,
    });

    fireEvent.change(input);

    await waitFor(() => {
      expect(screen.getByText(/Invalid file type/)).toBeInTheDocument();
    });
  });

  it('shows file list when showFileList is true', () => {
    render(<FileInput showFileList />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = createMockFile('test.txt', 1024, 'text/plain');

    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('1 KB')).toBeInTheDocument();
  });

  it('shows image preview when showPreview is true and file is an image', async () => {
    render(<FileInput showPreview />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const imageFile = createMockFile('test.jpg', 2048, 'image/jpeg');

    // Mock FileReader
    const mockFileReader: MockFileReader = {
      readAsDataURL: jest.fn(),
      onloadend: null,
      result: 'data:image/jpeg;base64,test',
    };

    jest
      .spyOn(global, 'FileReader')
      .mockImplementation(() => mockFileReader as unknown as FileReader);

    Object.defineProperty(input, 'files', {
      value: [imageFile],
      writable: false,
    });

    fireEvent.change(input);

    // Trigger the onloadend callback
    if (mockFileReader.onloadend) {
      mockFileReader.onloadend();
    }

    await waitFor(() => {
      const preview = screen.getByAltText('Preview');
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute('src', 'data:image/jpeg;base64,test');
    });
  });

  it('handles file removal from list', () => {
    render(<FileInput showFileList />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = createMockFile('test.txt', 1024, 'text/plain');

    Object.defineProperty(input, 'files', {
      value: [file],
      writable: false,
    });

    fireEvent.change(input);

    expect(screen.getByText('test.txt')).toBeInTheDocument();

    const removeButton = screen.getByLabelText('Remove test.txt');
    fireEvent.click(removeButton);

    expect(screen.queryByText('test.txt')).not.toBeInTheDocument();
  });

  it('handles clear callback', () => {
    const handleClear = jest.fn();
    render(<FileInput onClear={handleClear} showPreview />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const imageFile = createMockFile('test.jpg', 2048, 'image/jpeg');

    // Mock FileReader
    const mockFileReader: MockFileReader = {
      readAsDataURL: jest.fn(),
      onloadend: null,
      result: 'data:image/jpeg;base64,test',
    };

    jest
      .spyOn(global, 'FileReader')
      .mockImplementation(() => mockFileReader as unknown as FileReader);

    Object.defineProperty(input, 'files', {
      value: [imageFile],
      writable: false,
    });

    fireEvent.change(input);

    // Trigger the onloadend callback
    if (mockFileReader.onloadend) {
      mockFileReader.onloadend();
    }

    waitFor(() => {
      const clearButton = screen.getByLabelText('Remove file');
      fireEvent.click(clearButton);
      expect(handleClear).toHaveBeenCalled();
    });
  });

  it('positions label on top by default', () => {
    const { container } = render(
      <FileInput label='Top Label' labelPosition='top' />,
    );
    const formControl = container.querySelector('.form-control');
    const label = container.querySelector('.label');

    expect(formControl).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(label?.querySelector('.label-text')).toHaveTextContent('Top Label');
  });

  it('positions label on the left when specified', () => {
    const { container } = render(
      <FileInput label='Left Label' labelPosition='left' />,
    );
    const labelElement = container.querySelector('.label.cursor-pointer');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('gap-3');
    expect(labelElement?.querySelector('.label-text')).toHaveTextContent(
      'Left Label',
    );
  });

  it('accepts and applies custom className', () => {
    render(<FileInput className='custom-class another-class' />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveClass('custom-class', 'another-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FileInput ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('file');
  });

  it('supports required attribute', () => {
    render(<FileInput required />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeRequired();
  });

  it('handles multiple file selection', () => {
    const handleChange = jest.fn();
    render(<FileInput multiple onChange={handleChange} showFileList />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file1 = createMockFile('test1.txt', 1024, 'text/plain');
    const file2 = createMockFile('test2.txt', 2048, 'text/plain');

    Object.defineProperty(input, 'files', {
      value: [file1, file2],
      writable: false,
    });

    fireEvent.change(input);

    expect(screen.getByText('test1.txt')).toBeInTheDocument();
    expect(screen.getByText('test2.txt')).toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ length: 2 }),
      expect.any(Object),
    );
  });

  it('formats file sizes correctly', () => {
    render(<FileInput showFileList />);

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const smallFile = createMockFile('small.txt', 500, 'text/plain');
    const kbFile = createMockFile('kb.txt', 2048, 'text/plain');
    const mbFile = createMockFile('mb.txt', 2097152, 'text/plain');

    // Test small file
    Object.defineProperty(input, 'files', {
      value: [smallFile],
      writable: false,
    });
    fireEvent.change(input);
    expect(screen.getByText('500 Bytes')).toBeInTheDocument();

    // Test KB file
    Object.defineProperty(input, 'files', {
      value: [kbFile],
      writable: false,
    });
    fireEvent.change(input);
    expect(screen.getByText('2 KB')).toBeInTheDocument();

    // Test MB file
    Object.defineProperty(input, 'files', {
      value: [mbFile],
      writable: false,
    });
    fireEvent.change(input);
    expect(screen.getByText('2 MB')).toBeInTheDocument();
  });
});
