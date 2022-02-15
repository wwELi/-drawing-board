import { PNode, Classes, Children, Click } from '../core/node';
import brushSvg from '../assets/brush.svg';

export class BrushSize extends PNode {
    template = 'span';

    @Classes()
    size = {
        display: 'inline-block',
    }

    mounted() {
        this.hostView.innerHTML = brushSvg;
    }

    @Click()
    onclick() {
        console.log('--');
    }
}

const startColor = '#0000ff';
const endColor = '#ffc0cb';

export class ToolBar extends PNode {
    template = 'div';

    // @Children(BrushSize)
    // brushSize!: BrushSize

    private colorChanges: Function[] = [];

    @Classes()
    bacground = {
        height: '60px',
        position: 'fixed',
        bottom: '20px',
        width: '400px',
        background: 'linear-gradient(to right, blue, pink)',
        transform: 'translate(-50%)',
        left: '50%',
        'z-index': 100,
        'border-radius': '5px',
    }

    @Click()
    onclick(evt: PointerEvent) {
        const startColorsHexs = this.formatColorToNumner(startColor);
        const endColorsHexs = this.formatColorToNumner(endColor);
        const target = evt.target as HTMLElement;
        const percent = evt.offsetX / target.offsetWidth;
        const colors = startColorsHexs.map((start, index) => {
            const hNum = (endColorsHexs[index] - start) * percent + start;  
            return Math.round(hNum).toString(16);
        });

        const color = colors.reduce((prev, curr) => {
            return prev + (curr.length > 1 ? curr : `0${curr}`);
        }, '#');

        this.colorChanges.forEach((fn) => fn(color));
    }

    public onBrushColorChange(fn: Function) {
        this.colorChanges.push(fn);
    }

    formatColorToNumner(color: string): number[] {
        const reg = /^#(\w{2})(\w{2})(\w{2})/;
        const [,m1, m2, m3] = color.match(reg) as RegExpMatchArray;
        return [parseInt(m1, 16), parseInt(m2, 16), parseInt(m3, 16)];
    }
}