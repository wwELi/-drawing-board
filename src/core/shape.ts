export interface Shape{
    x: number;
    y: number;
    draw(ctx: CanvasRenderingContext2D): void;
    select(ctx: CanvasRenderingContext2D): void;
    clear(ctx: CanvasRenderingContext2D): void;
    isInShape(x: number, y:number): boolean;
    updateData?(data: any): void;
}

export function tag(name) {
    return function(target) {
        Object.defineProperty(target.prototype, Symbol.toStringTag, { value: name });
    }
}

export const SelectPointWidth = 8;