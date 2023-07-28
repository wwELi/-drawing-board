import { isPointInPathByOffCanvas } from "../utils";
import { Shape } from "./shape";

const SelectPointWidth = 8;

type Handler = (offsetX: number, offsetY: number) => void;

export class Dot {
    constructor(
        public ctx: CanvasRenderingContext2D,
        public shape: Shape, public x: number,
        public y: number, 
        public onSelectCb: Handler,
        public cursor: string) {
        this.draw()
    }

    getDrawPath() {
        const path = new Path2D();
        path.rect(this.x - SelectPointWidth / 2, this.y - SelectPointWidth / 2, SelectPointWidth, SelectPointWidth);
        path.closePath();
        return path;
    }

    draw() {
        const path = this.getDrawPath();
        this.ctx.save();
        this.ctx.fillStyle = '#FFF';
        this.ctx.strokeStyle = '#333';
        this.ctx.stroke(path);
        this.ctx.fill(path);
        this.ctx.restore();
    }

    isInPath(x: number, y: number): boolean {
        return isPointInPathByOffCanvas(this.getDrawPath(), x, y);
    }
}