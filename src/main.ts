import { render } from './render';


const mainEl = document.querySelector('#main');

if (mainEl) {
    render(mainEl as HTMLElement);
}
