import Die from "./dice";

export { parse } from "./parser";

export type { Summable } from "./summable";

export type { Modifier } from "./modifiers";
export { StraightValue } from "./modifiers";

export { Die };
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
} from "./dice";
export type { AceConfig, DieConfig, RollFunction } from "./dice";
