import { createContext } from 'react';

import { DummySource } from '@/playground/components/LexicalFocusedExample/mockData';

export const Context = createContext<DummySource[]>([]);
