import { PNode, Classes, Children, Click } from '../core/node';

abstract class Size extends PNode {
    abstract size: number;
    abstract iconSize: number;
    protected template = 'span';

    cb!: Function;

    @Classes()
    css = {
        display: 'inline-block',
        position: 'relative',
        background: '#FFF',
        'border-radius': '50%',
        'margin-left': 20,
        border: '1px solid #f5d7ee',
        '&:after': {
            content: '""',
            display: 'inline-block',
            top: 2,
            bottom: 2,
            left: 2,
            right: 2,
            position: 'absolute',
            'border-radius': '50%',
            background: '#555'
        },
        height: () => this.iconSize,
        width: () => this.iconSize
    }

    @Click()
    public onSizeChange() {
        this.cb(this.size);
    }
}

class Big extends Size {
    size = 20;
    iconSize = 28;
}

class Medium extends Size {
    size = 10;
    iconSize = 20;
}

class Small extends Size {
    size = 5;
    iconSize = 16;
}

export class BrushSize extends PNode {
    protected template = 'div';

    @Children(Big)
    big!: Big;

    @Children(Medium)
    medium!: Medium;

    @Children(Small)
    small!: Small;

    @Classes()
    css = {
        position: 'fixed',
        right: 80,
        top: 20,
        display: 'flex',
        'align-items': 'center'
    }

    private handlers: Function[] = [];

    onSizeChange(cb: Function) {
        this.handlers.push(cb);
    }

    mounted() {
        [this.big, this.medium, this.small].forEach((ins) => {
            ins.cb = (size: number) => {
                this.handlers.forEach((cb) => cb(size))
            }
        })
    }
}