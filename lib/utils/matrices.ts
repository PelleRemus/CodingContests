export function cloneMatrix(m: Array<Array<any>> | number, fillFunc: () => any) {
    if (typeof m === "number") {
        return new Array(m).fill(0).map(x => new Array(m).fill(fillFunc()))
    }
}