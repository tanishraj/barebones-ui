import React from 'react';
import { Tooltip } from 'react-tooltip';

import { TooltipProvider, TooltipProps } from './types';

export const ReactTooltipWrapper: React.FC<TooltipProps> = ({
  id,
  content,
  children,
  className,
  place = 'top',
  delayShow,
  delayHide,
}) => {
  const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <>
      <span
        data-tooltip-id={tooltipId}
        data-tooltip-content={typeof content === 'string' ? content : undefined}
        className={className}
      >
        {children}
      </span>
      <Tooltip
        id={tooltipId}
        place={place}
        delayShow={delayShow}
        delayHide={delayHide}
      >
        {typeof content !== 'string' ? content : undefined}
      </Tooltip>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const ReactTooltipAdapter: TooltipProvider = {
  Tooltip: ReactTooltipWrapper,
  cssImport: 'react-tooltip/dist/react-tooltip.css',
};
