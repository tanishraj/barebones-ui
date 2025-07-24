import React, { createContext, useContext, ReactNode } from 'react';

import { TooltipProvider } from './types';

const TooltipContext = createContext<TooltipProvider | null>(null);

export interface TooltipProviderProps {
  provider: TooltipProvider;
  children: ReactNode;
}

export const TooltipProviderWrapper: React.FC<TooltipProviderProps> = ({
  provider,
  children,
}) => {
  return (
    <TooltipContext.Provider value={provider}>
      {children}
    </TooltipContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTooltipProvider = (): TooltipProvider => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(
      'useTooltipProvider must be used within a TooltipProviderWrapper',
    );
  }
  return context;
};
