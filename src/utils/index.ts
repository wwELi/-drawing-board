export function setClassName(el: HTMLElement, className: string| string []): void {

    const classes = Array.isArray(className) ? className : [className]

    el.className = `${el.className} ${classes.join(' ')}`.trim();
}

export function getOffsetPosition(el: HTMLElement, left = 0, top = 0): [number, number] {
    const l = el.offsetLeft + left;
    const t = el.offsetTop + top;

    if (el.offsetParent instanceof HTMLElement) {
        return getOffsetPosition(el.offsetParent, l, t);
    }

    return [l, t];

}

export function isFunction(fn: any): boolean {
    return typeof fn === 'function';
}