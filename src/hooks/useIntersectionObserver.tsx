import { useEffect, useRef, useState } from 'react';

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export const useIntersectionObserver = (
  options: IntersectionObserverInit = defaultOptions,
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    setEntry(entries[0]);
  };

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(callback, options);

      observer.observe(elementRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [options]);

  return [elementRef, entry];
};
