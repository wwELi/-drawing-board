export function domParser(template: string): HTMLElement {
    const documentEl = new DOMParser().parseFromString(template, 'text/html');
    return ((documentEl.firstElementChild as Element).querySelector('body') as HTMLBodyElement).firstElementChild as HTMLElement;
}

export function fromXmlToJson() {}