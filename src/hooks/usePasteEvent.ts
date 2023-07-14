import { Drop } from 'drop-handler';
import { useEffect, useState, useMemo, useCallback } from 'react';

let coordinate:[number, number] = [10, 20];

export function usePasteEvent(callback: (result: { type: 'text' | 'image', data: string | HTMLImageElement, coordinate: [number, number] }) => void) {
    const onPaste = (evt) => {
        if (!evt.clipboardData) {
            return;
        }
        const items = evt.clipboardData?.items;
        const currentItem = items[0] as DataTransferItem;

        if (!currentItem) {
            return;
        }
        const { kind, type } = currentItem;

        if (kind === 'string') {
            currentItem.getAsString((result: string) => callback({ type: 'text', data: result, coordinate }));
        }

        if (kind === 'file' && type.match('image')) {
            const file = currentItem.getAsFile() as File;
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => callback({ type: 'image', data: image, coordinate });
                image.src = reader.result as string;
            }
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        const drop = new Drop(document.body);
        drop.click(([x, y]) => {
            coordinate = [x, y];
        })
        window.addEventListener('paste', (evt) => onPaste(evt));
        return () => {
            window.removeEventListener('paste', onPaste);
        }
    }, []);
}