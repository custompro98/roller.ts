import { Summable } from '../summable'
import { RollFunction } from './types'
import { roller } from './roller'

const dice = {
  d2: roller(2),
  d4: roller(4),
  d6: roller(6),
  d8: roller(8),
  d10: roller(10),
  d12: roller(12),
  d20: roller(20),
  d100: roller(100),
}

export const { d2, d4, d6, d8, d10, d12, d20, d100 } = dice

export default class Die implements Summable {
  private roller: RollFunction
  private result: number

  constructor(roller: RollFunction) {
    this.roller = roller
    this.result = this.reroll()
  }

  value(): number {
    return this.result
  }

  reroll(): number {
    this.result = this.roller()

    return this.result
  }
}
