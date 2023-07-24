import { Shape, tag } from './shape';
@tag()
export class TextShape implements Shape {
    constructor(public x:number, public y:number, private text: string ) {}

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillText(this.text, this.x, this.y)
    }
    clear(ctx: CanvasRenderingContext2D): void {
        // throw new Error('Method not implemented.');
    }
    isInShape(x: number, y: number): boolean {
        return true;
    }
    select(ctx: CanvasRenderingContext2D): void {
        // 
    }
}
