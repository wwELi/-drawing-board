import { Brush } from './../core/brush';
import { PNode } from '../core/node';
import { downloadFile } from '../utils/download';


export class BrushCanvas extends PNode {
    template = 'canvas';

    brush!: Brush;

    mounted() {
        const el = this.hostView as HTMLCanvasElement;
        const parent = this._parent.hostView;
        el.width = parent.offsetWidth;
        el.height = parent.offsetHeight;

        this.brush = new Brush(el);
    }

    public setBrushColor(color: string) {
        this.brush.setBrushColor(color);
    }

    public async downloadImage() {
        const blob = await this.brush.toImageBlob();
        const url = URL.createObjectURL(blob);
        await downloadFile(`${Date.now()}.png`, url);
        URL.revokeObjectURL(url);
    }

    public setBrushSize(size: number) {
        this.brush.setBrushSize(size);
    }
}