import { Modifier, StraightValue } from "../modifiers";
import { Summable } from "../summable";
import Die, * as dice from "../dice";

/*
 * This will match the pattern START, 0 or more numbers, the letter d, and 0 or more numbers, END
 * i.e. example matches include
 * d6 2d6 d4 10d4 1000d20 1d12
 * */
const DICE_SHORTHAND_REGEX = new RegExp("^\\d*d\\d+$");

const parse = (input: string): Summable[] => {
  const summables: Summable[] = [];

  const diceInputs: string[] = [];
  const modifierInputs: number[] = [];

  input
    .split("+")
    .map((s) => s.trim())
    .map((s) => partition(s, diceInputs, modifierInputs));

  diceInputs
    .filter(isDiceNotation)
    .map(splitDiceNotation)
    .filter(isValidDie)
    .map(parseDice)
    .flat()
    .forEach((d) => summables.push(d));

  modifierInputs
    .map(parseModifier)
    .forEach((sv) => summables.push(sv));

  return summables;
};

const partition = (s: string, dice: string[], modifiers: number[]): void => {
  const parsedNumber = parseInt(s, 10);

  if (Number.isNaN(parsedNumber) || s !== parsedNumber.toString()) {
    dice.push(s);
  } else {
    modifiers.push(parsedNumber);
  }
}

const isDiceNotation = (s: string): boolean => (DICE_SHORTHAND_REGEX.test(s))

const splitDiceNotation = (s: string): [number, string] => {
  const split = s.split("d");
  const tuple: [number, string] = [parseInt(split[0]) || 1, `d${split[1]}`];

  return tuple;
}

const isValidDie = ([_, s]: [number, string]): boolean => (dice.isValidDieIndex(s))

const parseDice = ([n, s]: [number, string]): Die[] => {
  const collected: Die[] = [];
  const idx: dice.Dice = s as dice.Dice;
  const roller: dice.RollFunction = dice[idx];

  for (let i = 0; i < n; i++) {
    collected.push(new Die(roller));
  }

  return collected;
}

const parseModifier = (n: number): Modifier => (new StraightValue(n))

export { parse };
