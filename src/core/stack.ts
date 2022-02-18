class Snapshot {
    // public data: any;
    constructor(public data: any){}
}

export class Stack<T> {

    pointer = 0;
    stackList: Snapshot[] = [];

    get isTop() {
        return this.stackList.length === this.pointer;
    }

    get isBottom() {
        return this.stackList.length === 0;
    }

    push(data: T) {
        this.stackList.push(new Snapshot(data));
        this.pointer = this.stackList.length;
    }

    next(): T | undefined {
        if (this.isTop) {
            return;
        }
        this.pointer++;
        return this.stackList[this.pointer].data;
    }

    prev(): T | undefined {
        if (this.isBottom) {
            return;
        }
        this.pointer--;
        return this.stackList[this.pointer].data;
    }
}