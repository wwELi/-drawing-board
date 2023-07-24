import { Drop } from 'drop-handler';
import { useVariable } from '../render/use-variable';
import { Stack } from './stack';
import addWatermark from '../utils/watermark';
import { List } from '../utils/list';
import { Shape } from './shape';
import { cloneDeep } from 'lodash';

export class Brush {

    private stack = new Stack<Shape[]>();
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = [];
    public isStroke = false;

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    getShapes(): Shape[] {
        return this.shapes;
    }

    getSelectShapes(x: number, y: number) {
        return this.shapes.filter(shape => shape.isInShape(x, y));
    }

    getContainerCanvas():HTMLCanvasElement {
        return this.canvas;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        this.clearCanvas();
        this.shapes.forEach((shape) => {
            this.ctx.save();
            shape.draw(this.ctx);
            this.ctx.restore();
        })
    }


    translate(x: number, y: number) {

        this.shapes.forEach(shape => {
            shape.x = shape.x + x;
            shape.y = shape.y + y;
        })
        this.ctx.save();
        this.redraw();
        this.ctx.restore();
    }

    private putImageData(imageData: ImageData | undefined | null) {
        if (!imageData) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.putImageData(imageData, 0, 0);
    }

    public next() {
        // this.putImageData(this.stack.next());
    }

    public prev() {
        // this.putImageData(this.stack.prev());
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
        if (shape?.select) {
            // shape?.select(this.ctx);
        }
    }

}


// class Line {
//     private initDropHandler() {
//         const drop = new Drop(this.canvas);
//         this.stack.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));

//         drop
//         .click(([x, y]) => {
//             this.onCanvasClickHandler.forEach(fn => fn([x, y]));
//         })
//         .start(([x, y]) => {
//             if(!this.isStroke) return;
//             this.ctx.beginPath();
//             this.movedPoints.push({ x, y });
//         })
//         .move(([x, y]) => {
//             if (!this.isStroke) {
//                 this.shapes
//                 .filter((shape) => shape?.isInShape ? shape.isInShape(x, y) : void 0)
//                 .forEach((shape) => {
//                     shape.clear(this.ctx);
//                     shape?.updateData ? shape.updateData({ x, y }) : void 0;
//                     shape.draw(this.ctx);
//                 })
//                 // this.shapes
//                 return;
//             }
//             // if(!this.isStroke) return;
//             this.movedPoints.push({ x, y });
//             this.line();
//         })
//         .up(() => {
//             if(!this.isStroke) return;
//             this.ctx.closePath();
//             this.movedPoints.clear();
//             this.stack.push(this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height));
//         })
//     }

//     // 消除线条出现锯齿问题
//     private clearAliasing() {
//         const canvas = this.canvas;
//         const width = canvas.width;
//         const height = canvas.height;

//         canvas.style.width = `${width}px`;
//         canvas.style.height = `${height}px`;
//         canvas.width = width * devicePixelRatio;
//         canvas.height = height * devicePixelRatio;
//         this.ctx.lineJoin = 'round';
//         this.ctx.lineCap = 'round';
//         this.ctx.lineWidth = 10;
//         this.ctx.scale(devicePixelRatio, devicePixelRatio);
//     }

//     private line() {
//         if(this.movedPoints.length < 3) {
//             return;
//         }
//         const len = this.movedPoints.length;
//         const endx = (this.movedPoints[len - 1].x + this.movedPoints[len - 2].x) / 2;
//         const endy = (this.movedPoints[len - 1].y + this.movedPoints[len - 2].y) / 2;
//         const lastX = this.movedPoints.length === 3
//             ? this.movedPoints[len - 3].x
//             : (this.movedPoints[len - 3].x + this.movedPoints[len - 2].x) / 2;
//         const lastY = this.movedPoints.length === 3
//             ? this.movedPoints[len - 3].y
//             : (this.movedPoints[len - 3].y + this.movedPoints[len - 2].y) / 2;

//         this.ctx.moveTo(lastX, lastY);
//         this.ctx.quadraticCurveTo(
//             this.movedPoints[len - 2].x,
//             this.movedPoints[len - 2].y,
//             endx,
//             endy
//         )
//         this.ctx.stroke();
//     }
// }