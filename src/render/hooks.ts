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

const canvasSubscribe: Dispatch<SetStateAction<HTMLCanvasElement | undefined>>[] = [];

function subscribeSetCanvas(el: HTMLCanvasElement) {
    setTimeout(() => {
        canvasSubscribe.forEach((setFn) => setFn(el));
    }, 0);
}

export function useBrushCanvas(): [HTMLCanvasElement, (el: HTMLCanvasElement) => void] {
    const [canvasEl, setCanvasEL] = useState();

    useEffect(() => {
        canvasSubscribe.push(setCanvasEL);

        return () => {
            const index = canvasSubscribe.findIndex(fn => fn === setCanvasEL);
            canvasSubscribe.splice(index, 1);
        }

    }, []);

    return [canvasEl, subscribeSetCanvas]
}