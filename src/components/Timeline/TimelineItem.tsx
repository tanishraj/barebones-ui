import { FC, ReactNode } from 'react';

import { cn } from '@/utils';

const defaultIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
    className='h-5 w-5'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
      clipRule='evenodd'
    />
  </svg>
);

interface TimelineItemProps {
  className?: string;
  start?: ReactNode;
  icon?: ReactNode;
  end?: ReactNode;
}

export const TimelineItem: FC<TimelineItemProps> = ({
  className,
  start,
  icon,
  end,
}) => {
  const timelineItemClassName = cn('timeline-item', className);

  return (
    <li className={timelineItemClassName}>
      <hr />
      <div className='timeline-start'>{start}</div>
      <div className='timeline-middle'>{icon ? icon : defaultIcon}</div>
      <div className='timeline-end timeline-box'>{end}</div>
      <hr />
    </li>
  );
};
