import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { tooltipStyles } from './Tooltip.styles';
import { cn } from '../../utils';

interface TooltipProps extends VariantProps<typeof tooltipStyles> {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  variant,
  position,
  open,
  responsive = false,
  className,
}: TooltipProps) => {
  const tooltipClassNames = cn(
    tooltipStyles({
      responsive,
      variant,
      position,
      open,
    }),
    className,
  );

  return (
    <div
      className={tooltipClassNames}
      data-tip={typeof content === 'string' ? content : undefined}
    >
      {typeof content !== 'string' && (
        <div className='tooltip-content'>{content}</div>
      )}
      {children}
    </div>
  );
};
