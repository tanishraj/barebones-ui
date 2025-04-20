import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import {
  timelineBorderStyles,
  timelineContentStyles,
  timelineIconStyles,
  timelineStyles,
} from './Timeline.styles';
import { TimelineItem } from './types';

import { cn } from '@/utils';

const defaultTimelineIcon = (
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
                index < completedIndex && timelineCompletedBorderClassName,
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
              index < completedIndex && timelineCompletedIconClassName,
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
                (index < completedIndex - 1 ||
                  items.length === completedIndex) &&
                  timelineCompletedBorderClassName,
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
