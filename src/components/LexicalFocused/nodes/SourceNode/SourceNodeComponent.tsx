import React, { useMemo } from 'react';

import { useSourceContext } from '../../context/SourceContext';

import './SourceNodeComponent.css';

export interface SourceNodeComponentProps {
  sourceId: string;
}

export const SourceNodeComponent: React.FC<SourceNodeComponentProps> = ({
  sourceId,
}) => {
  const sources = useSourceContext();

  const source = useMemo(
    () => sources?.find(s => s.id === sourceId),
    [sources, sourceId],
  );

  const tooltipContent = source ? source.content : 'Source not found';
  const tooltipId = `source-tooltip-${sourceId}`;

  return (
    <span
      className='source'
      data-tooltip-id={tooltipId}
      data-tooltip-content={tooltipContent}
    >
      {sourceId}
    </span>
  );
};
