import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback, useRef } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

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

export const WithImages: Story = {
  args: {
    placeholder: 'Insert images via upload, paste, or drag & drop...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '400px',
    maxHeight: '600px',
  },
  render: args => {
    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>🖼️ Image Support with Resizing</h4>
            <p className='mt-2'>
              Insert and resize images using three different methods.
            </p>
            <div className='mt-3 grid grid-cols-3 gap-4'>
              <div>
                <p className='font-semibold text-sm'>📤 Upload</p>
                <ul className='text-xs mt-1 space-y-1'>
                  <li>• Click the image button in toolbar</li>
                  <li>• Select "Upload File"</li>
                  <li>• Choose image from your device</li>
                  <li>• Add alt text for accessibility</li>
                </ul>
              </div>
              <div>
                <p className='font-semibold text-sm'>📋 Paste</p>
                <ul className='text-xs mt-1 space-y-1'>
                  <li>• Copy an image to clipboard</li>
                  <li>• Click in the editor</li>
                  <li>• Press Ctrl+V (Cmd+V on Mac)</li>
                  <li>• Image appears instantly</li>
                </ul>
              </div>
              <div>
                <p className='font-semibold text-sm'>🎯 Drag & Drop</p>
                <ul className='text-xs mt-1 space-y-1'>
                  <li>• Drag image file from desktop</li>
                  <li>• Drop it into the editor</li>
                  <li>• Position cursor where needed</li>
                  <li>• Works with multiple files</li>
                </ul>
              </div>
            </div>
            <div className='mt-3 p-2 bg-base-200 rounded'>
              <p className='text-xs'>
                <strong>💡 Tips:</strong> 
                • Click on an image to select it
                • Drag the corner handles to resize (maintains aspect ratio)
                • Press Delete or Backspace to remove selected image
                • Press Escape to deselect image
                • Images are automatically constrained to editor width
                • Supports JPEG, PNG, GIF, WebP, and HEIC/HEIF formats
              </p>
            </div>
            <div className='mt-3 p-2 bg-warning/20 border border-warning rounded'>
              <p className='text-xs font-semibold'>🔄 Resizing Feature:</p>
              <p className='text-xs mt-1'>
                Select any image to see resize handles at the corners. Drag any corner to resize while maintaining aspect ratio.
              </p>
            </div>
          </div>
        </div>

        <LexicalEditor {...args} />

        <div className='mt-4 p-4 bg-base-200 rounded-lg'>
          <p className='text-sm font-semibold mb-2'>Supported Formats:</p>
          <div className='flex flex-wrap gap-2'>
            {['JPEG', 'PNG', 'GIF', 'WebP', 'HEIC', 'HEIF'].map(format => (
              <span key={format} className='badge badge-outline badge-sm'>
                {format}
              </span>
            ))}
          </div>
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

export const WithLists: Story = {
  args: {
    placeholder: 'Create lists and use Tab/Shift+Tab for indentation...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '300px',
    maxHeight: '500px',
  },
  render: args => {
    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>📝 List Indentation with Tab Key</h4>
            <p className='mt-2'>
              Create nested lists easily using Tab and Shift+Tab keys for indentation.
            </p>
            <div className='mt-3 grid grid-cols-2 gap-4'>
              <div>
                <p className='font-semibold text-sm'>Keyboard Shortcuts:</p>
                <ul className='text-xs mt-1 space-y-1 list-disc list-inside'>
                  <li><kbd className='kbd kbd-xs'>Tab</kbd> - Indent list item</li>
                  <li><kbd className='kbd kbd-xs'>Shift+Tab</kbd> - Outdent list item</li>
                  <li><kbd className='kbd kbd-xs'>Enter</kbd> - New list item</li>
                  <li><kbd className='kbd kbd-xs'>Enter×2</kbd> - Exit list</li>
                </ul>
              </div>
              <div>
                <p className='font-semibold text-sm'>Try this:</p>
                <ol className='text-xs mt-1 space-y-1 list-decimal list-inside'>
                  <li>Click the bullet or numbered list button</li>
                  <li>Type your first item</li>
                  <li>Press Enter for a new item</li>
                  <li>Press Tab to indent (create sub-list)</li>
                  <li>Press Shift+Tab to outdent</li>
                </ol>
              </div>
            </div>
            <div className='mt-3 p-2 bg-base-200 rounded'>
              <p className='text-xs'>
                <strong>💡 Tip:</strong> You can create mixed nested lists - numbered lists inside bullet lists and vice versa!
              </p>
            </div>
          </div>
        </div>

        <LexicalEditor {...args} />

        <div className='mt-4 p-4 bg-base-200 rounded-lg'>
          <p className='text-sm font-semibold mb-2'>Example Structure:</p>
          <div className='text-xs space-y-1'>
            <div>• Main Topic 1</div>
            <div className='ml-4'>◦ Subtopic 1.1</div>
            <div className='ml-8'>▪ Detail 1.1.1</div>
            <div className='ml-8'>▪ Detail 1.1.2</div>
            <div className='ml-4'>◦ Subtopic 1.2</div>
            <div>• Main Topic 2</div>
            <div className='ml-4'>1. Numbered item</div>
            <div className='ml-8'>a. Sub-item</div>
          </div>
        </div>
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

export const WithSources: Story = {
  args: {
    placeholder: 'Click the sparkles icon to add source citations...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '250px',
    maxHeight: '500px',
  },
  render: args => {
    const sources = [
      {
        id: '1',
        title: 'Introduction to React',
        url: 'https://react.dev/learn',
        author: 'React Team',
        snippet: 'React is a JavaScript library for building user interfaces.',
      },
      {
        id: '2',
        title: 'Understanding Hooks',
        url: 'https://react.dev/reference/react',
        author: 'React Team',
        snippet:
          'Hooks let you use state and other React features without writing a class.',
      },
      {
        id: '3',
        title: 'Advanced Patterns',
        url: 'https://react.dev/learn/advanced',
        author: 'React Community',
        snippet:
          'Advanced React patterns help you build more scalable applications.',
      },
    ];

    return (
      <div className='w-full'>
        <div className='alert alert-info mb-4'>
          <div>
            <h4 className='font-bold'>
              ✨ Source Citations with React Tooltip
            </h4>
            <p className='mt-2'>
              Simple integration with React Tooltip - just pass sources and add
              your tooltip!
            </p>
            <ol className='list-decimal list-inside mt-2 space-y-1'>
              <li>Click the sparkles (✨) button in the toolbar</li>
              <li>Enter source numbers (e.g., "1, 2, 3" or "1,2,3")</li>
              <li>Citations appear as numbered circles: [1], [2,3]</li>
              <li>Hover over citations to see React Tooltip</li>
              <li>Click citations to open source URLs (if URL provided)</li>
            </ol>
            <div className='mt-3'>
              <p className='font-semibold'>Available sources for this demo:</p>
              <ul className='list-disc list-inside mt-1 text-sm'>
                {sources.map(source => (
                  <li key={source.id}>
                    Source {source.id}: {source.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <LexicalEditor
          {...args}
          sources={sources}
          sourceTooltipId='source-tooltip'
        />

        <Tooltip
          id='source-tooltip'
          place='top'
          className='!bg-base-100 !text-base-content !opacity-100 !shadow-xl !border !border-base-300 !z-50'
          render={({ content }) => {
            const source = sources.find(s => s.id === content);
            if (!source) return null;

            return (
              <div className='max-w-xs p-2'>
                <div className='font-semibold text-sm'>{source.title}</div>
                {source.author && (
                  <div className='text-xs opacity-70 mt-1'>
                    by {source.author}
                  </div>
                )}
                {source.snippet && (
                  <div className='text-xs mt-2 opacity-80'>
                    {source.snippet}
                  </div>
                )}
                {source.url && (
                  <div className='text-xs mt-2 text-primary'>
                    Click to visit source
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    );
  },
};

export const ResearchPaperExample: Story = {
  args: {
    placeholder: 'Write your research paper with citations...',
    showToolbar: true,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    minHeight: '350px',
    maxHeight: '600px',
  },
  render: args => {
    const researchSources = [
      {
        id: '1',
        title: 'Machine Learning: A Probabilistic Perspective',
        author: 'Kevin P. Murphy',
        year: 2012,
        type: 'Book',
        publisher: 'MIT Press',
      },
      {
        id: '2',
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        year: 2016,
        type: 'Book',
        url: 'https://www.deeplearningbook.org/',
      },
      {
        id: '3',
        title: 'Attention Is All You Need',
        author: 'Vaswani et al.',
        year: 2017,
        type: 'Paper',
        conference: 'NeurIPS',
        url: 'https://arxiv.org/abs/1706.03762',
      },
      {
        id: '4',
        title: 'BERT: Pre-training of Deep Bidirectional Transformers',
        author: 'Devlin et al.',
        year: 2018,
        type: 'Paper',
        conference: 'NAACL',
        url: 'https://arxiv.org/abs/1810.04805',
      },
      {
        id: '5',
        title: 'GPT-3: Language Models are Few-Shot Learners',
        author: 'Brown et al.',
        year: 2020,
        type: 'Paper',
        conference: 'NeurIPS',
        url: 'https://arxiv.org/abs/2005.14165',
      },
    ];

    return (
      <div className='w-full'>
        <div className='alert alert-warning mb-4'>
          <div>
            <h4 className='font-bold'>📚 Academic Research Paper Example</h4>
            <p className='mt-2 text-sm'>
              Academic-style citations with React Tooltip showing paper details.
            </p>
            <div className='mt-3 grid grid-cols-2 gap-4'>
              <div>
                <p className='font-semibold text-sm'>Available Citations:</p>
                <ul className='text-xs mt-1 space-y-1'>
                  {researchSources.map(source => (
                    <li key={source.id}>
                      [{source.id}] {source.title.substring(0, 30)}...
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className='font-semibold text-sm'>Try writing:</p>
                <p className='text-xs mt-1'>
                  "The transformer architecture [3] revolutionized NLP.
                  Subsequent models like BERT [4] and GPT-3 [5] built upon this
                  foundation."
                </p>
              </div>
            </div>
          </div>
        </div>

        <LexicalEditor
          {...args}
          sources={researchSources}
          sourceTooltipId='academic-tooltip'
        />

        <Tooltip
          id='academic-tooltip'
          place='top'
          className='!bg-base-100 !text-base-content !opacity-100 !shadow-2xl !border !border-base-300 !z-50 !max-w-sm'
          render={({ content }) => {
            const source = researchSources.find(s => s.id === content);
            if (!source) return null;

            return (
              <div className='p-3'>
                <div className='font-semibold text-sm'>{source.title}</div>
                <div className='text-xs opacity-70 mt-1'>
                  {source.author} ({source.year})
                </div>
                {source.type && (
                  <div className='text-xs mt-2'>
                    <span className='badge badge-sm badge-outline'>
                      {source.type}
                    </span>
                    {source.conference && (
                      <span className='ml-2 opacity-60'>
                        {source.conference}
                      </span>
                    )}
                  </div>
                )}
                {source.publisher && (
                  <div className='text-xs opacity-60 mt-1'>
                    {source.publisher}
                  </div>
                )}
                {source.url && (
                  <div className='text-xs mt-2 text-primary'>
                    📄 Click to view paper
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    );
  },
};
