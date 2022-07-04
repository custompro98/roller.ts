import type { Summable } from "../summable";
import type { DieConfig, RollFunction } from "./types";
export declare const d2: RollFunction, d4: RollFunction, d6: RollFunction, d8: RollFunction, d10: RollFunction, d12: RollFunction, d20: RollFunction, d100: RollFunction;
export declare const isValidDieIndex: (s: string) => boolean;
export default class Die implements Summable {
    private DEFAULT_DROPPED;
    private _roll;
    private _nDice;
    private _dropHighest;
    private _dropLowest;
    private _explodesOn;
    private _results;
    constructor(roller: RollFunction, nDice?: number, { dh, dl, ace }?: DieConfig);
    value(): number;
    reroll(): void;
    private roll;
    private didExplode;
}
//# sourceMappingURL=dice.d.ts.map