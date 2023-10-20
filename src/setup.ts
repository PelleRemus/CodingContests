import { Caroshark, Parser, RunTypes } from "../lib/caroshark";

export const runType = process.argv[2] as RunTypes || "example";

export type LevelData = { n: number } | any;

const inFilesMap = (str: string) => {
    const s = str.split("\n").map((x) => x.trim());
    return (new Parser(s))
        .number("m")
        .matrix("matrix", "m")
        .number('n')
        .lines('coordonates', 'n', (line) => line.split(' ').map(x => {
            let arr = x.split(',')
            return { x: parseFloat(arr[0]), y: parseFloat(arr[1]) }
        }))
        .build()
}

export const caroshark = new Caroshark({ inFilesMap });
