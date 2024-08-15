import { useEffect, useRef, useState } from 'react';

export const useFocusInput = (calcValue: string) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [calcValue, cursorPosition]);

  return {
    inputRef,
    cursorPosition,
    handleFocus,
    setCursorPosition,
  };
};
