import { RefObject, useEffect } from 'react';

type EventType = MouseEvent | TouchEvent;

export const useClickOutside = <T extends HTMLElement>(
  refs: RefObject<T>[],
  callback: (event: EventType) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: EventType) => {
      const isOutside = refs.every(ref => {
        const el = ref?.current;
        return el && !el.contains(event.target as Node);
      });

      if (isOutside) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [refs, callback]);
};
