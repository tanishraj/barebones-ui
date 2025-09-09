import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import LexicalEditor from './LexicalEditor';

const meta: Meta<typeof LexicalEditor> = {
  title: 'Components/LexicalEditor',
  component: LexicalEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
      defaultValue: 'Start typing...',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the editor',
      defaultValue: false,
    },
    readOnly: {
      control: 'boolean',
      description: 'Make editor read-only',
      defaultValue: false,
    },
    showToolbar: {
      control: 'boolean',
      description: 'Show formatting toolbar',
      defaultValue: true,
    },
    autoFocus: {
      control: 'boolean',
      description: 'Auto focus on mount',
      defaultValue: true,
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height',
      defaultValue: '150px',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height',
      defaultValue: '500px',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '200px',
    maxHeight: '500px',
  },
  render: args => {
    return (
      <div className='w-full'>
        <LexicalEditor {...args} />
        <div className='mt-4 text-sm text-base-content/70'>
          <p>💡 Tips:</p>
          <ul className='list-disc list-inside ml-4 mt-2 space-y-1'>
            <li>
              Use the dropdown to change text to headings (H1-H6) or normal
              paragraph
            </li>
            <li>Use the toolbar buttons to format text</li>
            <li>
              Select text and apply bold (Ctrl+B), italic (Ctrl+I), or underline
              (Ctrl+U)
            </li>
            <li>Create lists with the list buttons</li>
            <li>Add links by selecting text and clicking the link button</li>
            <li>Insert mathematical equations with the Σ button</li>
            <li>Create tables with the table button</li>
            <li>Use Ctrl+Z/Ctrl+Y for undo/redo</li>
          </ul>
        </div>
      </div>
    );
  },
};

export const WithTables: Story = {
  args: {
    placeholder: 'Click the table icon to insert a table...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '350px',
    maxHeight: '600px',
  },
  render: args => {
    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>
              📊 Table Support - Aligned with Lexical Playground
            </h4>
            <p className='mt-2'>
              Create and manage tables with powerful features:
            </p>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>Click the table icon in the toolbar to insert a table</li>
              <li>
                Choose table dimensions using the grid selector (hover over
                cells)
              </li>
              <li>First row is automatically formatted as header row</li>
              <li>
                Click on any table cell to see the action menu (chevron button)
              </li>
              <li>Use Tab key to navigate between cells</li>
              <li>Shift+Tab to go back to previous cell</li>
            </ul>
            <div className='mt-3 grid grid-cols-2 gap-4'>
              <div>
                <p className='font-semibold'>Table Actions Menu:</p>
                <ul className='list-disc list-inside mt-1 text-sm'>
                  <li>Insert row above/below</li>
                  <li>Insert column left/right</li>
                  <li>Delete row</li>
                  <li>Delete column</li>
                  <li>Delete entire table</li>
                </ul>
              </div>
              <div>
                <p className='font-semibold'>Navigation:</p>
                <ul className='list-disc list-inside mt-1 text-sm'>
                  <li>Tab - Next cell</li>
                  <li>Shift+Tab - Previous cell</li>
                  <li>Arrow keys - Move within cell</li>
                  <li>Enter - New line in cell</li>
                </ul>
              </div>
            </div>
            <div className='mt-3 p-2 bg-base-200 rounded'>
              <p className='text-xs'>
                <strong>💡 Tip:</strong> Tables have row headers by default
                (first row). The table cell action menu appears when you select
                a cell.
              </p>
            </div>
          </div>
        </div>

        <LexicalEditor {...args} />
      </div>
    );
  },
};

export const WithEquations: Story = {
  args: {
    placeholder: 'Click the Σ button to insert mathematical equations...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '250px',
    maxHeight: '500px',
  },
  render: args => {
    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>📐 Mathematical Equations Support</h4>
            <p className='mt-2'>
              This editor supports LaTeX mathematical expressions using KaTeX.
            </p>
            <ol className='list-decimal list-inside mt-2 space-y-1'>
              <li>Click the Σ (Sigma) button in the toolbar</li>
              <li>Enter a LaTeX expression (e.g., x^2 + y^2 = z^2)</li>
              <li>Choose between inline or block display</li>
              <li>Preview your equation in real-time</li>
              <li>Click on any equation to edit it</li>
            </ol>
            <div className='mt-3'>
              <p className='font-semibold'>Example equations to try:</p>
              <ul className='list-disc list-inside mt-1 text-sm'>
                <li>
                  Quadratic: x = \frac{'{-b \\pm \\sqrt{b^2-4ac}}'}
                  {'{2a}'}
                </li>
                <li>Integral: \int_a^b f(x)dx</li>
                <li>
                  Matrix: \begin{'{pmatrix}'} a & b \\ c & d \end{'{pmatrix}'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <LexicalEditor {...args} />
      </div>
    );
  },
};

export const WithLinks: Story = {
  args: {
    placeholder: 'Select text and click the link button to add a link...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '200px',
    maxHeight: '500px',
  },
  render: args => {
    const [content, setContent] = useState('');

    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>How to use links:</h4>
            <ol className='list-decimal list-inside mt-2 space-y-1'>
              <li>Select some text in the editor</li>
              <li>Click the link button (🔗) in the toolbar</li>
              <li>Enter a URL in the floating input field</li>
              <li>Click save (✓) to apply the link or cancel (✕) to abort</li>
              <li>Click on a linked text to see edit/delete options</li>
            </ol>
          </div>
        </div>

        <LexicalEditor {...args} onChange={setContent} value={undefined} />

        {content && (
          <div className='mt-4 p-4 bg-base-200 rounded-lg'>
            <p className='text-sm font-semibold mb-2'>Editor content:</p>
            <pre className='text-xs whitespace-pre-wrap'>{content}</pre>
          </div>
        )}
      </div>
    );
  },
};

export const Playground: Story = {
  args: {
    placeholder: 'Start typing to test all features...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: true,
    minHeight: '400px',
    maxHeight: '600px',
  },
  render: args => {
    const [content, setContent] = useState('');

    return (
      <div className='w-full'>
        <div className='mb-4'>
          <h3 className='text-lg font-bold mb-2'>
            🎮 Full-Featured Playground
          </h3>
          <p className='text-sm text-base-content/70'>
            Test all editor features: rich text formatting, tables, equations,
            links, and more.
          </p>
        </div>

        <LexicalEditor {...args} onChange={setContent} />

        <div className='mt-6 grid grid-cols-3 gap-4'>
          <div className='card bg-base-200'>
            <div className='card-body p-4'>
              <h4 className='card-title text-sm'>Text Formatting</h4>
              <ul className='text-xs space-y-1'>
                <li>
                  • <strong>Bold</strong>: Ctrl+B
                </li>
                <li>
                  • <em>Italic</em>: Ctrl+I
                </li>
                <li>
                  • <u>Underline</u>: Ctrl+U
                </li>
                <li>
                  • <s>Strikethrough</s>: Button
                </li>
                <li>
                  • <code>Code</code>: Button
                </li>
              </ul>
            </div>
          </div>

          <div className='card bg-base-200'>
            <div className='card-body p-4'>
              <h4 className='card-title text-sm'>Block Types</h4>
              <ul className='text-xs space-y-1'>
                <li>• Headings: H1-H6</li>
                <li>• Paragraph: Normal</li>
                <li>• Lists: Bullet/Numbered</li>
                <li>• Quotes: Blockquote</li>
                <li>• Code blocks</li>
              </ul>
            </div>
          </div>

          <div className='card bg-base-200'>
            <div className='card-body p-4'>
              <h4 className='card-title text-sm'>Advanced</h4>
              <ul className='text-xs space-y-1'>
                <li>• Tables with actions</li>
                <li>• Math equations (LaTeX)</li>
                <li>• Links with editor</li>
                <li>• Auto-link detection</li>
                <li>• Undo/Redo history</li>
              </ul>
            </div>
          </div>
        </div>

        {content && (
          <details className='mt-4'>
            <summary className='cursor-pointer text-sm font-semibold'>
              Show raw content
            </summary>
            <div className='mt-2 p-3 bg-base-200 rounded text-xs'>
              <pre className='whitespace-pre-wrap'>{content}</pre>
            </div>
          </details>
        )}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This editor is disabled',
    showToolbar: true,
    disabled: true,
    readOnly: false,
    autoFocus: false,
    minHeight: '150px',
    maxHeight: '500px',
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'This editor is read-only',
    showToolbar: false,
    disabled: false,
    readOnly: true,
    autoFocus: false,
    minHeight: '150px',
    maxHeight: '500px',
  },
};

export const NoToolbar: Story = {
  args: {
    placeholder: 'Editor without toolbar - use keyboard shortcuts',
    showToolbar: false,
    disabled: false,
    readOnly: false,
    autoFocus: true,
    minHeight: '150px',
    maxHeight: '500px',
  },
};

export const CustomHeight: Story = {
  args: {
    placeholder: 'Custom height editor',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '100px',
    maxHeight: '300px',
  },
};
