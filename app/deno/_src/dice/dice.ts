import type { Summable } from "../summable/index.ts";

import type { AceConfig, DieConfig, RollFunction } from "./types.ts";
import { AceOperator } from "./types.ts"
import { roller } from "./roller.ts";

const dice = {
  d2: roller(2),
  d4: roller(4),
  d6: roller(6),
  d8: roller(8),
  d10: roller(10),
  d12: roller(12),
  d20: roller(20),
  d100: roller(100),
};

export const { d2, d4, d6, d8, d10, d12, d20, d100 } = dice;

export const isValidDieIndex = (s: string): boolean =>
  Object.keys(dice).includes(s);

export default class Die implements Summable {
  private DEFAULT_DROPPED = 0;

  private _roll: RollFunction;
  private _nDice: number;
  private _dropHighest: number;
  private _dropLowest: number;
  private _explodesOn: AceConfig;

  private _results: number[];

  constructor(
    roller: RollFunction,
    nDice: number = 1,
    { dh, dl, ace }: DieConfig = {
      dh: 0,
      dl: 0,
      ace: { target: 0, operator: AceOperator.eq },
    }
  ) {
    this._roll = roller;
    this._nDice = nDice;
    this._dropHighest = dh || this.DEFAULT_DROPPED;
    this._dropLowest = dl || this.DEFAULT_DROPPED;
    this._explodesOn = ace || { target: 0, operator: AceOperator.eq };

    this._results = [];
    this.roll();
  }

  value(): number {
    let list = this._results;
    let numDropped = 0;

    if (this._dropLowest > 0) {
      numDropped = this._dropLowest;
      list = list.reverse().slice(0, this._nDice - numDropped);
    } else if (this._dropHighest > 0) {
      numDropped = this._dropHighest;
      list = list.slice(0, this._nDice - numDropped);
    }

    return list.reduce((acc, cur) => acc + cur, 0);
  }

  reroll(): void {
    this._results = [];
    this.roll();
  }

  private roll(): void {
    for (let i = 0; i < this._nDice; i++) {
      let val: number;
      do {
        val = this._roll();
        this._results.push(val);
      } while (this.didExplode(val));
    }

    this._results.sort();
  }

  private didExplode(n: number): boolean {
    switch (this._explodesOn.operator) {
      case AceOperator.eq: {
        return n === this._explodesOn.target;
      }
      case AceOperator.ge: {
        return n >= this._explodesOn.target;
      }
      case AceOperator.le: {
        return n <= this._explodesOn.target;
      }
      default: {
        return false;
      }
    }
  }
}
