import React, { useState, useMemo, useEffect } from 'react';
import Icon from './icon';
import { useBrush, useBrushCanvas } from './hooks';
import styled from 'styled-components';
import { Rectangle } from '../core/shape';

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
    const insert = useMemo(() => ({ status: false, canvas }), []);

    function onCanvasClick([x, y]) {
        if (!insert.status) return;
        brush.push(new Rectangle(x, y));
        insert.status = false;
        insert.canvas.style.cursor = 'auto';
    }

    useEffect(() => {
        if (brush) {
            brush.events.click(onCanvasClick);
        }
    }, [brush]);

    function onShapeClick() {
        insert.status = true;
        insert.canvas = canvas;
        canvas.style.cursor = 'cell';
    }

    return <Container>
        <Icon name="insert"></Icon>
        <Ul>
            <li onClick={onShapeClick}>正方形</li>
        </Ul>
    </Container>
}