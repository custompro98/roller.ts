import { Dice } from "../dice/index.ts";
import { AceConfig } from "../dice/index.ts";

export type DiceNotation = {
  input: string;
  nDice: number;
  dieFaces: Dice;
  ace: AceConfig;
  dropHighest: number;
  dropLowest: number;
};
