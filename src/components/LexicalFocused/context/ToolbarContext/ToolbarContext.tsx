import { ElementFormatType } from 'lexical';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { blockTypeToBlockName, rootTypeToRootName } from './constants';

export interface ToolbarContextProps {
  children: ReactNode;
}

const INITIAL_TOOLBAR_STATE = {
  rootType: 'root' as keyof typeof rootTypeToRootName,
  blockType: 'paragraph' as keyof typeof blockTypeToBlockName,
  elementFormat: 'left' as ElementFormatType,
  codeLanguage: '',
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikethrough: false,
  isRTL: false,
  isLink: false,
  isBulletList: false,
  isNumberedList: false,
  canRedo: false,
  canUndo: false,
};

export type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// Utility type to get keys and infer value types
export type ToolbarStateKey = keyof ToolbarState;
export type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>,
  ): void;
};

const Context = createContext<ContextShape | undefined>(undefined);

export const ToolbarContext: FC<ToolbarContextProps> = ({
  children,
}): JSX.Element => {
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);

  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const contextValue = useMemo(() => {
    return {
      toolbarState,
      updateToolbarState,
    };
  }, [toolbarState, updateToolbarState]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export { Context as ToolbarContextValue };
