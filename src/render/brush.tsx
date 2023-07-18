import { Brush } from '../core/brush';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useBrush, useBrushCanvas } from './hooks';
import { usePasteEvent } from '../hooks/usePasteEvent';
import { ImageShape } from '../core/imageShape';
import { TextShape } from '../core/textShape';
import { Drop } from 'drop-handler';
import { PopUp } from './popup';
import { Panel } from './panel';

let brush: Brush;

function translate(brush: Brush) {
    const drop = new Drop(brush.getContainerCanvas());
    let lastX, lastY;

    const onMove = ([x, y]) => {
        if (!lastX || !lastY) {
            lastX = x;
            lastY = y;
            return;
        }
        brush.translate(x - lastX, y - lastY);
        lastX = x;
        lastY = y;
    }

    drop
    .move(onMove)
    .up(() => lastX = lastY = null);
}

function handlerSelect(canvasEl: HTMLCanvasElement) {
    canvasEl.addEventListener('contextmenu', (evt) => {
        const {x, y} = evt;
        const shapes = brush.getSelectShapes(x, y);
        const shape = shapes[0];
        PopUp.close();
        if (shape) {
            PopUp.show(<Panel shape={shape} brush={brush}></Panel>, { x, y });
        }
        evt.preventDefault();
    });

    canvasEl.addEventListener('click', () => {
        PopUp.close();
    })
}

export function BrushCanvas() {
    const canvasRef = useRef(null); 
    const [,setBrush] = useBrush();
    const [, setCanvas] = useBrushCanvas();

    usePasteEvent(({ type, data, coordinate }) => {
        const handler = {
            text: () => {
                brush.push(new TextShape(...coordinate, data as string));
            },
            image: () => {
                brush.push(new ImageShape(...coordinate, data as HTMLImageElement))
            }
        }

        handler[type]?.();
    });

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const parent = canvas.offsetParent as HTMLElement;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        brush = new Brush(canvas);

        setBrush(brush);
        setCanvas(canvas);
        translate(brush);
        handlerSelect(canvas);
    }, [])

    return <canvas ref={canvasRef}/>
}