import { drawSelectRect } from "../utils/drowSelectRect";
import { Shape, tag } from "./shape";

@tag('Rectangle')
export class Rectangle implements Shape {

    color = '#1990ff';
    width = 200;
    height = 200;
    text = '';

    constructor(public x:number, public y:number) {

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    select(ctx: CanvasRenderingContext2D) {
        const { x, y, width, height } = this;

        const points = [
            { x, y },
            { x: x + width / 2, y },
            { x: x + width, y },
            { x: x + width, y: y + height / 2 },
            { x: x + width, y: y + height },
            { x: x + width / 2, y: y + height },
            { x, y: y + height },
            { x, y: y + height / 2 }
        ]

        drawSelectRect(points, ctx);
    }

    updateData({ x = this.x, y = this.y, color = this.color, width = this.width, height = this.height }) {
        Object.assign(this, { x, y, color, width, height })
    }

    isInShape(x, y) {
        const isIn = (this.x < x && x < this.x + this.width) && (this.y < y && y < this.y + this.height);
        return isIn;
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    fillText(text: string, ctx: CanvasRenderingContext2D): void {
        this.text = text;
        ctx.font = "bold 24px serif";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2)
    }
}