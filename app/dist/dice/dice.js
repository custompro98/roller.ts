"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDieIndex = exports.d100 = exports.d20 = exports.d12 = exports.d10 = exports.d8 = exports.d6 = exports.d4 = exports.d2 = void 0;
var types_1 = require("./types");
var roller_1 = require("./roller");
var dice = {
    d2: roller_1.roller(2),
    d4: roller_1.roller(4),
    d6: roller_1.roller(6),
    d8: roller_1.roller(8),
    d10: roller_1.roller(10),
    d12: roller_1.roller(12),
    d20: roller_1.roller(20),
    d100: roller_1.roller(100),
};
exports.d2 = dice.d2, exports.d4 = dice.d4, exports.d6 = dice.d6, exports.d8 = dice.d8, exports.d10 = dice.d10, exports.d12 = dice.d12, exports.d20 = dice.d20, exports.d100 = dice.d100;
exports.isValidDieIndex = function (s) {
    return Object.keys(dice).includes(s);
};
var Die = /** @class */ (function () {
    function Die(roller, nDice, _a) {
        if (nDice === void 0) { nDice = 1; }
        var _b = _a === void 0 ? {
            dh: 0,
            dl: 0,
            ace: { target: 0, operator: types_1.AceOperator.eq },
        } : _a, dh = _b.dh, dl = _b.dl, ace = _b.ace;
        this.DEFAULT_DROPPED = 0;
        this._roll = roller;
        this._nDice = nDice;
        this._dropHighest = dh || this.DEFAULT_DROPPED;
        this._dropLowest = dl || this.DEFAULT_DROPPED;
        this._explodesOn = ace || { target: 0, operator: types_1.AceOperator.eq };
        this._results = [];
        this.roll();
    }
    Die.prototype.value = function () {
        var list = this._results;
        var numDropped = 0;
        if (this._dropLowest > 0) {
            numDropped = this._dropLowest;
            list = list.reverse().slice(0, this._nDice - numDropped);
        }
        else if (this._dropHighest > 0) {
            numDropped = this._dropHighest;
            list = list.slice(0, this._nDice - numDropped);
        }
        return list.reduce(function (acc, cur) { return acc + cur; }, 0);
    };
    Die.prototype.reroll = function () {
        this._results = [];
        this.roll();
    };
    Die.prototype.roll = function () {
        for (var i = 0; i < this._nDice; i++) {
            var val = void 0;
            do {
                val = this._roll();
                this._results.push(val);
            } while (this.didExplode(val));
        }
        this._results.sort();
    };
    Die.prototype.didExplode = function (n) {
        switch (this._explodesOn.operator) {
            case types_1.AceOperator.eq: {
                return n === this._explodesOn.target;
            }
            case types_1.AceOperator.ge: {
                return n >= this._explodesOn.target;
            }
            case types_1.AceOperator.le: {
                return n <= this._explodesOn.target;
            }
            default: {
                return false;
            }
        }
    };
    return Die;
}());
exports.default = Die;
//# sourceMappingURL=dice.js.map