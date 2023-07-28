import { isPointInPathByOffCanvas } from "../utils";
import { drawSelectRect } from "../utils/drowSelectRect";
import { Shape, tag } from "./shape";

@tag('CircleShape')
export class CircleShape implements Shape {

    radius = 40;
    color = '#1990ff';

    constructor(public x: number, public y: number  ) {}

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.imageSmoothingEnabled = true;
        const { x, y, radius, color } = this;
        ctx.beginPath();
        ctx.save();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    select(ctx: CanvasRenderingContext2D): void {
        const points = [
            { x: this.x - this.radius, y: this.y },
            { x: this.x, y: this.y - this.radius },
            { x: this.x + this.radius, y: this.y },
            { x: this.x, y: this.y + this.radius }
        ]
        drawSelectRect(points, ctx);
    }
    clear(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    isInShape(x: number, y: number, ctx: CanvasRenderingContext2D): boolean {
        const path = new Path2D();
        path.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        path.closePath();
        return isPointInPathByOffCanvas(path, x, y);
    }
    updateData?(data: any): void {
        // throw new Error("Method not implemented.");
    }
}