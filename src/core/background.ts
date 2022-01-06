export function genBackgroundImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const { backgroundImage, backgroundSize } = window.getComputedStyle(canvas);
    // const unitSize = Number(backgroundSize.match(/(\d+)px/)[1]);
    const unitSize = 29;
    const { width, height } = canvas;

    // linear-gradient(rgba(0, 0, 0, 0) 28px, rgb(245, 215, 238) 28px), linear-gradient(90deg, rgba(0, 0, 0, 0) 28px, rgb(245, 215, 238) 28px)

    const bacCtx = genCanvas2DContext(width, height);
    const hCtx = genCanvas2DContext(width, unitSize);
    const vCtx = genCanvas2DContext(unitSize, height);

    const hGradient = hCtx.createLinearGradient(0, 0, 0, hCtx.canvas.height);
    hGradient.addColorStop(28 / 29, 'rgba(0, 0, 0, 0)');
    hGradient.addColorStop(28 / 29, 'rgb(245, 215, 238)');

    hCtx.fillStyle = hGradient;
    hCtx.fillRect(0, 0, hCtx.canvas.width, hCtx.canvas.height);

    const hPattern = bacCtx.createPattern(hCtx.canvas, 'repeat') as CanvasPattern;
    bacCtx.fillStyle = hPattern;
    bacCtx.fillRect(0, 0, bacCtx.canvas.width, bacCtx.canvas.height);

    return bacCtx.canvas;
}

function createReapt(bacCtx: CanvasRenderingContext2D, width: number, height: number) {

    const ctx = genCanvas2DContext(width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);

}

function genCanvas2DContext(width: number, height: number): CanvasRenderingContext2D {

    const canvas = document.createElement('canvas');
    const scale = window.devicePixelRatio || 1;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.scale(scale, 1);

    return ctx;
}