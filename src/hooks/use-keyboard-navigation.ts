import { useEffect, useState } from 'react';

interface KeyboardNavigationOptions {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onBack?: () => void;
  enabled?: boolean;
}

/**
 * Hook for TV remote control navigation
 * Handles D-pad, Enter/OK, and Back keys for LG webOS remotes
 */
export const useKeyboardNavigation = (options: KeyboardNavigationOptions) => {
  const { onUp, onDown, onLeft, onRight, onEnter, onBack, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // LG webOS remote key codes
      switch (event.key) {
        case 'ArrowUp':
        case 'Up': // Some LG remotes
          event.preventDefault();
          onUp?.();
          break;
        case 'ArrowDown':
        case 'Down': // Some LG remotes
          event.preventDefault();
          onDown?.();
          break;
        case 'ArrowLeft':
        case 'Left': // Some LG remotes
          event.preventDefault();
          onLeft?.();
          break;
        case 'ArrowRight':
        case 'Right': // Some LG remotes
          event.preventDefault();
          onRight?.();
          break;
        case 'Enter':
        case 'OK': // LG webOS OK button
        case ' ': // Space bar as alternative
          event.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
        case 'Back': // LG webOS Back button
        case 'Backspace':
          event.preventDefault();
          onBack?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onUp, onDown, onLeft, onRight, onEnter, onBack]);
};

/**
 * Hook for managing focusable elements in a list
 * Provides keyboard navigation between items
 */
export const useFocusNavigation = (itemCount: number, enabled = true) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleUp = () => {
    if (!enabled) return;
    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1));
  };

  const handleDown = () => {
    if (!enabled) return;
    setFocusedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0));
  };

  const handleEnter = () => {
    if (!enabled) return;
    // The parent component will handle the actual selection
    return focusedIndex;
  };

  const resetFocus = () => setFocusedIndex(0);

  return {
    focusedIndex,
    setFocusedIndex,
    handleUp,
    handleDown,
    handleEnter,
    resetFocus,
  };
};
