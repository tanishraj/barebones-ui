import { Tooltip } from 'react-tooltip';

import { useSourceContext } from '../context/SourceContext';

export const SourceTooltips = () => {
  const sources = useSourceContext();

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <>
      {sources.map(source => (
        <Tooltip
          key={source.id}
          id={`source-tooltip-${source.id}`}
          place='top'
          className='source-tooltip'
        />
      ))}
    </>
  );
};
