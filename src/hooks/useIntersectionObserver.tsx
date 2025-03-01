import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverProps {
  root?: null; // null defaults to the document's viewport
  rootMargin?: string;
  threshold?: number;
  onIntersect: () => void;
}

const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 1.0,
  onIntersect,
}: UseIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if (!target) return;

    cleanup();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observerRef.current.observe(target);

    return () => cleanup();
  }, [target, root, rootMargin, threshold, onIntersect, cleanup]);

  return setTarget;
};

export default useIntersectionObserver;