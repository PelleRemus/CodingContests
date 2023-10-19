export const winnings = {
  P: "R",
  R: "S",
  S: "P",
};

export const fight = (left: "P" | "R" | "S", right: string) => {
  return left == right ? left : winnings[left] == right ? left : right;
};

export const tournamentAfterTwoRounds = (tournament: string): string => {
    for (let k=0; k<2; k++) {
      tournament = nextBracket(tournament);
    }
    return tournament;
}

export const tournamentFinal = (tournament: string): string => {
  while (tournament.length > 2) {
    tournament = nextBracket(tournament);
  }
  return tournament;
}

const nextBracket = (tournament: string): string => {
  let nextBracket = "";
  for (let j = 0; j < tournament.length; j += 2) {
    let left = tournament[j];
    let right = tournament[j + 1];
    nextBracket += fight(left as any, right);
  }
  return nextBracket;
}

// export class Tournament {
//     m: number;
// }