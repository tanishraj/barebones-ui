import React from 'react';
import { Tooltip } from 'react-tooltip';

import { useSourceContext } from '../../context/SourceContext';
import './SourceNodeComponent.css';

export interface SourceNodeComponentProps {
  sourceIds: string[];
}

export const SourceNodeComponent: React.FC<SourceNodeComponentProps> = ({
  sourceIds,
}) => {
  const sources = useSourceContext();

  const getTooltipContent = (sourceId: string) => {
    if (!sources) return 'No sources available.';

    const source = sources.find(s => s.references === sourceId);
    if (!source) return 'Source not found.';

    return JSON.stringify(source, null, 2);
  };

  return (
    <>
      {sourceIds.map(id => {
        return (
          <React.Fragment key={id}>
            <span
              className='source'
              data-tooltip-id={`source-tooltip-${id}`}
              data-tooltip-content={getTooltipContent(id)}
            >
              {id}
            </span>
            <Tooltip
              id={`source-tooltip-${id}`}
              place='top'
              delayShow={300}
              delayHide={300}
              style={{
                maxWidth: '300px',
                fontSize: '12px',
                whiteSpace: 'pre-line',
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};
