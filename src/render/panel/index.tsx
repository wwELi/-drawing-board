import React from 'react';
import styled from 'styled-components';
import { Brush } from '../../core/brush';
import { Shape } from '../../core/shape';
import { BasePanel } from './basePanel';


const mapping = {
    Rectangle: BasePanel,
    ArrowShape: BasePanel,
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

    const render = mapping[match[1]] || (() => {});

    return <Container>{ render(props.shape, props.brush) }</Container>
}