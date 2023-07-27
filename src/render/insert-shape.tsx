import React, { useState, useMemo, useEffect } from 'react';
import Icon from './icon';
import { useBrush } from './hooks';
import styled from 'styled-components';
import { Drop } from 'drop-handler';
import { Rectangle } from '../core/RectangleShape';
import { ArrowShape } from '../core/ArrowShape';
import { CircleShape } from '../core/CircleShape';
import { Brush } from '../core/brush';

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
    const brush = useBrush() as Brush;
    const insert = useMemo(() => ({ status: false, canvas: brush?.getContainerCanvas(), shape: '' }), []);

    function onCanvasClick(evt: MouseEvent) {
        if (!insert.status || !brush) return;
        const {x, y} = evt;
        evt.stopPropagation();
        evt.preventDefault();

        const mapping = {
            Arrow: () => brush.push(new ArrowShape(x, y)),
            Rect: () => brush.push(new Rectangle(x, y)),
            Circle: () => brush.push(new CircleShape(x, y))
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
        canvas.addEventListener('click', onCanvasClick);
        return () => {
            canvas.removeEventListener('click', onCanvasClick);
        }
    }, [brush]);

    function onShapeClick(type) {
        insert.status = true;
        insert.canvas = brush.getContainerCanvas();
        insert.shape = type;
        insert.canvas.style.cursor = 'cell';
    }

    return <Container>
        <Icon name="insert"></Icon>
        <Ul>
            <li onClick={() => onShapeClick('Rect')}>正方形</li>
            <li onClick={() => onShapeClick('Arrow')}>箭头</li>
            <li onClick={() => onShapeClick('Circle')}>圆</li>
        </Ul>
    </Container>
}