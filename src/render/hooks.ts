import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Brush } from '../core/brush';

const subscribe: Dispatch<SetStateAction<Brush | undefined>>[] = [];

function subscribeSetBrush(brush: Brush): void {
    setTimeout(() => {
        subscribe.forEach((setFn) => setFn(brush));
    }, 0);
}

export function useBrush(): [(Brush), (brush: Brush) => void] {

    const [brush, setBrush] = useState<Brush>();

    useEffect(() => {
        subscribe.push(setBrush);

        return () => {
            const index = subscribe.findIndex(fn => fn === setBrush);
            subscribe.splice(index, 1);
        }
    }, [])

    return [brush as Brush, subscribeSetBrush]
}