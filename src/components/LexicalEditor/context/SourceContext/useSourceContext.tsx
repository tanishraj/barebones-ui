import { useContext } from 'react';

import { Context } from './Context';

export const useSourceContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSourceContext must be used within a SourceContext');
  }

  return context;
};
