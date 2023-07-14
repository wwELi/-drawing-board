import { Brush } from '../core/brush';
import React, { useEffect, useRef, useState } from 'react';
import { useBrush, useBrushCanvas } from './hooks';
import { usePasteEvent } from '../hooks/usePasteEvent';
import { Drop } from 'drop-handler';

export function BrushCanvas() {
    const canvasRef = useRef(null); 
    const [, setBrush] = useBrush();
    const [, setCanvas] = useBrushCanvas();


    usePasteEvent(({ type, data, coordinate }) => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const handler = {
            text: () => {
                ctx?.fillText(data as string, ...coordinate);
            },
            image: () => {
                ctx?.drawImage(data as HTMLImageElement, ...coordinate);
            }
        }

        handler[type]?.();
    });

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const parent = canvas.offsetParent as HTMLElement;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        setBrush(new Brush(canvas));
        setCanvas(canvas);
    }, [])

    return <canvas ref={canvasRef}/>
}