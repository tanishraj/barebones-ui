import { createContext } from 'react';

type DropDownContextType = {
  registerItem: (ref: React.RefObject<HTMLButtonElement>) => void;
};

export const DropDownContext = createContext<DropDownContextType | null>(null);
