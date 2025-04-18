import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import { timelineStyles } from './Timeline.styles';
import { TimelineItem } from './TimelineItem';

interface TimelineProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineStyles> {}

const TimelineComponent: FC<TimelineProps> = ({ children, direction }) => {
  const timelinesClassName = timelineStyles({ direction });

  return <ul className={timelinesClassName}>{children}</ul>;
};

const Timeline = Object.assign(TimelineComponent, { Item: TimelineItem });

export { Timeline };
