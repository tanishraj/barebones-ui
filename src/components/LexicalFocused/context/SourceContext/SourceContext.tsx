import React from 'react';

import { Context } from './Context';

import { SectionSources } from '@/playground/components/LexicalFocusedExample/mockData';

interface SourceContextProps {
  children: React.ReactNode;
  value: SectionSources;
}

export const SourceContext = ({ children, value }: SourceContextProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
