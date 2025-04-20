import { VariantProps } from 'class-variance-authority';

import {
  timelineConnectorStyles,
  timelineContentAlignmentStyles,
  timelineOrientationStyles,
} from './Timeline.styles';

export interface TimelineEvent {
  startLabel?: string;
  endLabel?: string;
}

export type TimelineOrientation = VariantProps<
  typeof timelineOrientationStyles
>['orientation'];

export type ContentAlignment = VariantProps<
  typeof timelineContentAlignmentStyles
>['contentAlign'];

export type TimelineColor = VariantProps<
  typeof timelineConnectorStyles
>['connectorColor'];
