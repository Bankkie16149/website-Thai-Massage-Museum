import { flushSync } from 'react-dom';

/**
 * Runs a React state update inside a Directional View Transition when supported.
 * Falls back gracefully to an immediate state update if View Transitions are unavailable.
 *
 * @param {() => void} updateState - Synchronous React state update callback.
 * @param {'forward' | 'backward' | 'switch'} [direction='switch'] - Navigation flow direction.
 */
export function navigateWithTransition(updateState, direction = 'switch') {
  if (typeof document === 'undefined' || typeof document.startViewTransition !== 'function') {
    updateState();
    return;
  }

  try {
    document.startViewTransition({
      update: () => {
        flushSync(updateState);
      },
      types: [direction],
    });
  } catch {
    // Fallback for browsers with startViewTransition(cb) without types options object
    try {
      document.startViewTransition(() => {
        flushSync(updateState);
      });
    } catch {
      updateState();
    }
  }
}
