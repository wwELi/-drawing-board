import { PNode, Children, Classes } from '../core/node';
import { ToolBar } from './toolbar';
import { BrushCanvas } from './brush';
import { DownloadFile } from './download';
import { BrushSize } from './size';

export class Container extends PNode {

    @Children(ToolBar)
    toolBor!: ToolBar;

    @Children(BrushCanvas)
    brushCanvas!: BrushCanvas;

    @Children(DownloadFile)
    downloadFile!: DownloadFile;


    @Children(BrushSize)
    brushSize!: BrushSize;

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
            // this.brushCanvas
            this.brushCanvas.brush.prev();
        });

        this.downloadFile.onDownloadClick(() => {
            this.brushCanvas.downloadImage();
        });

        this.brushSize.onSizeChange((size: number) => {
            this.brushCanvas.setBrushSize(size);
        })
    }
}