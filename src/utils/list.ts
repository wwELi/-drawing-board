export class List<T> extends Array<T> {
    private list: T[] = [];

    constructor(
        private size: number
    ) {
        super();
        const list = this.list;
        
        return new Proxy(this, {
            get(target, p: string) {
                if(['list', 'size', 'push', 'clear'].includes(p)) {
                    return Reflect.get(target, p);
                }
                return typeof Reflect.get(target, p) === 'function'
                    ? Reflect.get(target, p).bind(list)
                    : list[p];
            }
        });
    }

    push(data: T) {
        this.list.push(data);
        if (this.list.length > this.size) {
            this.list.splice(0, this.list.length - this.size);
        }
        return this.list.length;
    }

    clear() {
        return this.list.splice(0, this.list.length);
    }

    [Symbol.iterator]() {
        return this.list[Symbol.iterator].apply(this.list);
    }

}