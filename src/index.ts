import { Level, RunTypes } from "../lib/caroshark";
import { winnings, fight } from "./utils";

const runType = (process.argv[2] as RunTypes) || "example";

const level = new Level({ level: 2 });

level.main = async (data: Array<any>, subLevel: number) => {
  const [n, m] = (data[0] as string).split(" ").map((x) => +x);
  let result = [];
  for (let i = 1; i <= n; i++) {
    let tournament = data[i];

    for (let k=0; k<2; k++) {
      let nextBracket = "";
      for (let j = 0; j < tournament.length; j += 2) {
        let left: "P" | "R" | "S" = tournament[j];
        let right = tournament[j + 1];
        nextBracket += fight(left, right);
      }
      tournament = nextBracket;
    }

    result.push(tournament);
  }
  return result.join("\n");
};

level.generateOutput({
  consoleOnly: runType !== RunTypes.SOLUTION,
  exampleOnly: runType === RunTypes.EXAMPLE,

  ...(runType === RunTypes.SOLUTION
    ? {}
    : {
        // subLevel: 1,
        // subLevelFrom: 2,
        // subLevelTo: 3,
      }),
});
