import jss from 'jss'
import preset from 'jss-preset-default';
import { useVariable } from './use-variable';
import { setGlobalStyle } from './global';
import { setClassName } from '../utils/index';
import { Brush } from '../core/brush';

function renderCanvasBackGround(el: HTMLElement) {
    const [border, setBorder] = useVariable('1px');
    const [size, setSize] = useVariable('28px');
    const [color, setColor] = useVariable('#f5d7ee');

    function genLinearGradient(deg: number): string {
        return `linear-gradient(${deg}deg, transparent var(${size}), var(${color}) var(${size}))`
    }

    const { classes } = jss.createStyleSheet({
        main: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        },
        background: {
            backgroundSize: `calc(var(${size}) + var(${border})) calc(var(${size}) + var(${border}))`,
            background: [genLinearGradient(180), genLinearGradient(90)].join(','),
        }
    }).attach();

    setClassName(el, [classes.main, classes.background]);
}


function renderToolBar(el: HTMLElement) {

}

export function render(el: HTMLElement) {
    jss.setup(preset());
    setGlobalStyle();
    renderCanvasBackGround(el);

    const canvas = document.createElement('canvas');
    canvas.width = el.offsetWidth;
    canvas.height = el.offsetHeight;
    el.appendChild(canvas);

    renderToolBar(el);

    const brush = new Brush(canvas);
}

