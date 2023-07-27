import { useState, useEffect, Dispatch, SetStateAction, RefObject } from 'react';
import { Brush } from '../core/brush';

const subscribe: Dispatch<SetStateAction<Brush | undefined>>[] = [];

function subscribeSetBrush(brush: Brush): void {
    setTimeout(() => {
        subscribe.forEach((setFn) => setFn(brush));
    }, 0);
}

const brushMap = new Map<HTMLCanvasElement, Brush>()

export function useBrush(canvas?: HTMLCanvasElement | RefObject<HTMLCanvasElement>): Brush | null {
    const [brush, setBrush] = useState<Brush | null>(null);

    useEffect(() => {
        const el = canvas instanceof HTMLCanvasElement ? canvas : canvas?.current;
        if (el instanceof HTMLCanvasElement) {
            if (brushMap.has(el)) {
                setBrush(brushMap.get(el) as Brush);
                return;
            }
            const brushIns = new Brush(el);
            setBrush(brushIns);
            brushMap.set(el, brushIns);
        }

        // 避免canvas 还未渲染完成
        setTimeout(() => {
            const ins = Array.from(brushMap.values())[0];
            setBrush(ins);
        }, 0)

    }, [])

    return brush
}