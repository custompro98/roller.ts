import Die from "./dice.ts";

export type { AceConfig, DieConfig, RollFunction } from "./types.ts";
export { AceMap, AceOperator, Dice } from "./types.ts"
export { d2, d4, d6, d8, d10, d12, d20, d100, isValidDieIndex } from "./dice.ts";
export default Die;
