export interface Shape{
    x: number;
    y: number;
    text?: string;
    draw(ctx: CanvasRenderingContext2D): void;
    select(ctx: CanvasRenderingContext2D): void;
    clear(ctx: CanvasRenderingContext2D): void;
    isInShape(x: number, y:number, ctx: CanvasRenderingContext2D): boolean;
    updateData?(data: any): void;
    fillText?(text: string, ctx: CanvasRenderingContext2D): void;
}

export function tag(name) {
    return function(target) {
        Object.defineProperty(target.prototype, Symbol.toStringTag, { value: name });
    }
}