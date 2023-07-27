import { Drop } from "drop-handler";
import { RefObject, useEffect, useMemo } from "react";

export function useSpaceMove(el: HTMLElement | undefined | null, cb: (x: number, y: number) => void, deps) {
    let isSpacePressed = false;

    function keydown(event) {
        if (event.code === "Space") {
            isSpacePressed = true;
        }
    }

    function keyup(event) {
        if (event.code === "Space") {
            isSpacePressed = false;
        }
    }

    useEffect(() => {
        const containerEl = el;
        if (!(containerEl instanceof HTMLElement)) return;

        document.addEventListener('keydown', keydown);
        document.addEventListener('keyup', keyup);

        const drop = new Drop(containerEl);
        let lastX, lastY;
    
        const onMove = ([x, y]) => {
            if (!isSpacePressed) return;
            if (!lastX || !lastY) {
                lastX = x;
                lastY = y;
                return;
            }
            cb(x - lastX, y - lastY)
            lastX = x;
            lastY = y;
        }
    
        drop
        .move(onMove)
        .up(() => lastX = lastY = null);

        return () => {
            document.removeEventListener('keydown', keydown);
            document.removeEventListener('keyup', keyup);
        }
    }, [deps])

}