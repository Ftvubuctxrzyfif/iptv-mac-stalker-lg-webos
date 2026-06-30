import { useState, useEffect, useRef } from 'react';

/**
 * Hook for managing focused element in a list with keyboard navigation
 */
export const useListFocus = (items: any[], onSelect?: (item: any) => void) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'ArrowDown':
        case 'Down':
          e.preventDefault();
          setFocusedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'Enter':
        case 'OK':
        case ' ':
          e.preventDefault();
          if (onSelect && items[focusedIndex]) {
            onSelect(items[focusedIndex]);
          }
          break;
        case 'Escape':
        case 'Back':
        case 'Backspace':
          e.preventDefault();
          // Let parent handle back navigation
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, focusedIndex, onSelect]);

  // Scroll focused item into view
  useEffect(() => {
    if (containerRef.current) {
      const focusedElement = containerRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [focusedIndex]);

  return { focusedIndex, setFocusedIndex, containerRef };
};
