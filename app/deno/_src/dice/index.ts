import Die from "./dice.ts";

export type { AceConfig, DieConfig, RollFunction } from "./types.ts";
export { AceMap, AceOperator, Dice } from "./types.ts";
export {
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d10,
    d12,
    d14,
    d16,
    d20,
    d24,
    d30,
    d100,
    isValidDieIndex,
} from "./dice.ts";
export default Die;
