import React from 'react';
import styled from 'styled-components';
import brushSvg from '../assets/brush.svg';

const Background = styled.div({
    width: '24px',
    height: '24px'
});

export function BrushSize() {

    function createIcon() {
        return { __html: brushSvg }
    }

    return (
        <Background dangerouslySetInnerHTML={createIcon()}></Background>
    )
}
