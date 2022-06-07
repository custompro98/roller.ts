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

export const isValidDieIndex = (s: string): boolean => (Object.keys(dice).includes(s))

export default class Die implements Summable {
  private DEFAULT_DROPPED = 0

  private roll: RollFunction
  private nDice: number
  private dropHighest: number
  private dropLowest: number

  private results: number[]

  constructor(
    roller: RollFunction,
    nDice: number = 1,
    { dh, dl }: { dh?: number, dl?: number } = { dh: 0, dl: 0 }
  ) {
    this.roll = roller
    this.nDice = nDice
    this.dropHighest = dh || this.DEFAULT_DROPPED
    this.dropLowest = dl || this.DEFAULT_DROPPED

    this.results = []
    this.reroll()
  }

  value(): number {
    let list = this.results
    let numDropped = 0

    if (this.dropLowest > 0) {
      list = list.reverse()
      numDropped = this.dropLowest
    } else if (this.dropHighest > 0) {
      numDropped = this.dropHighest
    }

    return list
      .slice(0, this.nDice - numDropped)
      .reduce((acc, cur) => (acc + cur), 0)
  }

  reroll(): void {
    for (let i = 0; i < this.nDice; i++) {
      this.results.push(this.roll())
    }

    this.results.sort()
  }
}
