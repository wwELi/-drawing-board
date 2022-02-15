import { Drop } from '../utils/drop';
import { useVariable } from '../render/use-variable';
import jss from 'jss';
import { setClassName } from '../utils';

function renderCanvasBackGround(el: HTMLCanvasElement) {
    const [border] = useVariable('1px');
    const [size] = useVariable('28px');
    const [color] = useVariable('#f5d7ee');

    function genLinearGradient(deg: number): string {
        return `linear-gradient(${deg}deg, transparent var(${size}), var(${color}) var(${size}))`
    }

    const { classes } = jss.createStyleSheet({
        main: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
        },
        background: {
            backgroundSize: `calc(var(${size}) + var(${border})) calc(var(${size}) + var(${border}))`,
            background: [genLinearGradient(180), genLinearGradient(90)].join(','),
        }
    }).attach();

    setClassName(el, [classes.main, classes.background]);
}

export class Brush {

    private ctx: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement
    ) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        renderCanvasBackGround(canvas);
        const drop = new Drop(canvas);

        this.ctx.lineWidth = 10;

        drop
        .start(([x, y]) => {
            this.ctx.beginPath();
            this.moveTo(x, y);
        })
        .move(([x, y]) => this.line(x, y))
        .up(() => this.ctx.closePath())
    }

    private moveTo(x: number, y: number) {
        this.ctx.moveTo(x, y);
    }

    private line(x: number, y: number) {
        this.ctx.lineCap = 'square';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    public setBrushColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    public toImage() {
        // const canvas = genBackgroundImage(this.canvas);

        // document.body.appendChild(canvas)

        // // console.log(backgroundSize);

        // this.canvas.toBlob(async (blob) => {
        //     if (!blob) {
        //         return;
        //     }
        //     const url = URL.createObjectURL(blob);
        //     // await downloadFile('drawing.png', url);
        //     URL.revokeObjectURL(url);
        // }, 'image/png');
    }

}