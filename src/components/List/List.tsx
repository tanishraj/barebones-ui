import { FC, ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

export const List: FC<ListProps> = ({ children }) => {
  return (
    <div>
      <h1>List Component</h1>
      <p>{children}</p>
    </div>
  );
};