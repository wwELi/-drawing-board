interface Options {
    hide: boolean
}


export default function addWatermark(canvas: HTMLCanvasElement, hide: boolean): HTMLCanvasElement {
    // const copyedCanvas = document.createElement('canvas').
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const textCanvas = document.createElement('canvas') as HTMLCanvasElement;
    const textCtx = textCanvas.getContext('2d') as CanvasRenderingContext2D;

    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;

    textCtx.font = "48px serif";
    textCtx.fillStyle = '#000000';
    textCtx.fillText('Test', 0, 50);

    if (!hide) {
        ctx.drawImage(textCanvas, 0, 0);
        return canvas;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const textImageData = textCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    for(let i = 0, len = imageData.length; i < len; i++) {
        if (i % 4 !== 0) {
            continue;
        }

        if (textImageData[i + 3] === 0) {
            if (imageData[i] % 2 === 0) {
                imageData[i] = imageData[i] + 1;
            }
        } else {
            if (imageData[i] % 2 === 1) {
                imageData[i] = imageData[i] - 1;
            }
        }
    }

    // console.log(imageData, textImageData);

    return canvas;
}

function showWatermark(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    for(let i =0, len = imageData.length; i < len; i++) {

        if (i % 4 === 0) {
            imageData[i] = imageData[i] % 2 === 0 ? 255 : 0;
        } else {
            imageData[i] = 0;
        }

    }
}