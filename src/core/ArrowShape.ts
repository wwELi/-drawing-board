import { drawSelectRect } from "../utils/drowSelectRect";
import { Shape, tag } from "./shape";

@tag('ArrowShape')
export class ArrowShape implements Shape {
    width = 10;
    height = 100;
    arrowWidth = 4;
    arrowHeight = 10;
    ctx: CanvasRenderingContext2D | undefined;
    color = '#333'
    
    constructor(public x: number, public y:number) {}

    drawPath() {
        const {ctx, x, y, width, height, arrowWidth, arrowHeight} = this;
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(x, y); 
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width + arrowWidth, y + height);
        ctx.lineTo(x + width / 2, y + height + arrowHeight);
        ctx.lineTo(x - arrowWidth, y + height);
        ctx.lineTo(x, y + height)
        ctx.closePath();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
        this.ctx.save();
        ctx.fillStyle = this.color;
        this.drawPath();
        ctx.fill();
        this.ctx.restore();
    }
    clear(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    isInShape(x: number, y: number): boolean {
        if (!this.ctx) return false;
        // TODO isPointInPath 判断无法生效
        // this.ctx.isPointInPath(x, y)
        return (this.x < x && x < this.x + this.width) && (this.y < y && y < this.y + this.height)
    }


    updateData({ x = this.x, y = this.y, color = this.color, width = this.width, height = this.height }) {
        Object.assign(this, { x, y, color, width, height })
    }

    select(ctx: CanvasRenderingContext2D): void {
        const points = [
            { x: this.x + this.width / 2, y: this.y },
            { x: this.x + this.width / 2, y: this.y + this.height + this.arrowHeight }
        ];
        drawSelectRect(points, ctx);
    }

}