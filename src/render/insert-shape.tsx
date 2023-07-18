import React, { useState, useMemo, useEffect } from 'react';
import Icon from './icon';
import { useBrush, useBrushCanvas } from './hooks';
import styled from 'styled-components';
import { Drop } from 'drop-handler';
import { Rectangle } from '../core/RectangleShape';
import { ArrowShape } from '../core/ArrowShape';

const Ul = styled.ul((props) => ({
    position: 'absolute',
    top: 28,
    listStyle: 'none',
    background: '#FFF',
    width: 50,
    padding: 4,
    boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    display: 'none'
}))

const Container = styled.span({
    position: 'relative',
    '&:hover': {
        '&>ul': {
            display: 'block'
        }
    }
})

export function InsertShape() {
    const [brush] = useBrush();
    const [canvas] = useBrushCanvas();
    const insert = useMemo(() => ({ status: false, canvas, shape: '' }), []);

    function onCanvasClick([x, y]) {
        if (!insert.status) return;
        const mapping = {
            Arrow: () => brush.push(new ArrowShape(x, y)),
            Rect: () => brush.push(new Rectangle(x, y))
        }

        mapping[insert.shape]();
        insert.status = false;
        insert.canvas.style.cursor = 'auto';
    }

    useEffect(() => {
        if (!brush) {
            return;
        }
        const canvas = brush.getContainerCanvas();
        const drop = new Drop(canvas);
        drop.click(onCanvasClick);
    }, [brush]);

    function onShapeClick(type) {
        insert.status = true;
        insert.canvas = canvas;
        insert.shape = type;
        canvas.style.cursor = 'cell';
    }

    return <Container>
        <Icon name="insert"></Icon>
        <Ul>
            <li onClick={() => onShapeClick('Rect')}>正方形</li>
            <li onClick={() => onShapeClick('Arrow')}>箭头</li>
        </Ul>
    </Container>
}