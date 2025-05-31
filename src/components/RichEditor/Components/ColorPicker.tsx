import { FC, ReactNode, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

import { Button } from '../../Button';
import { useClickOutside } from '../../../hooks';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  icon?: ReactNode;
  type?: 'text' | 'bg';
}

export const ColorPicker: FC<ColorPickerProps> = ({
  color = '#ff0000',
  onChange,
  icon,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useClickOutside([colorPickerRef], () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className='relative'>
      {icon ? (
        icon
      ) : (
        <Button
          variant={'ghost'}
          size={'sm'}
          onClick={() => setIsOpen(!isOpen)}
        >
          {type === 'text' ? (
            <div className='flex items-center gap-1'>
              <div className='text-red-500'>A</div>
            </div>
          ) : (
            <div className='flex items-center gap-1'>
              <div className='bg-red-500 h-4 w-4 flex items-center justify-center'>
                A
              </div>
            </div>
          )}
        </Button>
      )}

      {isOpen && (
        <div
          className='absolute top-full left-0 rounded z-10 select-none'
          ref={colorPickerRef}
        >
          <SketchPicker
            color={color}
            onChangeComplete={color => {
              onChange?.(color.hex);
            }}
          />
        </div>
      )}
    </div>
  );
};
