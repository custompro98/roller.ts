import { DiceNotation } from "./types";
import { Modifier, StraightValue } from "../modifiers";
import { Summable } from "../summable";
import Die, * as dice from "../dice";
import { AceOperator, Dice } from "../dice";

/*
 * This will match the pattern START, 0 or more numbers, the letter d, and 0 or more numbers, END
 * i.e. example matches include
 * d6 2d6 d4 10d4 1000d20 1d12
 * */
const DICE_SHORTHAND_REGEX = new RegExp(
  "^(\\d*)(d\\d+)(![<|>]?\\d*)?(d(h|l)\\d+)?$"
);

const parse = (input: string): Summable[] => {
  return input
    .split("+")
    .map((s) => s.trim())
    .filter((s) => isStraightValue(s) || isDiceNotation(s))
    .map((s) => parseSummable(s));
};

const isStraightValue = (s: string): boolean => {
  const parsedNumber = toNumber(s);

  return !Number.isNaN(parsedNumber) && s === parsedNumber.toString();
};

const isDiceNotation = (s: string): boolean => DICE_SHORTHAND_REGEX.test(s);

const parseSummable = (s: string): Summable => {
  if (isDiceNotation(s)) {
    const diceDescriptor = splitDiceNotation(s);
    if (isValidDie(diceDescriptor)) {
      return parseDice(diceDescriptor);
    }
  } else if (isStraightValue(s)) {
    return parseModifier(toNumber(s));
  }

  return parseModifier(0);
};

const splitDiceNotation = (s: string): DiceNotation => {
  const [input, nDice, dieFaces, ace, toDrop] = DICE_SHORTHAND_REGEX.exec(
    s
  ) as string[];

  let dropHighest = 0;
  let dropLowest = 0;

  if (toDrop && toDrop[1] === "h") {
    dropHighest = toNumber(toDrop.slice(2, toDrop.length));
  } else if (toDrop && toDrop[1] === "l") {
    dropLowest = toNumber(toDrop.slice(2, toDrop.length));
  }

  const spn = {
    input,
    nDice: toNumber(nDice) || 1,
    dieFaces: dieFaces,
    ace: parseAce(ace, dieFaces),
    dropHighest,
    dropLowest,
  } as DiceNotation;

  return spn;
};

const parseAce = (s: string, dieFaces: string): dice.AceConfig => {
  const acesOn = { target: 0, operator: AceOperator.eq };

  if (s) {
    if (s.length === 1) {
      acesOn.target = toNumber(dieFaces.slice(1, dieFaces.length));
    } else {
      if (s.includes(">")) {
        acesOn.target = toNumber(s.slice(s.indexOf(">") + 1, s.length));
        acesOn.operator = AceOperator.ge;
      } else if (s.includes("<")) {
        acesOn.target = toNumber(s.slice(s.indexOf("<") + 1, s.length));
        acesOn.operator = AceOperator.le;
      } else {
        acesOn.target = toNumber(s.slice(1, s.length));
      }
    }
  }

  return acesOn;
};

const isValidDie = (dn: DiceNotation): boolean => {
  return dice.isValidDieIndex(dn.dieFaces);
};

const parseDice = (dn: DiceNotation): Die => {
  const idx: Dice = dn.dieFaces as Dice;
  const roller: dice.RollFunction = dice[idx];

  return new Die(roller, dn.nDice, {
    ace: dn.ace,
    dh: dn.dropHighest,
    dl: dn.dropLowest,
  });
};

const parseModifier = (n: number): Modifier => new StraightValue(n);

const toNumber = (s: string): number => parseInt(s, 10);

export { parse };
