import { DiceNotation } from "./types.ts";
import { Modifier, StraightValue } from "../modifiers/index.ts";
import type { Summable } from "../summable/index.ts";
import Die, * as dice from "../dice/index.ts";
import { AceOperator, Dice } from "../dice/index.ts";

// Matches a digit - i.e. the `n` in nd6
const COUNT_REGEX_STR = "(\\d*)";
// Matches a die face descriptor - d2, ..., d20, d100
const FACE_REGEX_STR = "(d\\d+)";
// Matches an ace descriptor - !, !>5, !<4, etc.
const ACE_REGEX_STR = "(!(<|>)?(\\d*))";
// Matches a drop highest/lowest descriptor - dh1, dl2, etc.
const DROP_REGEX_STR = "(d(h|l)\\d+)";

const DICE_SHORTHAND_REGEX = new RegExp(
  `^${COUNT_REGEX_STR}${FACE_REGEX_STR}${ACE_REGEX_STR}?${DROP_REGEX_STR}?$`
);
const ACE_REGEX = new RegExp(ACE_REGEX_STR);

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
  // commas skip the ace-specific captures (maybe these can be rolled out)
  const [input, nDice, dieFaces, ace, , , toDrop] = DICE_SHORTHAND_REGEX.exec(
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
    // commas skip the outer captures
    const [, , operator, target] = ACE_REGEX.exec(s) as string[];

    if (!operator && !target) {
      acesOn.target = toNumber(dieFaces.slice(1, dieFaces.length));
    } else if (!operator && target) {
      acesOn.target = toNumber(target);
    } else {
      acesOn.target = toNumber(target);
      acesOn.operator = dice.AceMap[operator];
    }

    /* const length = s.length;

    if (length === 1) {
      acesOn.target = toNumber(dieFaces.slice(1, dieFaces.length));
    } else {
      if (s.includes(">")) {
        acesOn.target = toNumber(s.slice(s.indexOf(">") + 1, length));
        acesOn.operator = AceOperator.ge;
      } else if (s.includes("<")) {
        acesOn.target = toNumber(s.slice(s.indexOf("<") + 1, length));
        acesOn.operator = AceOperator.le;
      } else {
        acesOn.target = toNumber(s.slice(1, length));
      }
    } */
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
