import { Brush } from '../core/brush';
import React, { useEffect, useRef } from 'react';
import { useBrush, useBrushCanvas } from './hooks';

export function BrushCanvas() {
    const canvasRef = useRef(null); 
    const [, setBrush] = useBrush();
    const [, setCanvas] = useBrushCanvas();

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