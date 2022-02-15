import { PNode, Children, Classes } from '../core/node';
import { ToolBar } from './toolbar';
import { BrushCanvas } from './brush';

export class Container extends PNode {

    @Children(ToolBar)
    toolBor!: ToolBar;

    @Children(BrushCanvas)
    brushCanvas!: BrushCanvas;

    @Classes()
    background = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
    };

    constructor(protected template: HTMLElement) {
        super();
        this.hostView = template;
    }

    public mounted() {
        this.toolBor.onBrushColorChange((color: string) => {
            this.brushCanvas.setBrushColor(color);
        })
    }
}