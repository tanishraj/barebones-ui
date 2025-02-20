import { Avatar } from './Avatar';
import { AvatarItem, AvatarStyleProps } from './types';

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
