import { useEffect } from 'react';

export const useHandleKeyDown = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    if (!callback) return;

    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    };
  }, [callback]);
};
