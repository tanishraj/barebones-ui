import clsx from 'clsx';

import { sizeAndShapeStyles, statusStyles, textStyles } from './Avatar.styles';
import { AvatarItem, AvatarStyleProps } from './types';

export interface AvatarProps extends AvatarStyleProps {
  item: AvatarItem;
}

export const Avatar = ({ item, size, shape, status, ...rest }: AvatarProps) => {
  const avatarClassName = clsx('avatar placeholder', statusStyles({ status }));
  const sizeAndShapeClassName = clsx(
    'rounded',
    sizeAndShapeStyles({ size, shape }),
  );
  const textClassName = textStyles({ size });

  return (
    <div className={avatarClassName} {...rest}>
      <div className={sizeAndShapeClassName}>
        {item.url ? (
          <img src={item.url} alt={`${item.text} avatar`} />
        ) : item.text ? (
          <span className={textClassName}>{item.text}</span>
        ) : null}
      </div>
    </div>
  );
};

export interface AvatarGroupProps extends AvatarStyleProps {
  items: AvatarItem[];
}

export const AvatarGroup = ({ items, ...rest }: AvatarGroupProps) => {
  return (
    <div className='avatar-group -space-x-6 rtl:space-x-reverse'>
      {items.map((item, index) => (
        <Avatar key={index} item={item} {...rest} />
      ))}
    </div>
  );
};
