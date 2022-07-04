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
var dice_1 = __importStar(require("../dice"));
var types_1 = require("../types");
describe("dice", function () {
    describe("d2", function () {
        it("returns a number between 1 and 2", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d2();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(2);
            }
        });
    });
    describe("d4", function () {
        it("returns a number between 1 and 4", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d4();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(4);
            }
        });
    });
    describe("d6", function () {
        it("returns a number between 1 and 6", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d6();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(6);
            }
        });
    });
    describe("d8", function () {
        it("returns a number between 1 and 8", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d8();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(8);
            }
        });
    });
    describe("d10", function () {
        it("returns a number between 1 and 10", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d10();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(10);
            }
        });
    });
    describe("d12", function () {
        it("returns a number between 1 and 12", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d12();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(12);
            }
        });
    });
    describe("d20", function () {
        it("returns a number between 1 and 20", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d20();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(20);
            }
        });
    });
    describe("d100", function () {
        it("returns a number between 1 and 100", function () {
            for (var i = 0; i < 1000; i++) {
                var result = dice_1.d100();
                expect(result).toBeGreaterThan(0);
                expect(result).toBeLessThanOrEqual(100);
            }
        });
    });
    describe("isValidDieIndex", function () {
        it("returns true for a valid die type", function () {
            expect(dice_1.isValidDieIndex("d6")).toBeTruthy();
        });
        it("returns false for an invalid die type", function () {
            expect(dice_1.isValidDieIndex("d5")).toBeFalsy();
        });
    });
});
describe("Die", function () {
    it("wraps a DiceFunction", function () {
        var fudgedRoll = 4;
        var mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);
        new dice_1.default(mockDiceFunction);
        expect(mockDiceFunction).toHaveBeenCalledTimes(1);
    });
    it("calls the DiceFunction once per number of dice", function () {
        var fudgedRoll = 4;
        var mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);
        var numDice = 10;
        new dice_1.default(mockDiceFunction, numDice);
        expect(mockDiceFunction).toHaveBeenCalledTimes(numDice);
    });
    describe("value", function () {
        it("returns the sum of all dice by default", function () {
            var fudgedRoll = 4;
            var mockDiceFunction = jest.fn().mockReturnValue(fudgedRoll);
            var numDice = 10;
            var subject = new dice_1.default(mockDiceFunction, numDice);
            expect(subject.value()).toEqual(fudgedRoll * numDice);
        });
        it("returns the sum of the highest (n - dl) dice if dl is passed", function () {
            var minRoll = 1;
            var fudgedRoll = 4;
            var mockDiceFunction = jest
                .fn()
                .mockReturnValueOnce(minRoll)
                .mockReturnValue(fudgedRoll);
            var numDice = 10;
            var numDropped = 1;
            var subject = new dice_1.default(mockDiceFunction, numDice, { dl: numDropped });
            expect(subject.value()).toEqual(fudgedRoll * (numDice - numDropped));
        });
        it("returns the sum of the lowest (n - dh) dice if dh is passed", function () {
            var maxRoll = 4;
            var fudgedRoll = 1;
            var mockDiceFunction = jest
                .fn()
                .mockReturnValueOnce(maxRoll)
                .mockReturnValue(fudgedRoll);
            var numDice = 10;
            var numDropped = 1;
            var subject = new dice_1.default(mockDiceFunction, numDice, { dh: numDropped });
            expect(subject.value()).toEqual(fudgedRoll * (numDice - numDropped));
        });
        it("handles compounding dice if ace is passed", function () {
            var maxRoll = 4;
            var fudgedRoll = 1;
            var mockDiceFunction = jest
                .fn()
                .mockReturnValueOnce(maxRoll)
                .mockReturnValueOnce(fudgedRoll);
            var numDice = 1;
            var subject = new dice_1.default(mockDiceFunction, numDice, {
                ace: {
                    target: maxRoll,
                    operator: types_1.AceOperator.eq,
                },
            });
            expect(subject.value()).toEqual(maxRoll + fudgedRoll);
        });
        it("handles compounding dice if ace greater than is passed", function () {
            var maxRoll = 4;
            var fudgedRoll = 1;
            var mockDiceFunction = jest
                .fn()
                .mockReturnValueOnce(maxRoll)
                .mockReturnValueOnce(fudgedRoll);
            var numDice = 1;
            var subject = new dice_1.default(mockDiceFunction, numDice, {
                ace: {
                    target: maxRoll - 1,
                    operator: types_1.AceOperator.ge,
                },
            });
            expect(subject.value()).toEqual(maxRoll + fudgedRoll);
        });
        it("handles compounding dice if ace less than is passed", function () {
            var minRoll = 1;
            var fudgedRoll = 3;
            var mockDiceFunction = jest
                .fn()
                .mockReturnValueOnce(minRoll)
                .mockReturnValueOnce(fudgedRoll);
            var numDice = 1;
            var subject = new dice_1.default(mockDiceFunction, numDice, {
                ace: {
                    target: minRoll + 1,
                    operator: types_1.AceOperator.le,
                },
            });
            expect(subject.value()).toEqual(minRoll + fudgedRoll);
        });
    });
});
//# sourceMappingURL=dice.test.js.map