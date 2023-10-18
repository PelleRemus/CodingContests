import { Level, RunTypes } from "../lib/caroshark";

const runType = process.argv[2] as RunTypes || "example";

const level = new Level({ level: 1 });

level.main = async (data: Array<any>, subLevel: number) => {
    console.log("level ", subLevel)
    return data[0];
};

level.generateOutput({
    consoleOnly: runType !== RunTypes.SOLUTION,
    exampleOnly: runType === RunTypes.EXAMPLE,

    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
            // subLevelFrom: 2,
            // subLevelTo: 3,
        })
});
