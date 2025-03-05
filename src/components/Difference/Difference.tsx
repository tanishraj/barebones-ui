import { FC, ReactNode } from 'react';

interface DifferenceProps {
  children: [ReactNode, ReactNode];
}

export const Difference: FC<DifferenceProps> = ({ children }) => {
  const [firstChild, secondChild] = children || [];
  return (
    <figure className='diff' tabIndex={0}>
      <div className='diff-item-1' role='img'>
        {firstChild}
      </div>
      <div className='diff-item-2' role='img' tabIndex={0}>
        {secondChild}
      </div>
      <div className='diff-resizer'></div>
    </figure>
  );
};
