import jss from 'jss'
import { setClassName, isFunction, removeClassName } from '../utils/index';


type NodeConstr = new () => PNode;

const childKey = Symbol('childKey');
const classesKey = Symbol('classesKey');
const eleTargetReg = /^<[^]+>$/; 

export abstract class PNode {

    protected abstract template: string | HTMLElement;
    protected _children: PNode[]= [];
    protected classes = [];
    public hostView!: HTMLElement;
    protected _parent!: PNode;

    protected mounted () {
        // console.log(this.hostView);
    }

    private getHostView() {
        return this.hostView;
    }

    public render() {
        let hostEl: HTMLElement = document.createElement('div');
        if (this.template instanceof HTMLElement) {
            hostEl = this.template;
        }

        if (typeof this.template === 'string') {

            if (eleTargetReg.test(this.template)) {
                const documentEl = new DOMParser().parseFromString(this.template, 'text/html');
                hostEl = this.hostView = ((documentEl.firstElementChild as Element).querySelector('body') as HTMLBodyElement).firstElementChild as HTMLElement;
            } else {
                this.hostView = hostEl = document.createElement(this.template);
            }
        }

        this.attchClasses();
        this.renderChild();
        this.bindHostEvent();
        return hostEl;
    }

    private bindHostEvent() {
        if (!Array.isArray(this[clickKey])) {
            return;
        }

        this[clickKey].forEach(methodName => {
            
            this.hostView.addEventListener('click', this[methodName].bind(this));
        });

        // if (isFunction(this.click)) {
        //     this.hostView.addEventListener('click', (this.click as Function).bind(this))
        // }
    }

    private renderChild() {
        const hostEl = this.hostView as HTMLElement;
        const children: { key: string, comp: NodeConstr }[] = this[childKey] || [];
        children.forEach(({ key, comp }) => {
            const child = this[key] = new comp();
            const childEl = child.render();

            this._children.push(child);
            child._parent = this;
            hostEl.appendChild(childEl);

            if (isFunction(child.mounted)) {
                child.mounted();
            }
        });
    }

    private attchClasses() {
        let sheet;
        const classList: string[] = this[classesKey] || [];
        const hostView = this.hostView as HTMLElement;

        if (classList.length === 0) {
            return;
        }

        const classesMap = classList.reduce((prev, key) => {
            this[key] = new Proxy(this[key], {
                set(target, p, val) {
                    // nedd add patch handler
                    jss.removeStyleSheet(sheet);
                    removeClassName(hostView, Object.values(sheet.classes));

                    Promise.resolve().then(() => {
                        sheet = jss.createStyleSheet(classesMap, { link: true }).attach();
                        setClassName(hostView, Object.values(sheet.classes));
                    })
                    return Reflect.set(target, p, val);
                }
            });
            return Object.assign(prev, { [key]: this[key] });
        }, {});

        sheet = jss.createStyleSheet(classesMap, { link: true }).attach();
        setClassName(hostView, Object.values(sheet.classes));
        sheet.update({});
    }
}

export function Classes(): Function {
    return function(target: any, propertyKey:string, descriptor:PropertyDescriptor) {
        push(target, classesKey, propertyKey)
    }
}

export function Children(Child: NodeConstr): Function {

    return function (target: any, propertyKey:string, descriptor:PropertyDescriptor) {
        push(target, childKey, { key: propertyKey, comp: Child })
    }
}

const clickKey = Symbol('click');
export function Click(): Function {
    return function(target: any, propertyKey:string, descriptor:PropertyDescriptor) {
        push(target, clickKey, propertyKey);
    }
}

function push(target, key, data) {
    if (Array.isArray(target[key])) {
        target[key].push(data);
    } else {
        target[key] = [data];
    }
}