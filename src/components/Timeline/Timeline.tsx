import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import { timelineStyles } from './Timeline.styles';
import { TimelineItem } from './types';
import { defaultTimelineIcon } from './constants';

export interface TimelineProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineStyles> {
  items: TimelineItem[];
  icon?: React.ReactNode;
  startBorder?: boolean;
  endBorder?: boolean;
}

export const Timeline: FC<TimelineProps> = ({
  items,
  direction,
  icon,
  startBorder = true,
  endBorder = true,
}) => {
  const timelinesClassName = timelineStyles({ direction });

  return (
    <ul className={timelinesClassName}>
      {items.map((item, index) => (
        <li>
          {(startBorder || index !== 0) && <hr />}
          {item.startContent && (
            <div className='timeline-start'>{item.startContent}</div>
          )}
          <div className='timeline-middle'>
            {icon ? icon : defaultTimelineIcon}
          </div>
          {item.endContent && (
            <div className='timeline-end timeline-box'>{item.endContent}</div>
          )}
          {(endBorder || index !== items.length - 1) && <hr />}
        </li>
      ))}
    </ul>
  );
};
