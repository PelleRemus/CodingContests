import { Level, RunTypes } from "../lib/caroshark";
import { tournamentAfterTwoRounds, tournamentFinal } from "./utils";

const runType = (process.argv[2] as RunTypes) || "example";

const level = new Level({ level: 4 });

level.main = async (data: Array<any>, subLevel: number) => {
  const [n, m] = (data[0] as string).split(" ").map((x) => +x);
  let result = [];
  for (let i = 1; i <= n; i++) {
    let index = 0;
    let tournament = "";
    do {
        let [rock, paper, scissors] = data[i].split(' ').map((x: string) => {
            return {
                type: x.slice(-1),
                amount: +x.slice(0, -1)
            }
        });

        let k = Math.floor(rock.amount / paper.amount) + 1;
        tournament = "";

        while(rock.amount > 0) {
            if(paper.amount == 1) {
                tournament += "R".repeat(index);
                tournament += "P";
                paper.amount--;

                tournament += "R".repeat(rock.amount - index);
                rock.amount = 0;
            } else {
                const rockAmount = Math.min(rock.amount, k)
                tournament += "R".repeat(rockAmount);
                rock.amount -= rockAmount;

                tournament += "P";
                paper.amount--;
            }
        }

        if(paper.amount < 0)
            console.log(paper.amount)
        index++;

        tournament += "P".repeat(paper.amount);
        tournament += "S".repeat(scissors.amount);
    } while(!tournamentFinal(tournament).includes('S'));

    result.push(tournament);
  }
  return result.join('\n');
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
