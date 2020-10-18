import React, { useEffect } from 'react';

export const useOutsideClick = (ref: React.RefObject<HTMLElement>, isOpen:boolean, callback: () => void) => {
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event: MouseEvent): any => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [ref, isOpen]);
};
