import { Dice } from "../dice";

export type DiceNotation = {
  input: string;
  nDice: number;
  dieFaces: Dice;
  ace: number;
  dropHighest: number;
  dropLowest: number;
};
