"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AceMap = exports.AceOperator = exports.Dice = void 0;
var Dice;
(function (Dice) {
    Dice["d2"] = "d2";
    Dice["d4"] = "d4";
    Dice["d6"] = "d6";
    Dice["d8"] = "d8";
    Dice["d10"] = "d10";
    Dice["d12"] = "d12";
    Dice["d20"] = "d20";
    Dice["d100"] = "d100";
})(Dice = exports.Dice || (exports.Dice = {}));
var AceOperator;
(function (AceOperator) {
    AceOperator["eq"] = "=";
    AceOperator["ge"] = ">";
    AceOperator["le"] = "<";
})(AceOperator = exports.AceOperator || (exports.AceOperator = {}));
exports.AceMap = {
    "=": AceOperator.eq,
    ">": AceOperator.ge,
    "<": AceOperator.le,
};
//# sourceMappingURL=types.js.map