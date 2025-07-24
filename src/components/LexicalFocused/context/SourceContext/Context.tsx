import { createContext } from 'react';

import { SourceType } from './SourceContext';

export const Context = createContext<SourceType[]>([]);
