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

export type TimelineOrientation = NonNullable<
  VariantProps<typeof timelineOrientationStyles>['orientation']
>;

export type ContentAlignment = NonNullable<
  VariantProps<typeof timelineContentAlignmentStyles>['contentAlign']
>;

export type TimelineColor = NonNullable<
  VariantProps<typeof timelineConnectorStyles>['connectorColor']
>;
