import { Brush } from './../core/brush';
import { PNode } from '../core/node';


export class BrushCanvas extends PNode {
    template = 'canvas';

    brush!: Brush;

    mounted() {
        const el = this.hostView as HTMLCanvasElement;
        const parent = this.parent.hostView;
        el.width = parent.offsetWidth;
        el.height = parent.offsetHeight;

        this.brush = new Brush(el);
    }

    public setBrushColor(color: string) {
        this.brush.setBrushColor(color);
    }
}