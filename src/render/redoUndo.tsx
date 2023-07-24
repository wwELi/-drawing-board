import React, { useEffect } from 'react';
import { useBrush } from './hooks';
import Icon from './icon';

export function RedoUndo() {

    const [brush] = useBrush();

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