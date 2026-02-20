import { FC, ReactNode } from 'react';

interface [FTName]Props {
  children: ReactNode;
}

export const [FTName]: FC<[FTName]Props> = ({ children }) => {
  return (
    <div>
      <h1>[FTName] Component</h1>
      <p>{children}</p>
    </div>
  );
};
