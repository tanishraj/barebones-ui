import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import { timelineStyles } from './Timeline.styles';

interface TimelineProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineStyles> {}

export const Timeline: FC<TimelineProps> = ({ children, direction }) => {
  const timelinesClassName = timelineStyles({ direction });

  return <ul className={timelinesClassName}>{children}</ul>;
};

interface TimelineItemProps {
  className?: string;
}

const TimelineItem: FC<TimelineItemProps> = ({ className }) => {
  return <li className={className}>Something here.</li>;
};

Timeline.Item = TimelineItem;
