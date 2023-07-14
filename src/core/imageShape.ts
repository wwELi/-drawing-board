import { Shape } from './shape';
export class ImageShape implements Shape {
    constructor(private x:number, private y:number, private image: HTMLImageElement) {
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x, this.y);
    }
    clear(ctx: CanvasRenderingContext2D): void {
       ctx.clearRect(this.x, this.y, this.image.width, this.image.height)
    }
    isInShape(x: number, y: number): boolean {
        return true;
    }
}