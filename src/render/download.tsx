import styled from 'styled-components';
import React, { memo } from 'react';
import { useBrush } from './hooks';
import { downloadFile } from '../utils/download';
import downloadSvg from '../assets/download.svg';

const Background = memo(styled.span({
    width: '24px',
    height: '24px',
}))

export function DownloadFile() {
    const brush = useBrush();

    function createIcon() {
        return { __html: downloadSvg }
    }

    async function onDownloadClick() {
        const blob = await brush?.toImageBlob();
        const url = URL.createObjectURL(blob as Blob);
        await downloadFile(`${Date.now()}.png`, url);
        URL.revokeObjectURL(url);
    }

    return <Background onClick={onDownloadClick} dangerouslySetInnerHTML={createIcon()} />
}