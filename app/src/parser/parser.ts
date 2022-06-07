import { DiceNotation } from './types'
import { Modifier, StraightValue } from "../modifiers"
import { Summable } from "../summable"
import Die, * as dice from "../dice"

/*
 * This will match the pattern START, 0 or more numbers, the letter d, and 0 or more numbers, END
 * i.e. example matches include
 * d6 2d6 d4 10d4 1000d20 1d12
 * */
const DICE_SHORTHAND_REGEX = new RegExp("^(\\d*)(d\\d+)(d(h|l)\\d+)?$")

const parse = (input: string): Summable[] => {
  const summables: Summable[] = []

  const diceInputs: string[] = []
  const modifierInputs: number[] = []

  input
    .split("+")
    .map((s) => s.trim())
    .map((s) => partition(s, diceInputs, modifierInputs))

  diceInputs
    .filter(isDiceNotation)
    .map(splitDiceNotation)
    .filter(isValidDie)
    .map(parseDice)
    .flat()
    .forEach((d) => summables.push(d))

  modifierInputs
    .map(parseModifier)
    .forEach((sv) => summables.push(sv))

  return summables
}

const partition = (s: string, dice: string[], modifiers: number[]): void => {
  const parsedNumber = parseInt(s, 10)

  if (Number.isNaN(parsedNumber) || s !== parsedNumber.toString()) {
    dice.push(s)
  } else {
    modifiers.push(parsedNumber)
  }
}

const isDiceNotation = (s: string): boolean => (DICE_SHORTHAND_REGEX.test(s))

const splitDiceNotation = (s: string): DiceNotation => {
  const [input, nDice, dieFaces, toDrop] = DICE_SHORTHAND_REGEX.exec(s) as string[]
  let dropHighest = 0
  let dropLowest = 0

  if (toDrop && toDrop[1] === 'h') {
    dropHighest = parseInt(toDrop.slice(2, toDrop.length))
  } else if (toDrop && toDrop[1] === 'l') {
    dropLowest = parseInt(toDrop.slice(2, toDrop.length))
  }

  const spn = {
    input,
    nDice: parseInt(nDice) || 1,
    dieFaces: dieFaces,
    dropHighest,
    dropLowest,
  } as DiceNotation

  return spn
}

const isValidDie = (spn: DiceNotation): boolean => {
  /* const onlyDropHighest = (spn.dropHighest > 0 && spn.dropLowest === 0)
  const onlyDropLowest = (spn.dropLowest > 0 && spn.dropHighest === 0)
  const onlyOneDropChosen = onlyDropHighest || onlyDropLowest */


  return dice.isValidDieIndex(spn.dieFaces) // && onlyOneDropChosen
}

const parseDice = (spn: DiceNotation): Die => {
  const idx: dice.Dice = spn.dieFaces as dice.Dice
  const roller: dice.RollFunction = dice[idx]

  return new Die(roller, spn.nDice, { dh: spn.dropHighest, dl: spn.dropLowest })
}

const parseModifier = (n: number): Modifier => (new StraightValue(n))

export { parse }
