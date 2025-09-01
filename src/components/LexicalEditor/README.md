# LexicalEditor Component

A rich text editor component built on top of Facebook's Lexical framework.

## Features

- 🎨 Rich text formatting (bold, italic, underline, strikethrough)
- 🔗 Link editing with floating editor
- 📝 Block types (headings, quotes, code blocks)
- 📋 Lists (ordered, unordered, check)
- ↩️ Undo/Redo support
- 🎯 Customizable toolbar
- 📱 Responsive design

## Usage

```tsx
import { LexicalEditor } from 'barebones-ui';

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <LexicalEditor
      value={content}
      onChange={setContent}
      placeholder="Start typing..."
      showToolbar
      minHeight="200px"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Initial editor content |
| `onChange` | `(value: string) => void` | `undefined` | Callback when content changes |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the editor |
| `readOnly` | `boolean` | `false` | Make editor read-only |
| `showToolbar` | `boolean` | `true` | Show formatting toolbar |
| `minHeight` | `string` | `undefined` | Minimum editor height |
| `maxHeight` | `string` | `undefined` | Maximum editor height |
| `autoFocus` | `boolean` | `false` | Auto focus on mount |
| `className` | `string` | `undefined` | Additional CSS classes |

## Architecture

### Plugins

- **ToolbarPlugin**: Provides formatting toolbar with sections for:
  - Block types (headings, quotes, code)
  - Text formatting (bold, italic, etc.)
  - Lists (ordered, unordered, check)
  - Links
  - History (undo/redo)

- **FloatingLinkEditorPlugin**: Floating UI for link creation and editing

### Commands

- **OPEN_LINK_EDITOR_COMMAND**: Custom command for opening link editor in create/edit modes

### Hooks

- **useToolbarState**: Manages toolbar state and synchronization with editor

### Utils

- **getSelectedNode**: Gets the currently selected node
- **setFloatingElemPositionForLinkEditor**: Positions floating elements
- **url**: URL validation and sanitization

## Development

### Testing

```bash
# Run tests
npm test src/components/LexicalEditor

# Watch mode
npm test -- --watch
```

### Storybook

```bash
# View component in Storybook
npm run storybook
```

## Contributing

When adding new features:
1. Add corresponding TypeScript types in `types/index.ts`
2. Create tests for new functionality
3. Update this README with new props/features
4. Add Storybook stories for new variants