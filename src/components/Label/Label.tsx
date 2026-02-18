import { FC, HTMLProps } from 'react';
import { VariantProps } from 'class-variance-authority';

import { LabelPosition } from './types';
import { labelContainerStyles, labelStyles } from './Label.styles';
import { cn } from '../../utils';

export interface LabelProps
  extends
    VariantProps<typeof labelContainerStyles>,
    VariantProps<typeof labelStyles>,
    Omit<HTMLProps<HTMLLabelElement>, 'type' | 'size'> {
  text?: string;
  position?: LabelPosition;
}

export const Label: FC<LabelProps> = ({
  text,
  position,
  size,
  type = 'input',
  children,
  className,
  ...props
}) => {
  const isLeft = position === 'left';
  const isRight = position === 'right';
  const labelTypeClassName = cn(labelContainerStyles({ type }));
  const labelClassName = cn('label', className, labelStyles({ size }));

  return (
    <label className={labelTypeClassName} {...props}>
      {isLeft && <span className={labelClassName}>{text}</span>}
      {children}
      {isRight && <span className={labelClassName}>{text}</span>}
    </label>
  );
};
