import { isPointInPathByOffCanvas } from "../utils";
import { drawSelectRect } from "../utils/drowSelectRect";
import { Dot } from "./dot";
import { Shape, tag } from "./shape";

@tag('ArrowShape')
export class ArrowShape implements Shape {
    width = 10;
    height = 100;
    arrowWidth = 4;
    arrowHeight = 10;
    ctx: CanvasRenderingContext2D | undefined;
    color = '#333';
    dots: Dot[] = [];
    
    constructor(public x: number, public y:number) {}

    getDrawPath(): Path2D {
        const {x, y, width, height, arrowWidth, arrowHeight} = this;
        const path = new Path2D();

        path.moveTo(x, y); 
        path.lineTo(x + width, y);
        path.lineTo(x + width, y + height);
        path.lineTo(x + width + arrowWidth, y + height);
        path.lineTo(x + width / 2, y + height + arrowHeight);
        path.lineTo(x - arrowWidth, y + height);
        path.lineTo(x, y + height)
        path.closePath();

        return path;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
        this.ctx.save();
        ctx.fillStyle = this.color;
        const path = this.getDrawPath();
        ctx.fill(path);
        this.ctx.restore();
    }
    clear(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    isInShape(x: number, y: number): boolean {
        return isPointInPathByOffCanvas(this.getDrawPath(), x, y);
    }


    updateData({ x = this.x, y = this.y, color = this.color, width = this.width, height = this.height }) {
        Object.assign(this, { x, y, color, width, height })
    }

    select(ctx: CanvasRenderingContext2D): void {
        const updateTop = (offsetX, offsetY) => {
            this.updateData({ y: this.y + offsetY, height: this.height - offsetY })
        }

        const updateBottom = (offsetX, offsetY) => {
            this.updateData({ height: this.height + offsetY })
        }

        const points = [
            { x: this.x + this.width / 2, y: this.y, cursor: 'row-resize', cb: updateTop },
            { x: this.x + this.width / 2, y: this.y + this.height + this.arrowHeight, cursor: 'row-resize',  cb: updateBottom }
        ];

        this.dots = points.map(({ x, y, cb, cursor }) => new Dot(ctx, this, x, y, cb, cursor));
    }

}