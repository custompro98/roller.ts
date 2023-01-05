import Die from "./_src/dice/index.ts";

export { parse } from "./_src/parser/index.ts";

export type { Summable } from "./_src/summable/index.ts";

export type { Modifier } from "./_src/modifiers/index.ts";
export { StraightValue } from "./_src/modifiers/index.ts";

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
} from "./_src/dice/index.ts";
export type { AceConfig, DieConfig, RollFunction } from "./_src/dice/index.ts";
