import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Brush } from '../../core/brush';
import { Rectangle } from '../../core/RectangleShape';

export function BasePanel(shape: Rectangle, brush: Brush) {
    const [color, setColor] = useState(shape.color);
    const [width, setWidth] = useState(shape.width);
    const [height, setHeight] = useState(shape.height);

    function onchange(evt: BaseSyntheticEvent) {
        setColor(evt.target.value);
        brush.takeSnapshot();
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
