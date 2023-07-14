import { Drop } from 'drop-handler';
import { useVariable } from '../render/use-variable';
import { Stack } from './stack';
import addWatermark from '../utils/watermark';
import { List } from '../utils/list';
import { Shape } from './shape';

function renderCanvasBackGround(el: HTMLCanvasElement) {
    const [border] = useVariable('1px');
    const [size] = useVariable('28px');
    const [color] = useVariable('#f5d7ee');

    function genLinearGradient(deg: number): string {
        return `linear-gradient(${deg}deg, transparent var(${size}), var(${color}) var(${size}))`
    }

    const style = {
        position: 'absolute',
        top: '0',
        left: '0',
        background: [genLinearGradient(180), genLinearGradient(90)].join(','),
        backgroundSize: `calc(var(${size}) + var(${border})) calc(var(${size}) + var(${border}))`,
    }

    Object.keys(style).forEach((key) => {
        el.style[key] = style[key];
    });
}

export class Brush {

    private stack = new Stack<ImageData>();
    private ctx: CanvasRenderingContext2D;
    private movedPoints:List<{ x: number, y:number }> = new List(4);
    private shapes: Shape[] = [];
    private onCanvasClickHandler: ((coordinate: [number, number]) => void)[] = [];
    public isStroke = false;
    private offset = new Map<Shape, { x: number, y:number }>()

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.clearAliasing();
        renderCanvasBackGround(canvas);
        // this.initDropHandler();
    }

    getShapes(): Shape[] {
        return this.shapes;
    }

    getContainerCanvas():HTMLCanvasElement {
        return this.canvas;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        this.shapes.forEach((shape) => {
            const offset = this.offset.get(shape) || { x: 0, y: 0 };
            this.ctx.save();
            this.ctx.translate(-offset.x, -offset.y);
            shape.draw(this.ctx);
            this.ctx.restore();
        })
    }

    translateX = 0;
    translateY = 0;
    translate(x: number, y: number, cb) {
        this.translateX = this.translateX + x;
        this.translateY = this.translateY + y;
        this.ctx.save();
        this.ctx.translate(this.translateX, this.translateY);
        cb();
        this.ctx.restore();
        this.ctx.fillText('test', 20, 20)
    }

    // TODO 移除方法
    private initDropHandler() {
        const drop = new Drop(this.canvas);
        this.stack.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));

        drop
        .click(([x, y]) => {
            this.onCanvasClickHandler.forEach(fn => fn([x, y]));
        })
        .start(([x, y]) => {
            if(!this.isStroke) return;
            this.ctx.beginPath();
            this.movedPoints.push({ x, y });
        })
        .move(([x, y]) => {
            if (!this.isStroke) {
                this.shapes
                .filter((shape) => shape?.isInShape ? shape.isInShape(x, y) : void 0)
                .forEach((shape) => {
                    shape.clear(this.ctx);
                    shape?.updateData ? shape.updateData({ x, y }) : void 0;
                    shape.draw(this.ctx);
                })
                // this.shapes
                return;
            }
            // if(!this.isStroke) return;
            this.movedPoints.push({ x, y });
            this.line();
        })
        .up(() => {
            if(!this.isStroke) return;
            this.ctx.closePath();
            this.movedPoints.clear();
            this.stack.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
        })
    }

    // 消除线条出现锯齿问题
    private clearAliasing() {
        const canvas = this.canvas;
        const width = canvas.width;
        const height = canvas.height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 10;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    private line() {
        if(this.movedPoints.length < 3) {
            return;
        }
        const len = this.movedPoints.length;
        const endx = (this.movedPoints[len - 1].x + this.movedPoints[len - 2].x) / 2;
        const endy = (this.movedPoints[len - 1].y + this.movedPoints[len - 2].y) / 2;
        const lastX = this.movedPoints.length === 3
            ? this.movedPoints[len - 3].x
            : (this.movedPoints[len - 3].x + this.movedPoints[len - 2].x) / 2;
        const lastY = this.movedPoints.length === 3
            ? this.movedPoints[len - 3].y
            : (this.movedPoints[len - 3].y + this.movedPoints[len - 2].y) / 2;

        this.ctx.moveTo(lastX, lastY);
        this.ctx.quadraticCurveTo(
            this.movedPoints[len - 2].x,
            this.movedPoints[len - 2].y,
            endx,
            endy
        )
        this.ctx.stroke();
    }

    private putImageData(imageData: ImageData | undefined | null) {
        if (!imageData) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.putImageData(imageData, 0, 0);
    }

    public get events() {
        return {
            click: (cb: ((coordinate: [number, number]) => void)) => {
                this.onCanvasClickHandler.push(cb);
            }
        }
    }

    public next() {
        this.putImageData(this.stack.next());
    }

    public prev() {
        this.putImageData(this.stack.prev());
    }

    public setBrushColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    public toImageBlob(): Promise<Blob> {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;
        
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.canvas, 0, 0);

        return new Promise((resolve, reject) => {

            addWatermark(canvas, true).toBlob((blob) => {
                if (!blob) {
                    reject();
                    return;
                }
                resolve(blob);
            }, 'image/png');
    
        })
    }

    public setBrushSize(size: number) {
        this.ctx.lineWidth = size;
    }

    public push(shape: Shape) {
        this.shapes.push(shape);
        shape.draw(this.ctx);
        this.offset.set(shape, { x: this.translateX, y: this.translateY });
        if (shape?.select) {
            shape?.select(this.ctx);
        }
    }

}