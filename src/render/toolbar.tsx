import React from 'react';
import styled from 'styled-components';
import { useBrush } from './hooks';

const startColor = '#0000ff';
const endColor = '#ffc0cb';

const BackgroundImage = styled.div`
    height: 60px;
    position: fixed;
    bottom: 20px;
    width: 400px;
    background: linear-gradient(to right, blue, pink);
    transform: translate(-50%);
    left: 50%;
    z-index: 100;
    border-radius: 5px;
 `;

export function ToolBar(props) {
    const [brush] = useBrush();

    function  formatColorToNumner(color: string): number[] {
        const reg = /^#(\w{2})(\w{2})(\w{2})/;
        const [,m1, m2, m3] = color.match(reg) as RegExpMatchArray;
        return [parseInt(m1, 16), parseInt(m2, 16), parseInt(m3, 16)];
    }

    function onToolBarClick(evt: React.MouseEvent) {
        const startColorsHexs = formatColorToNumner(startColor);
        const endColorsHexs = formatColorToNumner(endColor);
        const target = evt.target as HTMLElement;
        const percent = evt.nativeEvent.offsetX / target.offsetWidth;
        const colors = startColorsHexs.map((start, index) => {
            const hNum = (endColorsHexs[index] - start) * percent + start;  
            return Math.round(hNum).toString(16);
        });

        const color = colors.reduce((prev, curr) => {
            return prev + (curr.length > 1 ? curr : `0${curr}`);
        }, '#');
        brush.setBrushColor(color);
    }

    return <BackgroundImage onClick={onToolBarClick}/>
}