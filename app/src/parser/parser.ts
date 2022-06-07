import { StraightValue } from "../modifiers";
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
  const straightValueInputs: number[] = [];

  input
    .split("+")
    .map((s) => s.trim())
    .map((s) => {
      const parsedNumber = parseInt(s, 10);

      if (Number.isNaN(parsedNumber) || s !== parsedNumber.toString()) {
        diceInputs.push(s);
      } else {
        straightValueInputs.push(parsedNumber);
      }
    });

  diceInputs
    .filter((s) => {
      const passes = DICE_SHORTHAND_REGEX.test(s);

      return passes;
    })
    .map((s) => {
      const split = s.split("d");
      const tuple: [number, string] = [parseInt(split[0]) || 1, `d${split[1]}`];

      return tuple;
    })
    .filter(([_, s]) => Object.keys(dice.Dice).includes(s))
    .map(([n, s]) => {
      const collected: Die[] = [];
      const idx: dice.Dice = s as dice.Dice;
      const roller: dice.RollFunction = dice[idx];

      for (let i = 0; i < n; i++) {
        collected.push(new Die(roller));
      }

      return collected;
    })
    .flat()
    .map((d) => summables.push(d));

  straightValueInputs
    .map((n) => new StraightValue(n))
    .forEach((sv) => summables.push(sv));

  return summables;
};

export { parse };
