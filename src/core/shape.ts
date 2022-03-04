export interface Shape{
    // new (initData: T): void;
    draw(ctx: CanvasRenderingContext2D): void;
    select(): void;
    clear(ctx: CanvasRenderingContext2D): void;
    isInShpe(x: number, y:number): boolean;
    updateData(data: any): void;
}


export class Rectangle implements Shape {

    offset = [0, 0];

    constructor(private x:number, private y:number) {

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        // const [ offsetX, offsetY ]= this.offset;
        ctx.fillStyle = 'rgb(24, 144, 255)';
        ctx.fillRect(this.x, this.y, 200, 200);
        ctx.restore();
    }

    select() {

    }

    updateData({ x, y }) {
        this.x = x;
        this.y = y;
    }

    isInShpe(x, y) {
        const isIn = (this.x < x && x < this.x + 200) && (this.y < y && y < this.y + 200);
        if (isIn) {
            this.offset = [x - this.x, y - this.y];
        }
        return isIn;
    }

    clear(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x, this.y, 200, 200);
    }
}