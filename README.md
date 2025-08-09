# barebones-ui Library

![Build Status](https://github.com/tanishraj/barebones-ui/actions/workflows/ci.yml/badge.svg)
![npm version](https://img.shields.io/npm/v/barebones-ui)
![License](https://img.shields.io/github/license/tanishraj/barebones-ui)

A modern, customizable React UI library built with TypeScript, Tailwind CSS v4, and DaisyUI. This library provides a comprehensive set of accessible, responsive, and beautifully designed components for building modern web applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components](#components)
- [Documentation](#documentation)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 **40+ Pre-built Components**: Rich set of UI components for all your needs
- 📦 **TypeScript Support**: Fully typed components for type safety and IntelliSense
- 🎨 **Tailwind CSS v4**: Built with the latest Tailwind CSS for rapid UI development
- 🎯 **DaisyUI Integration**: Leverages DaisyUI's utility classes for consistent theming
- 📱 **Responsive Design**: All components are responsive and mobile-friendly
- ♿ **Accessible**: Built with accessibility in mind following WAI-ARIA standards
- 🎭 **Customizable**: Easily customize components using className props and CVA variants
- 📝 **Rich Text Editors**: Includes both Lexical and custom rich text editor implementations
- 🧪 **Well Tested**: Components come with comprehensive test coverage using Vitest
- 📖 **Storybook Documentation**: Interactive component documentation with Storybook

## Installation

Install the library using npm or yarn:

```bash
# Using npm
npm install barebones-ui

# Using yarn
yarn add barebones-ui

# Using pnpm
pnpm add barebones-ui
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```json
{
  "react": ">=16"
}
```

## Quick Start

1. Import the library styles in your main CSS file or entry point:

```typescript
import 'barebones-ui/dist/index.css';
```

2. Start using components in your React application:

```tsx
import { Button, Card, Modal } from 'barebones-ui';

function App() {
  return (
    <Card>
      <h2>Welcome to barebones-ui</h2>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Components

### Layout Components
- **Accordion** - Expandable content panels
- **Card** - Container component with various styles
- **Divider** - Visual separator with text support
- **Drawer** - Side navigation panel
- **Modal** - Dialog/popup component
- **Table** - Data table with sorting and styling options

### Navigation
- **Breadcrumbs** - Navigation trail component
- **Dropdown** - Dropdown menu component
- **Link** - Styled anchor component
- **Timeline** - Vertical timeline display

### Form Controls
- **Button** - Versatile button with multiple variants
- **Checkbox** - Styled checkbox input
- **ColorPicker** - Color selection component
- **Label** - Form label component
- **Radio** - Radio button component
- **Range** - Range slider input
- **Rating** - Star rating component
- **Select** - Dropdown select component
- **Toggle** - Toggle switch component

### Data Display
- **Avatar** - User avatar display
- **Badge** - Small count and labeling component
- **Chat** - Chat message display
- **Countdown** - Countdown timer component
- **Indicator** - Position indicators for badges/notifications
- **Kbd** - Keyboard key display
- **List** - Structured list component
- **Stat** - Statistics display component
- **Status** - Status indicator component
- **Tooltip** - Hover tooltip component

### Feedback
- **Alert** - Alert message component
- **Loader** - Loading spinner/indicator
- **Progress** - Progress bar component
- **RadialProgress** - Circular progress indicator
- **Skeleton** - Loading placeholder component

### Media & Content
- **Carousel** - Image/content carousel
- **Difference** - Before/after comparison
- **Swap** - Animated content swap

### Rich Text
- **RichEditor** - Feature-rich text editor
- **LexicalFocused** - Advanced Lexical-based editor

## Component Usage Examples

### Button Component
```tsx
import { Button } from 'barebones-ui';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### Modal Component
```tsx
import { Modal } from 'barebones-ui';

<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content goes here</Modal.Body>
  <Modal.Footer>
    <Button onClick={handleClose}>Close</Button>
  </Modal.Footer>
</Modal>
```

### Indicator Component
```tsx
import { Indicator, IndicatorItem, Badge } from 'barebones-ui';

<Indicator>
  <IndicatorItem horizontal="end" vertical="top">
    <Badge variant="primary">New</Badge>
  </IndicatorItem>
  <Button>Notifications</Button>
</Indicator>
```

## Documentation

### Storybook

View the interactive component documentation:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006` where you can:
- View all components
- Interact with component props
- See usage examples
- Copy code snippets

### API Documentation

Each component exports TypeScript types for props:

```tsx
import type { ButtonProps, ModalProps } from 'barebones-ui';
```

## Development

### Prerequisites
- Node.js >= 18
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/tanishraj/barebones-ui.git
cd barebones-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start development:
```bash
npm run dev        # Start Vite dev server
npm run storybook  # Start Storybook
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build the library
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run storybook    # Start Storybook
npm run build-storybook # Build Storybook
```

### Project Structure

```
src/
├── components/       # All UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   └── ...
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── index.ts         # Main entry point
```

### Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **DaisyUI** - Tailwind CSS components
- **Vite** - Build tool
- **Rollup** - Module bundler
- **Vitest** - Testing framework
- **Storybook** - Component documentation
- **CVA** - Class variance authority for variants
- **Lexical** - Rich text editor framework

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Tanish Raj](https://github.com/tanishraj)

## Support

- 📧 Email: learn.tanishraj@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/tanishraj/barebones-ui/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/tanishraj/barebones-ui/discussions)

## Acknowledgments

- Built with [DaisyUI](https://daisyui.com/)
- Powered by [Tailwind CSS](https://tailwindcss.com/)
- Editor powered by [Lexical](https://lexical.dev/)

---

Made with ❤️ by [Tanish Raj](https://github.com/tanishraj)