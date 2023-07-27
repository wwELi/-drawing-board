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
import { Shape } from '../core/shape';
import { useVariable } from './use-variable';

let brush: Brush;

function renderCanvasBackGround(el: HTMLCanvasElement) {
    const [border] = useVariable('1px');
    const [size] = useVariable('28px');
    const [color] = useVariable('#f5d7ee');

    function genLinearGradient(deg: number): string {
        return `linear-gradient(${deg}deg, transparent var(${size}), var(${color}) var(${size}))`
    }

    const style = {
        position: 'absolute',
        top: '0',
        left: '0',
        background: [genLinearGradient(180), genLinearGradient(90)].join(','),
        backgroundSize: `calc(var(${size}) + var(${border})) calc(var(${size}) + var(${border}))`,
    }

    Object.keys(style).forEach((key) => {
        el.style[key] = style[key];
    });
}

function translate(brush: Brush) {
    const containerEl = brush.getContainerCanvas();
    let isSpacePressed = false;

    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") {
            isSpacePressed = true;
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.code === "Space") {
            isSpacePressed = false;
          }
    })

    const drop = new Drop(containerEl);
    let lastX, lastY;

    const onMove = ([x, y]) => {
        if (!isSpacePressed) return;
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

function moveSelectShape(canvasEl: HTMLCanvasElement) {
    let selectShape: Shape | null = null;
    let lastX, lastY;
    new Drop(canvasEl)
        .click(([x, y]) => {
            const shapes = brush.getSelectShapes(x, y);
            const shape = shapes[0];
            selectShape = shape;
        })
        .move(([x, y]) => {
            if (!selectShape || !lastX || !lastY) {
                lastX = x;
                lastY = y;
                return;
            }

            selectShape.x = selectShape.x + x - lastX;
            selectShape.y = selectShape.y + y - lastY;

            brush.redraw();

            lastX = x;
            lastY = y;
        })
        .up(() => lastX = lastY = null);
}

function onRenderSelectedShape(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.addEventListener('click', (evt) => {
        const {x, y} = evt;
        brush.redraw();
        const shapes = brush.getSelectShapes(x, y);
        console.log('===>', shapes)
        shapes.forEach((shape) => shape.select(ctx));
    })
}

function useDblclickEditShapeText() {
    useEffect(() => {
    })
}

export function BrushCanvas() {
    const canvasRef = useRef(null); 
    const [,setBrush] = useBrush();
    const [, setCanvas] = useBrushCanvas();

    usePasteEvent(({ type, data, coordinate }) => {
        const handler = {
            text: () => brush.push(new TextShape(...coordinate, data as string)),
            image: () => brush.push(new ImageShape(...coordinate, data as HTMLImageElement))
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
        moveSelectShape(canvas);
        onRenderSelectedShape(canvas)
        renderCanvasBackGround(canvas);
    }, [])

    return <canvas ref={canvasRef}/>
}