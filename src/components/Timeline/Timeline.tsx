import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import { timelineContentStyles, timelineStyles } from './Timeline.styles';
import { TimelineItem } from './types';
import { defaultTimelineIcon } from './constants';

import { cn } from '@/utils';

export interface TimelineProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineStyles>,
    VariantProps<typeof timelineContentStyles> {
  items: TimelineItem[];
  icon?: React.ReactNode;
  startAndEndWithBorder?: boolean;
}

export const Timeline: FC<TimelineProps> = ({
  items,
  direction,
  icon,
  startAndEndWithBorder = true,
  startContentLayout,
  endContentLayout,
  contentLayout,
}) => {
  const timelinesClassName = timelineStyles({
    direction,
  });
  const timelineStartContentClassName = cn(
    'timeline-start',
    timelineContentStyles({
      contentLayout,
      startContentLayout,
    }),
  );
  const timelineEndContentClassName = cn(
    'timeline-end',
    timelineContentStyles({
      contentLayout,
      endContentLayout,
    }),
  );

  return (
    <ul className={timelinesClassName}>
      {items.map((item, index) => (
        <li>
          {(startAndEndWithBorder || index !== 0) && <hr />}
          {item.startContent && (
            <div className={timelineStartContentClassName}>
              {item.startContent}
            </div>
          )}
          <div className='timeline-middle'>
            {icon ? icon : defaultTimelineIcon}
          </div>
          {item.endContent && (
            <div className={timelineEndContentClassName}>{item.endContent}</div>
          )}
          {(startAndEndWithBorder || index !== items.length - 1) && <hr />}
        </li>
      ))}
    </ul>
  );
};
