import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface DifferenceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: [ReactNode, ReactNode];
  className?: string;
}

export const Difference: FC<DifferenceProps> = ({ children, className }) => {
  const [firstChild, secondChild] = children || [];
  const diffClassName = clsx('diff', className);

  return (
    <figure className={diffClassName} tabIndex={0}>
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
