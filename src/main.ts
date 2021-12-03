import { render } from './render';


const mainEl = document.querySelector('#main');

console.log(mainEl);

if (mainEl) {
    render(mainEl as HTMLElement);
}
