import { Shape, tag } from "./shape";

@tag()
export class Rectangle implements Shape {

    color = '#1990ff';
    width = 200;
    height = 200;

    constructor(public x:number, public y:number) {

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    select(ctx: CanvasRenderingContext2D) {
        const points = getPoints([this.x, this.y], 200, 200);
        const pointWidth = 8;

        points.forEach(([x, y]) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.fillStyle = '#fff';
            ctx.lineWidth = 1;
            const sPoints = getPoints([-(pointWidth / 2), -(pointWidth / 2)], pointWidth, pointWidth);
            sPoints.forEach((point: [number, number], index) => {
                index === 0 ?  ctx.moveTo(...point) : ctx.lineTo(...point);
            });
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        })
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
}

function getPoints(start: [number, number], width: number, height: number): [number, number][] {
    const [sx, sy] = start; 
    const w = width / 2;
    const h = height / 2;
    const points: [number, number][] = [
        [sx, sy],
        [sx + w, sy],
        [sx + width, sy],
        [sx + width, sy + h],
        [sx + width, sy + height],
        [sx + w, sy + height],
        [sx, sy + height],
        [sx, sy + w],
    ]

    return points;
}