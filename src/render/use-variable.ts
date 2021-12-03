import { randomChars } from '../utils/ random-char';

type Hooks = [string, (val: string) => void];

/**
 * 
 * @param initValue css3 variable init value
 * @param el set css3 variable set element
 * @returns [css varibale name, update function]
 */
export function useVariable(initValue?: string, el: HTMLElement = document.documentElement): Hooks {
    const random = randomChars();
    const variableName = `--${random}`;
    
    el.style.setProperty(variableName, initValue || '');

    return [variableName, function(val: string) {
        el.style.setProperty(variableName, val);
    }];
}
