import React, { useMemo } from 'react';
import { Tooltip } from 'react-tooltip';

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

  return (
    <React.Fragment key={sourceId}>
      <span
        className='source'
        data-tooltip-id={source?.id}
        data-tooltip-content={tooltipContent}
      >
        {sourceId}
      </span>
      <Tooltip id={source?.id} />
    </React.Fragment>
  );
};
