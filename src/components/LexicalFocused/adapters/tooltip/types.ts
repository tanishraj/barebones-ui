import { ReactNode } from 'react';

export interface TooltipProps {
  id?: string;
  content?: ReactNode;
  children: ReactNode;
  className?: string;
  delayShow?: number;
  delayHide?: number;
  place?: 'top' | 'right' | 'bottom' | 'left';
}

export interface TooltipProvider {
  Tooltip: React.FC<TooltipProps>;
  useTooltip?: () => any;
  cssImport?: string;
  setup?: () => void;
}
