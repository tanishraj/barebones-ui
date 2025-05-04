import { FC, HTMLProps } from 'react';
import { VariantProps } from 'class-variance-authority';

import { LabelPosition } from './types';
import { labelContainerStyles } from './Label.styles';

export interface LabelProps
  extends Omit<HTMLProps<HTMLLabelElement>, 'type'>,
    VariantProps<typeof labelContainerStyles> {
  text?: string;
  position?: LabelPosition;
}

export const Label: FC<LabelProps> = ({
  text,
  position,
  type = 'input',
  children,
}) => {
  const isLeft = position === 'left';
  const isRight = position === 'right';
  const labelTypeClassName = labelContainerStyles({ type });

  return (
    <label className={labelTypeClassName}>
      {isLeft && <span className='label'>{text}</span>}
      {children}
      {isRight && <span className='label'>{text}</span>}
    </label>
  );
};
