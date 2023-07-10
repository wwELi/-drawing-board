import { useEffect } from 'react';


export function usePasteEvent(callback: (result: { type: 'text' | 'image', data: string | HTMLImageElement }) => void) {

    function onPaste(evt) {
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
            currentItem.getAsString((result: string) => callback({ type: 'text', data: result }));
        }

        if (kind === 'file' && type.match('image')) {
            const file = currentItem.getAsFile() as File;
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => callback({ type: 'image', data: image });
                image.src = reader.result as string;
            }
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        window.addEventListener('paste', onPaste);
        return () => {
            window.removeEventListener('paste', onPaste);
        }
    }, []);
}