let offset0 = 0x30;
let offset1 = 0x7a;
let offset2 = 0x41;
let offset3 = 0x61;

function getRandomNumber(): number[] {
    if(offset0 <= 0x39) {
        offset0++;
    } else if (offset1 > 0x61){
        offset1--;
    } else if (offset2 < 0x5a) {
        offset2++;
    } else if (offset3 < 0x7a) {
        offset3++;
    }

    return [offset0, offset1, offset2, offset3];
}

export function randomChars(): string {
    return String.fromCharCode.call(null, ...getRandomNumber());
}