import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDidUpdateEffect = (fn: () => void, inputs: any) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            return fn();
        } else {
            didMountRef.current = true;
        }
    }, inputs);
};
