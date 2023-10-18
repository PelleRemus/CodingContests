import { Level, RunTypes } from "../lib/caroshark";

const runType = (process.argv[2] as RunTypes) || "example";

const level = new Level({ level: 2 });

const winnings = {
  P: "R",
  R: "S",
  S: "P",
};

const fight = (left: "P" | "R" | "S", right: string) => {
  return left == right ? left : winnings[left] == right ? left : right;
};

level.main = async (data: Array<any>, subLevel: number) => {
    console.log(data[0]);
  const [n, m] = (data[0] as string).split(" ").map(x => +x);
  let result = [];
  for (let i = 1; i <= n; i++) {
    let tournament = data[i];

    while (tournament.length > 2) {
      let nextBracket = "";
      for (let j = 0; j < tournament.length; j+=2) {
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
