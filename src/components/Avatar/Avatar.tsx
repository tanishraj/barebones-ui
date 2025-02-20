import clsx from 'clsx';

import { sizeAndShapeStyles, statusStyles, textStyles } from './Avatar.styles';
import { AvatarItem, AvatarStyleProps } from './types';

export type AvatarProps = AvatarStyleProps & AvatarItem;

export const Avatar = ({ url, text, size, shape, status }: AvatarProps) => {
  const avatarClassName = clsx('avatar placeholder', statusStyles({ status }));
  const sizeAndShapeClassName = clsx(
    'rounded',
    sizeAndShapeStyles({ size, shape }),
  );
  const textClassName = textStyles({ size });

  return (
    <div className={avatarClassName}>
      <div className={sizeAndShapeClassName}>
        {url ? (
          <img src={url} alt={`${text} avatar`} />
        ) : text ? (
          <span className={textClassName}>{text}</span>
        ) : null}
      </div>
    </div>
  );
};
