import { ToolBar } from './toolbar';
import { BrushCanvas } from './brush';
import { DownloadFile } from './download';
import { BrushSize } from './size';

import React from 'react';
import styled from 'styled-components';

const Background = styled.main`
    position: relative;
    width: 100vw;
    height: 100vh;
`

const RightTopTools = styled.div`
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 10;
    display: flex;
    &>:nth-child(n):not(:last-child) {
        margin-right: 12px;
    };
    &>:nth-child(n){
        cursor: pointer;
    }
`

function Container() {
    return <Background>
        <RightTopTools>
            <BrushSize></BrushSize>
            <DownloadFile></DownloadFile>
        </RightTopTools>
        <BrushCanvas></BrushCanvas>
        <ToolBar></ToolBar>
    </Background>
}

export default Container;