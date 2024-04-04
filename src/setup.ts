import { Caroshark, Parser, RunTypes } from "../lib/caroshark";

export const runType = process.argv[2] as RunTypes || "example";


const inFilesMap = (str: string) => {
    const s = str.split("\n").map((x) => x.trim());
    return Parser.create(s)
        // .number("n")
        // .matrix("m", 'n', '')
        // .numbers('x y')
        // .number("steps")
        // .array("myPath")
        // .number("ghostCount")
        // .arrayOfObject('ghosts', 'ghostCount', p =>
        //     p
        //         .numbers("x y")
        //         .number("stepCount")
        //         .array("path")
        // )
        .build();
}
export type LevelData = ReturnType<typeof inFilesMap>

export const caroshark = new Caroshark({ inFilesMap, level: 3, dryRun: false });
