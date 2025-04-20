import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import {
  timelineBorderStyles,
  timelineContentStyles,
  timelineIconStyles,
  timelineStyles,
} from './Timeline.styles';
import { TimelineItem } from './types';
import { defaultTimelineIcon } from './constants';

import { cn } from '@/utils';

export interface TimelineProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineStyles>,
    VariantProps<typeof timelineContentStyles>,
    VariantProps<typeof timelineBorderStyles>,
    VariantProps<typeof timelineIconStyles> {
  items: TimelineItem[];
  icon?: React.ReactNode;
  startAndEndWithBorder?: boolean;
  completedIndex?: number;
}

export const Timeline: FC<TimelineProps> = ({
  items,
  direction,
  icon,
  startAndEndWithBorder = true,
  startContentLayout,
  endContentLayout,
  contentLayout,
  variant,
  completedIndex = 0,
  completedVariant,
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
  const timelineBorderClassName = cn(
    timelineBorderStyles({
      variant,
    }),
  );
  const timelineCompletedBorderClassName = cn(
    timelineBorderStyles({
      completedVariant,
    }),
  );
  const timelineIconClassName = cn(
    timelineIconStyles({
      variant,
    }),
  );
  const timelineCompletedIconClassName = cn(
    timelineIconStyles({
      completedVariant,
    }),
  );

  return (
    <ul className={timelinesClassName}>
      {items.map((item, index) => (
        <li>
          {(startAndEndWithBorder || index !== 0) && (
            <hr
              className={cn(
                timelineBorderClassName,
                index <= completedIndex && timelineCompletedBorderClassName,
              )}
            />
          )}
          {item.startContent && (
            <div className={timelineStartContentClassName}>
              {item.startContent}
            </div>
          )}
          <div
            className={cn(
              'timeline-middle',
              timelineIconClassName,
              index <= completedIndex && timelineCompletedIconClassName,
            )}
          >
            {icon || defaultTimelineIcon}
          </div>
          {item.endContent && (
            <div className={timelineEndContentClassName}>{item.endContent}</div>
          )}
          {(startAndEndWithBorder || index !== items.length - 1) && (
            <hr
              className={cn(
                timelineBorderClassName,
                index < completedIndex && timelineCompletedBorderClassName,
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
