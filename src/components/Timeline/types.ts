import { VariantProps } from 'class-variance-authority';

import {
  timelineBorderStyles,
  timelineContentStyles,
  timelineStyles,
} from './Timeline.styles';

export interface TimelineItem {
  startContent?: string;
  endContent?: string;
}

export type TimelineDirection = VariantProps<
  typeof timelineStyles
>['direction'];

export type TimelineLayout = VariantProps<
  typeof timelineContentStyles
>['contentLayout'];

export type TimelineVariant = VariantProps<
  typeof timelineBorderStyles
>['variant'];
