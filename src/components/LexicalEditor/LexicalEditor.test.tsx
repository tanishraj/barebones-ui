import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LexicalEditor } from './LexicalEditor';

describe('LexicalEditor', () => {
  beforeEach(() => {
    // Reset any mocks
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the editor', () => {
      render(<LexicalEditor />);
      const editor = screen.getByRole('textbox');
      expect(editor).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      const placeholder = 'Enter text here...';
      render(<LexicalEditor placeholder={placeholder} />);
      const editor = screen.getByPlaceholderText(placeholder);
      expect(editor).toBeInTheDocument();
    });

    it('should render toolbar when showToolbar is true', () => {
      render(<LexicalEditor showToolbar={true} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toBeInTheDocument();
    });

    it('should not render toolbar when showToolbar is false', () => {
      render(<LexicalEditor showToolbar={false} />);
      const toolbar = screen.queryByRole('toolbar');
      expect(toolbar).not.toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<LexicalEditor className="custom-class" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('should apply min and max height styles', () => {
      const { container } = render(
        <LexicalEditor minHeight="200px" maxHeight="400px" />
      );
      const editorContainer = container.querySelector('.editor-container');
      expect(editorContainer).toHaveStyle({ minHeight: '200px', maxHeight: '400px' });
    });
  });

  describe('Functionality', () => {
    it('should call onChange when content changes', async () => {
      const onChange = vi.fn();
      render(<LexicalEditor onChange={onChange} />);
      
      const editor = screen.getByRole('textbox');
      await userEvent.type(editor, 'Hello World');
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });

    it('should be disabled when disabled prop is true', () => {
      render(<LexicalEditor disabled={true} />);
      const editor = screen.getByRole('textbox');
      expect(editor).toHaveAttribute('contenteditable', 'false');
    });

    it('should be read-only when readOnly prop is true', () => {
      render(<LexicalEditor readOnly={true} />);
      const editor = screen.getByRole('textbox');
      expect(editor).toHaveAttribute('contenteditable', 'false');
    });

    it('should auto focus when autoFocus is true', () => {
      render(<LexicalEditor autoFocus={true} />);
      const editor = screen.getByRole('textbox');
      expect(document.activeElement).toBe(editor);
    });

    it('should call onFocus when editor is focused', async () => {
      const onFocus = vi.fn();
      render(<LexicalEditor onFocus={onFocus} />);
      
      const editor = screen.getByRole('textbox');
      fireEvent.focus(editor);
      
      await waitFor(() => {
        expect(onFocus).toHaveBeenCalled();
      });
    });

    it('should call onBlur when editor loses focus', async () => {
      const onBlur = vi.fn();
      render(<LexicalEditor onBlur={onBlur} />);
      
      const editor = screen.getByRole('textbox');
      fireEvent.focus(editor);
      fireEvent.blur(editor);
      
      await waitFor(() => {
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('Toolbar Actions', () => {
    it('should toggle bold formatting', async () => {
      render(<LexicalEditor showToolbar={true} />);
      
      const boldButton = screen.getByLabelText('Bold');
      const editor = screen.getByRole('textbox');
      
      // Type some text
      await userEvent.type(editor, 'Hello World');
      
      // Select all text
      await userEvent.keyboard('{Control>}a{/Control}');
      
      // Click bold button
      await userEvent.click(boldButton);
      
      expect(boldButton).toHaveClass('active');
    });

    it('should toggle italic formatting', async () => {
      render(<LexicalEditor showToolbar={true} />);
      
      const italicButton = screen.getByLabelText('Italic');
      const editor = screen.getByRole('textbox');
      
      await userEvent.type(editor, 'Hello World');
      await userEvent.keyboard('{Control>}a{/Control}');
      await userEvent.click(italicButton);
      
      expect(italicButton).toHaveClass('active');
    });

    it('should undo and redo actions', async () => {
      const onChange = vi.fn();
      render(<LexicalEditor showToolbar={true} onChange={onChange} />);
      
      const editor = screen.getByRole('textbox');
      const undoButton = screen.getByLabelText('Undo');
      const redoButton = screen.getByLabelText('Redo');
      
      // Initially, undo should be disabled
      expect(undoButton).toBeDisabled();
      expect(redoButton).toBeDisabled();
      
      // Type some text
      await userEvent.type(editor, 'Hello');
      
      // Undo should now be enabled
      await waitFor(() => {
        expect(undoButton).not.toBeDisabled();
      });
      
      // Click undo
      await userEvent.click(undoButton);
      
      // Redo should now be enabled
      await waitFor(() => {
        expect(redoButton).not.toBeDisabled();
      });
    });

    it('should open link editor when link button is clicked', async () => {
      render(<LexicalEditor showToolbar={true} />);
      
      const editor = screen.getByRole('textbox');
      const linkButton = screen.getByLabelText('Insert Link');
      
      // Type and select text
      await userEvent.type(editor, 'Click here');
      await userEvent.keyboard('{Control>}a{/Control}');
      
      // Click link button
      await userEvent.click(linkButton);
      
      // Link input should appear
      await waitFor(() => {
        const linkInput = screen.getByPlaceholderText('Enter URL');
        expect(linkInput).toBeInTheDocument();
      });
    });
  });

  describe('Link Editing', () => {
    it('should create a link with entered URL', async () => {
      const onChange = vi.fn();
      render(<LexicalEditor showToolbar={true} onChange={onChange} />);
      
      const editor = screen.getByRole('textbox');
      const linkButton = screen.getByLabelText('Insert Link');
      
      // Type and select text
      await userEvent.type(editor, 'Example');
      await userEvent.keyboard('{Control>}a{/Control}');
      
      // Open link editor
      await userEvent.click(linkButton);
      
      // Enter URL
      const linkInput = await screen.findByPlaceholderText('Enter URL');
      await userEvent.clear(linkInput);
      await userEvent.type(linkInput, 'https://example.com');
      
      // Confirm link
      const confirmButton = screen.getByLabelText('Confirm link');
      await userEvent.click(confirmButton);
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalled();
      });
    });

    it('should cancel link creation on escape key', async () => {
      render(<LexicalEditor showToolbar={true} />);
      
      const editor = screen.getByRole('textbox');
      const linkButton = screen.getByLabelText('Insert Link');
      
      // Type and select text
      await userEvent.type(editor, 'Example');
      await userEvent.keyboard('{Control>}a{/Control}');
      
      // Open link editor
      await userEvent.click(linkButton);
      
      // Press escape
      const linkInput = await screen.findByPlaceholderText('Enter URL');
      await userEvent.keyboard('{Escape}');
      
      // Link input should disappear
      await waitFor(() => {
        expect(linkInput).not.toBeInTheDocument();
      });
    });
  });
});