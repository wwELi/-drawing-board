export interface Shape{
    // new (initData: T): void;
    draw(ctx: CanvasRenderingContext2D): void;
    select?(ctx: CanvasRenderingContext2D): void;
    clear(ctx: CanvasRenderingContext2D): void;
    isInShape(x: number, y:number): boolean;
    updateData?(data: any): void;
}