import { Drop } from '../utils/drop';
export class Brush {

    private ctx: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        const drop = new Drop(canvas);

        this.ctx.lineWidth = 10;

        drop
        .start(([x, y]) => this.moveTo(x, y))
        .move(([x, y]) => this.line(x, y));
    }

    private moveTo(x: number, y: number) {
        this.ctx.moveTo(x, y);
    }

    private line(x: number, y: number) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

}