import { PNode, Classes, Children, Click } from '../core/node';
import brushSvg from '../assets/brush.svg';

export class BrushSize extends PNode {
    template = 'span';

    @Classes()
    size = {
        display: 'inline-block',
        ':nth-child(n)': {
            width: '40px',
            height: '40px'
        }
    }

    mounted() {
        this.hostView.innerHTML = brushSvg;
    }

    @Click()
    onclick() {
        console.log('--');
    }
}

export class ToolBar extends PNode {
    template = 'div';

    @Children(BrushSize)
    brushSize!: BrushSize

    @Classes()
    bacground = {
        height: '60px',
        position: 'fixed',
        bottom: '20px',
        width: '400px',
        background: 'rgb(222 218 218)',
        transform: 'translate(-50%)',
        left: '50%',
        'z-index': 100,
        'border-radius': '5px',
    }
}