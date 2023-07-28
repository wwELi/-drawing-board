import { drawSelectRect } from "../utils/drowSelectRect";
import { Dot } from "./dot";
import { Shape, tag } from "./shape";

@tag('Rectangle')
export class Rectangle implements Shape {

    color = '#1990ff';
    width = 200;
    height = 200;
    text = '';
    dots: Dot[] = [];

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
            { x, y, cursor: 'nw-resize', cb: (offsetX, offsetY) => this.updateData({ x: this.x + offsetX, y: this.y + offsetY, width: this.width - offsetX, height: this.height - offsetY  }) },
            { x: x + width / 2, y, cursor: 'n-resize', cb: (offsetX, offsetY) => this.updateData({ height: this.height - offsetY, y: this.y + offsetY }) },
            { x: x + width, y, cursor: 'ne-resize', cb: (offsetX, offsetY) => this.updateData({ width: offsetX + this.width, y: this.y + offsetY, height: this.height - offsetY })},
            { x: x + width, y: y + height / 2, cursor: 'e-resize', cb: (offsetX, offsetY) => this.updateData({ width: this.width + offsetX }) },
            { x: x + width, y: y + height, cursor: 'se-resize', cb: (offsetX, offsetY) => this.updateData({ width: this.width + offsetX, height: this.height + offsetY }) },
            { x: x + width / 2, y: y + height, cursor: 's-resize', cb: (offsetX, offsetY) => this.updateData({ height: this.height + offsetY }) },
            { x, y: y + height, cursor: 'sw-resize', cb: (offsetX, offsetY) => this.updateData({ x: this.x + offsetX, width: this.width - offsetX, height: this.height + offsetY  }) },
            { x, y: y + height / 2 ,cursor: 'w-resize', cb: (offsetX, offsetY) => this.updateData({ x: this.x + offsetX, width: this.width - offsetX })}
        ]

        this.dots = points.map(({ x, y, cb, cursor }) => new Dot(ctx, this, x, y, cb, cursor));
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
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
}