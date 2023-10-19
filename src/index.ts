import { Caroshark, Parser, RunTypes } from "../lib/caroshark";

const runType = process.argv[2] as RunTypes || "example";

const caroshark = new Caroshark({ level: 1 });

Caroshark.inFilesMap = (str: string) => {
    const s = str.split("\n").map((x) => x.trim());
    return (new Parser(s))
        .number("n")
        .build();
}

caroshark.main = async (data: any, subLevel: number) => {
    
    // code here

    return data;
};

caroshark.generateOutput({
    consoleOnly: runType !== RunTypes.SOLUTION,
    exampleOnly: runType === RunTypes.EXAMPLE,

    ...((runType === RunTypes.SOLUTION) ? {} :
        {
            // subLevel: 1,
            // subLevelFrom: 2,
            // subLevelTo: 3,
        })
});
