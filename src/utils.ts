export const winnings = {
  P: "R",
  R: "S",
  S: "P",
};

export const fight = (left: "P" | "R" | "S", right: string) => {
  return left == right ? left : winnings[left] == right ? left : right;
};

// export class Tournament {
//     m: number;
// }