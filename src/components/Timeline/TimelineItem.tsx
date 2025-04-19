import { FC, ReactNode } from 'react';
import { VariantProps } from 'class-variance-authority';

import { timelineItemStyles } from './Timeline.styles';
import { defaultTimelineIcon } from './constants';

import { cn } from '@/utils';

interface TimelineItemProps extends VariantProps<typeof timelineItemStyles> {
  className?: string;
  startContent?: ReactNode;
  icon?: ReactNode;
  endContent?: ReactNode;
}

export const TimelineItem: FC<TimelineItemProps> = ({
  className,
  startContent,
  icon,
  endContent,
}) => {
  const timelineItemClassName = cn(className, timelineItemStyles);

  return (
    <li className={timelineItemClassName}>
      <hr />
      {startContent && <div className='timeline-start'>{startContent}</div>}
      <div className='timeline-middle'>{icon ? icon : defaultTimelineIcon}</div>
      {endContent && (
        <div className='timeline-end timeline-box'>{endContent}</div>
      )}
      <hr />
    </li>
  );
};
