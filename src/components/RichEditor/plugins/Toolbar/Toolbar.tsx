import { RICH_TEXT_TOOLBAR_OPTIONS } from './constants';

import { Button } from '@/components';

export const ToolbarPlugin = () => {
  return (
    <div className='join'>
      {RICH_TEXT_TOOLBAR_OPTIONS.map(item => (
        <Button
          size='sm'
          className='join-item'
          key={item.id}
          icon={item.icon}
          aria-label={item.label}
        />
      ))}
    </div>
  );
};
