export type DiceFunction = () => number
export type DiceTable = {
  d2: DiceFunction,
  d4: DiceFunction,
  d6: DiceFunction,
  d8: DiceFunction,
  d10: DiceFunction,
  d12: DiceFunction,
  d20: DiceFunction,
  d100: DiceFunction,
}
