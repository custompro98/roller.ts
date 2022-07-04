"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var modifiers_1 = require("../modifiers");
var dice_1 = __importStar(require("../dice")), dice = dice_1;
var dice_2 = require("../dice");
// Matches a digit - i.e. the `n` in nd6
var COUNT_REGEX_STR = "(\\d*)";
// Matches a die face descriptor - d2, ..., d20, d100
var FACE_REGEX_STR = "(d\\d+)";
// Matches an ace descriptor - !, !>5, !<4, etc.
var ACE_REGEX_STR = "(!(<|>)?(\\d*))";
// Matches a drop highest/lowest descriptor - dh1, dl2, etc.
var DROP_REGEX_STR = "(d(h|l)\\d+)";
var DICE_SHORTHAND_REGEX = new RegExp("^" + COUNT_REGEX_STR + FACE_REGEX_STR + ACE_REGEX_STR + "?" + DROP_REGEX_STR + "?$");
var ACE_REGEX = new RegExp(ACE_REGEX_STR);
var parse = function (input) {
    return input
        .split("+")
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return isStraightValue(s) || isDiceNotation(s); })
        .map(function (s) { return parseSummable(s); });
};
exports.parse = parse;
var isStraightValue = function (s) {
    var parsedNumber = toNumber(s);
    return !Number.isNaN(parsedNumber) && s === parsedNumber.toString();
};
var isDiceNotation = function (s) { return DICE_SHORTHAND_REGEX.test(s); };
var parseSummable = function (s) {
    if (isDiceNotation(s)) {
        var diceDescriptor = splitDiceNotation(s);
        if (isValidDie(diceDescriptor)) {
            return parseDice(diceDescriptor);
        }
    }
    else if (isStraightValue(s)) {
        return parseModifier(toNumber(s));
    }
    return parseModifier(0);
};
var splitDiceNotation = function (s) {
    // commas skip the ace-specific captures (maybe these can be rolled out)
    var _a = DICE_SHORTHAND_REGEX.exec(s), input = _a[0], nDice = _a[1], dieFaces = _a[2], ace = _a[3], toDrop = _a[6];
    var dropHighest = 0;
    var dropLowest = 0;
    if (toDrop && toDrop[1] === "h") {
        dropHighest = toNumber(toDrop.slice(2, toDrop.length));
    }
    else if (toDrop && toDrop[1] === "l") {
        dropLowest = toNumber(toDrop.slice(2, toDrop.length));
    }
    var spn = {
        input: input,
        nDice: toNumber(nDice) || 1,
        dieFaces: dieFaces,
        ace: parseAce(ace, dieFaces),
        dropHighest: dropHighest,
        dropLowest: dropLowest,
    };
    return spn;
};
var parseAce = function (s, dieFaces) {
    var acesOn = { target: 0, operator: dice_2.AceOperator.eq };
    if (s) {
        // commas skip the outer captures
        var _a = ACE_REGEX.exec(s), operator = _a[2], target = _a[3];
        if (!operator && !target) {
            acesOn.target = toNumber(dieFaces.slice(1, dieFaces.length));
        }
        else if (!operator && target) {
            acesOn.target = toNumber(target);
        }
        else {
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
var isValidDie = function (dn) {
    return dice.isValidDieIndex(dn.dieFaces);
};
var parseDice = function (dn) {
    var idx = dn.dieFaces;
    var roller = dice[idx];
    return new dice_1.default(roller, dn.nDice, {
        ace: dn.ace,
        dh: dn.dropHighest,
        dl: dn.dropLowest,
    });
};
var parseModifier = function (n) { return new modifiers_1.StraightValue(n); };
var toNumber = function (s) { return parseInt(s, 10); };
//# sourceMappingURL=parser.js.map