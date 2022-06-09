export type RollFunction = () => number;

export enum Dice {
  d2 = "d2",
  d4 = "d4",
  d6 = "d6",
  d8 = "d8",
  d10 = "d10",
  d12 = "d12",
  d20 = "d20",
  d100 = "d100",
}

export type DieConfig = {
  dh?: number;
  dl?: number;
  ace?: AceConfig;
};

export type AceConfig = {
  target: number;
  operator: AceOperator;
};

export enum AceOperator {
  eq = "=",
  ge = ">",
  le = "<",
}
