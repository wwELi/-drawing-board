
const SelectPointWidth = 8;

export function drawSelectRect(points: { x: number, y: number }[], ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#333';
    
    points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.rect(x - SelectPointWidth / 2, y - SelectPointWidth / 2, SelectPointWidth, SelectPointWidth);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    })
    ctx.restore();
}