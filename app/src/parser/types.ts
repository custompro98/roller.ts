import { Dice } from '../dice'

export type DiceNotation = {
  input: string
  nDice: number
  dieFaces: Dice
  dropHighest: number
  dropLowest: number
}
