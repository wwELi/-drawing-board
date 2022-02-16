import { PNode, Classes, Click } from '../core/node';

export class DownloadFile extends PNode {
    protected template = '<span>D</span>';

    downloadHandler: Function[] = [];

    @Classes()
    css = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        cursor: 'pointer',
        color: 'rgba(0, 0,0, 0.6)',
        width: '24px',
        height: '24px',
        border: '2px solid rgba(0, 0,0, 0.6)',
        'border-radius': '50%',
        'text-align': 'center',
    }

    @Click()
    onclick() {
        this.downloadHandler.forEach(cb => cb())
    }

    public onDownloadClick(cb: Function) {
        this.downloadHandler.push(cb);
    }
}