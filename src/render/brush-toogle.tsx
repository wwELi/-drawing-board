import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import Icon from './icon';
import { useBrush } from './hooks';

const BrushIcon = styled(Icon)`
    filter: grayscale(${(props) => (props.gray)})
`

export function BrushToogle() {

    const brush = useBrush();
    const [stroke, setStroke] = useState(false);

    function onIconClick() {
        setStroke(!stroke);
    }

    useEffect(() => {
        brush && (brush.isStroke = stroke);
    }, [stroke])

    return (
        <BrushIcon name="brush" onClick={onIconClick} gray={stroke ? '0' : '1'}></BrushIcon>
    )
}
