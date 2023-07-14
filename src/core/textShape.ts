import { Shape } from './shape';
export class TextShape implements Shape {
    constructor(private x:number, private y:number, private text: string ) {}

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillText(this.text, this.x, this.y)
    }
    clear(ctx: CanvasRenderingContext2D): void {
        // throw new Error('Method not implemented.');
    }
    isInShape(x: number, y: number): boolean {
        return true;
    }
}