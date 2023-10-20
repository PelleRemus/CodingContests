import { Caroshark, Parser, RunTypes } from "../lib/caroshark";

export const runType = process.argv[2] as RunTypes || "example";

export type LevelData = {
    n: number,
    m: number,
    matrix: Array<Array<number>>,
    coordonates: Array<Array<{ x: number, y: number }>>
};

const inFilesMap = (str: string) => {
    const s = str.split("\n").map((x) => x.trim());
    return (new Parser(s))
        .number("m")
        .matrix("matrix", "m", '', (x: string) => x === "W" ? 0 : 1)
        .number('n')
        .lines('coordonates', 'n', (line) => line.split(' ').map(x => {
            let arr = x.split(',')
            return { x: parseFloat(arr[0]), y: parseFloat(arr[1]) }
        }))
        .build()
}

export const caroshark = new Caroshark({ inFilesMap });
