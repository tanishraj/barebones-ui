import React, { createContext, useContext, ReactNode } from 'react';

import { TooltipProvider } from './types';

const Context = createContext<TooltipProvider | null>(null);

export interface TooltipProviderProps {
  provider: TooltipProvider;
  children: ReactNode;
}

export const TooltipContext: React.FC<TooltipProviderProps> = ({
  provider,
  children,
}) => {
  return <Context.Provider value={provider}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTooltipProvider = (): TooltipProvider => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'useTooltipProvider must be used within a TooltipProviderWrapper',
    );
  }
  return context;
};
