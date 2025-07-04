import React from 'react';

import { Context } from './Context';

export type SourceType = {
  id: string;
  name: string;
  content: string;
};

interface SourceContextProps {
  children: React.ReactNode;
  value: SourceType[];
}

export const SourceContext = ({ children, value }: SourceContextProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
