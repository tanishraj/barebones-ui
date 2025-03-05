import { FC } from 'react';

import { KbdStyleProps } from './types';
import { kbdStyles } from './Kbd.styles';

interface KbdProps extends KbdStyleProps {
  text: string;
}

export const Kbd: FC<KbdProps> = ({ text, size }) => {
  const kbdClassName = kbdStyles({ size });

  return <kbd className={kbdClassName}>{text}</kbd>;
};
