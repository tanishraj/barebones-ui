import { createContext } from 'react';

export type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

export const DropDownContext = createContext<DropDownContextType | null>(null);
