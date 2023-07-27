import { RefObject, useEffect } from "react";

export function useContextmenu(el: any, cb: (x: number, y: number) => void, deps) {

    function contextmenu(evt) {
        const {x, y} = evt;
        cb(x, y);
        evt.preventDefault();
    }


    useEffect(() => {
        if (!el) return;
        const canvasEl = el instanceof HTMLElement ? el : el.current;
        if (!(canvasEl instanceof HTMLElement)) return;
        canvasEl.addEventListener('contextmenu', contextmenu);
        return () => canvasEl.removeEventListener('contextmenu', contextmenu)

    }, deps)
}