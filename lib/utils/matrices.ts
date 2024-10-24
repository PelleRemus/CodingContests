export function cloneMatrix(m: Array<Array<any>> | number, fillFunc: () => any) {
    if (typeof m === "number") {
        return new Array(m).fill(0).map(x => new Array(m).fill(fillFunc()))
    } else {
        return JSON.parse(JSON.stringify(m));
    }
}

export function areIndexesSafe(this: any[][], row: number, col: number) {
    const rows = this.length;
    const cols = this[0].length;
    return row >= 0 && row < rows && col >= 0 && col < cols;
}
