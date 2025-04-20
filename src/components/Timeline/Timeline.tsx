import { VariantProps } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

import {
  timelineOrientationStyles,
  timelineContentAlignmentStyles,
  timelineConnectorStyles,
  timelineMarkerStyles,
} from './Timeline.styles';
import { TimelineColor, TimelineEvent } from './types';

import { cn } from '@/utils';

const defaultMarkerIcon = (
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
  extends Omit<HTMLAttributes<HTMLUListElement>, 'color'>,
    VariantProps<typeof timelineOrientationStyles>,
    VariantProps<typeof timelineContentAlignmentStyles>,
    VariantProps<typeof timelineConnectorStyles>,
    VariantProps<typeof timelineMarkerStyles> {
  events: TimelineEvent[];
  customMarker?: React.ReactNode;
  showConnectors?: boolean;
  completedSteps?: number;
  completedColor?: TimelineColor;
}

export const Timeline: FC<TimelineProps> = ({
  events,
  orientation,
  customMarker,
  showConnectors = true,
  contentAlign,
  startContentAlign,
  endContentAlign,
  connectorColor,
  completedSteps = 0,
  completedColor,
}) => {
  const containerClasses = timelineOrientationStyles({ orientation });
  const startContentClasses = cn(
    'timeline-start',
    timelineContentAlignmentStyles({
      contentAlign,
      startContentAlign,
    }),
  );
  const endContentClasses = cn(
    'timeline-end',
    timelineContentAlignmentStyles({
      contentAlign,
      endContentAlign,
    }),
  );
  const baseConnectorClasses = timelineConnectorStyles({ connectorColor });
  const completedConnectorClasses = timelineConnectorStyles({
    connectorColor: completedColor,
  });
  const baseMarkerClasses = timelineMarkerStyles({
    markerColor: connectorColor,
  });
  const completedMarkerClasses = timelineMarkerStyles({
    markerColor: completedColor,
  });

  return (
    <ul className={containerClasses}>
      {events.map((event, index) => (
        <li key={event.startLabel}>
          {(showConnectors || index !== 0) && (
            <hr
              className={cn(
                baseConnectorClasses,
                index < completedSteps && completedConnectorClasses,
              )}
            />
          )}
          {event.startLabel && (
            <div className={startContentClasses}>{event.startLabel}</div>
          )}
          <div
            className={cn(
              'timeline-middle',
              baseMarkerClasses,
              index < completedSteps && completedMarkerClasses,
            )}
          >
            {customMarker || defaultMarkerIcon}
          </div>
          {event.endLabel && (
            <div className={endContentClasses}>{event.endLabel}</div>
          )}
          {(showConnectors || index !== events.length - 1) && (
            <hr
              className={cn(
                baseConnectorClasses,
                (index < completedSteps - 1 ||
                  events.length === completedSteps) &&
                  completedConnectorClasses,
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
