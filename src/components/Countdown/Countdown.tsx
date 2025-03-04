import { FC, ReactNode } from 'react';

interface CountdownProps {
  children: ReactNode;
}

export const Countdown: FC<CountdownProps> = ({ children }) => {
  return (
    <div>
      <h1>Countdown Component</h1>
      <p>{children}</p>
    </div>
  );
};