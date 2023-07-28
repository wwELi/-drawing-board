import React, { useEffect, useRef } from 'react';
import { useBrush } from '../hooks';
import { useVariable } from '../use-variable';
import { dbClickInputText, drawSelectedShape, moveSelectedShape, onContextmenu, onPasteCanvas, onPressSpaceDropMove } from './hooks';

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

export function BrushCanvas() {
    const canvasRef = useRef(null); 
    const brush = useBrush(canvasRef);

    // 粘贴
    onPasteCanvas(brush);
    // 按下空格鼠标拖动画布
    onPressSpaceDropMove(brush);
    // 右击显示属性面板
    onContextmenu(brush);
    // 拖动选中的图形
    moveSelectedShape(brush);
    // 绘制选择点击选中的图形
    drawSelectedShape(brush);
    // 双击图形输入文字
    dbClickInputText(brush);

    useEffect(() => {
        const canvas = canvasRef.current as unknown as HTMLCanvasElement;
        const parent = canvas.offsetParent as HTMLElement;

        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.style.width = parent.offsetWidth + 'px';
        canvas.style.height = parent.offsetHeight + 'px';
        canvas.width = parent.offsetWidth * dpr;
        canvas.height = parent.offsetHeight * dpr;
        ctx.scale(dpr, dpr);

        renderCanvasBackGround(canvas);
    }, [brush])

    return <canvas ref={canvasRef}/>
}