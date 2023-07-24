import { Shape, tag } from './shape';
@tag('ImageShape')
export class ImageShape implements Shape {
    constructor(public x:number, public y:number, private image: HTMLImageElement) {
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
    select(ctx: CanvasRenderingContext2D): void {
        //
    }
}