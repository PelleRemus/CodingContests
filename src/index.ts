import { Level, RunTypes } from "../lib/caroshark";
import { fight, tournamentAfterTwoRounds } from "./utils";

const runType = (process.argv[2] as RunTypes) || "example";

const level = new Level({ level: 3 });

level.main = async (data: Array<any>, subLevel: number) => {
  const [n, m] = (data[0] as string).split(" ").map((x) => +x);
  let result = [];
  for (let i = 1; i <= n; i++) {
    let [rock, paper, scissors] = data[i].split(' ').map((x: string) => {
        return {
            type: x.slice(-1),
            amount: +x.slice(0, -1)
        }
    });
    let tournament = "";
    while(rock.amount > 0) {
        if(paper.amount == 1) {
            tournament += "RP";
            rock.amount--;
            paper.amount--;
            if(rock.amount) {
                const rockAmount = Math.min(rock.amount, 3)
                tournament += "R".repeat(rockAmount);
                rock.amount -= rockAmount;
            }
        } else {
            const rockAmount = Math.min(rock.amount, 3)
            tournament += "R".repeat(rockAmount);
            tournament += "P";
            rock.amount -= rockAmount;
            paper.amount--;
        }
    }
    if(paper.amount < 0)
        console.log(paper.amount)
    tournament += "P".repeat(paper.amount);
    tournament += "S".repeat(scissors.amount);
    
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
