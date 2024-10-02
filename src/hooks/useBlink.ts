import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type UseBlinkReturn<T> = [T, Dispatch<SetStateAction<T>>, (newValue: T, delay?: number) => void];

/**
 * Create state and blink function that erases state after delay
 * @param initialState
 */
export function useBlink<T>(initialState: T): UseBlinkReturn<T> {
    const [state, setState] = useState<T>(initialState);

    const blink = useCallback((newValue: T, delay = 5000) => {
        setState(newValue);

        setTimeout(() => {
            setState(initialState);
        }, delay);
    }, [initialState]);

    return [state, setState, blink];
}
