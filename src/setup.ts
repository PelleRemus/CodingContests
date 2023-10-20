import { Caroshark, Parser, RunTypes } from "../lib/caroshark";

export const runType = process.argv[2] as RunTypes || "example";

export type LevelData = { n: number } | any;

const inFilesMap = (str: string) => {
    const s = str.split("\n").map((x) => x.trim());
    return (new Parser(s))
        .number("n")
        .build() 
}

export const caroshark = new Caroshark({ inFilesMap });
