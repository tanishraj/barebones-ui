import { ReactNode } from 'react';
import { InitialConfigType } from '@lexical/react/LexicalComposer';

export interface LexicalEditorProps {
  /** Initial value for the editor */
  value?: string;
  /** Callback when content changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disable the editor */
  disabled?: boolean;
  /** Make editor read-only */
  readOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Show formatting toolbar */
  showToolbar?: boolean;
  /** Minimum height */
  minHeight?: string;
  /** Maximum height */
  maxHeight?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Blur event handler */
  onBlur?: () => void;
  /** Focus event handler */
  onFocus?: () => void;
  /** Custom theme overrides */
  theme?: Partial<InitialConfigType['theme']>;
  /** Additional plugins as children */
  children?: ReactNode;
}

export interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

export type FormatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code';

export interface EditorState {
  canUndo: boolean;
  canRedo: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isLink: boolean;
  blockType: string;
}
