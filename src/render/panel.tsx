import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Brush } from '../core/brush';
import { Rectangle } from '../core/RectangleShape';
import { Shape } from '../core/shape';

function RectanglePanel(shape: Rectangle, brush: Brush) {
    const [color, setColor] = useState(shape.color);
    const [width, setWidth] = useState(shape.width);
    const [height, setHeight] = useState(shape.height);

    function onchange(evt: BaseSyntheticEvent) {
        setColor(evt.target.value);
    }

    function onWidthChange(evt: BaseSyntheticEvent) {
        setWidth(Number(evt.target.value));
    }

    function onHeightChange(evt: BaseSyntheticEvent) {
        setHeight(Number(evt.target.value));
    }

    useEffect(() => {
        if (!shape.updateData) return;
        shape.updateData({ color, width, height });
        brush.redraw();
    }, [color, width, height])

    return <div>
           <div>
            color: <input type="color" onChange={onchange} value={color}/>
           </div>
           <div>
            width: <input type="range" min={20} max={400} onChange={onWidthChange} value={width}></input>
           </div>
           <div>
            height: <input type="range" min={20} max={400} onChange={onHeightChange} value={height}></input>
           </div>
    </div>
}

const mapping = {
    Rectangle: RectanglePanel
}

const Container = styled.div`
    width: 200px;
    height: 100px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 5px 5px 5px #333;
    padding: 8px;
`

export function Panel(props: { shape: Shape, brush: Brush }) {
    const type = Object.prototype.toString.call(props.shape);
    const match = type.match(/\[object ([^\]]+)\]/);

    if (!match) {
        return <>No Match Panel</>
    }

    const render = mapping[match[1]];

    return <Container>{ render(props.shape, props.brush) }</Container>
}