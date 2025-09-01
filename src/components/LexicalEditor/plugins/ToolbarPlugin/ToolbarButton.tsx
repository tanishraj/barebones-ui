import React from 'react';

import { Button } from '../../components/Button';

interface ToolbarButtonProps {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  return <Button {...props} size='sm' variant='ghost' />;
};
