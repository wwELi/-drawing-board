import React, { useEffect } from 'react';
import { useBrush } from './hooks';
import Icon from './icon';
import { Brush } from '../core/brush';

export function RedoUndo() {

    const brush = useBrush() as Brush;

    useEffect(() => {
        if (!brush) return;

        brush
    }, [brush])

    function onUndoClick() {
        brush.prev();
    }

    return <div>
        <Icon onClick={onUndoClick} name="undo"></Icon>
    </div>
}