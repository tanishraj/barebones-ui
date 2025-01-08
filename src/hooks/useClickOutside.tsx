import { useEffect, useRef } from 'react';

type UseClickOutsideOptions = {
  onClickOutside: (event: MouseEvent | TouchEvent) => void;
};

export const useClickOutside = <T extends HTMLElement>({
  onClickOutside,
}: UseClickOutsideOptions) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [onClickOutside]);

  return ref;
};
