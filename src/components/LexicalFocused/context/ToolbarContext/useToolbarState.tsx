import { useContext } from 'react';

import { ToolbarContextValue } from './ToolbarContext';

export const useToolbarState = () => {
  const context = useContext(ToolbarContextValue);

  if (context === undefined) {
    throw new Error('useToolbarState must be used within a ToolbarProvider');
  }

  return context;
};
