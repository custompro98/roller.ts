import Die from "./dice";

export type { AceConfig, DieConfig, RollFunction } from "./types";
export { AceMap, AceOperator, Dice } from "./types";
export {
    d2,
    d3,
    d4,
    d5,
    d6,
    d8,
    d10,
    d12,
    d16,
    d20,
    d24,
    d30,
    d100,
    isValidDieIndex,
} from "./dice";
export default Die;
