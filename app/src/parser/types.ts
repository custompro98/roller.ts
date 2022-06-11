import { Dice } from "../dice";
import { AceConfig } from "../dice";

export type DiceNotation = {
  input: string;
  nDice: number;
  dieFaces: Dice;
  ace: AceConfig;
  dropHighest: number;
  dropLowest: number;
};
