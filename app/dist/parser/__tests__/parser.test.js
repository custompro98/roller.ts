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
var parser_1 = require("../parser");
var dice = __importStar(require("../../dice"));
describe("parse", function () {
    beforeEach(function () {
        jest.clearAllMocks();
        jest.restoreAllMocks();
        jest.spyOn(dice, "d2").mockReturnValue(2);
        jest.spyOn(dice, "d4").mockReturnValue(4);
        jest.spyOn(dice, "d6").mockReturnValue(6);
        jest.spyOn(dice, "d8").mockReturnValue(8);
        jest.spyOn(dice, "d10").mockReturnValue(10);
        jest.spyOn(dice, "d12").mockReturnValue(12);
        jest.spyOn(dice, "d20").mockReturnValue(20);
        jest.spyOn(dice, "d100").mockReturnValue(100);
    });
    it("returns an empty array for no input", function () {
        var input = "";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(0);
    });
    it("can parse a straight value", function () {
        var input = "5";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(5);
    });
    it("can parse a straight negative value", function () {
        var input = "-5";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(-5);
    });
    it("can parse two straight values", function () {
        var input = "5+3";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(5);
        expect(result[1].value()).toEqual(3);
    });
    it("can parse two straight values where one is negative", function () {
        var input = "5+-3";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(5);
        expect(result[1].value()).toEqual(-3);
    });
    it("ignores bad straight value inputs", function () {
        var input = "hello";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(0);
    });
    it("can parse a die", function () {
        var input = "d6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("can parse two dice", function () {
        var input = "d6 + d4";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(6);
        expect(result[1].value()).toEqual(4);
    });
    it("can parse two dice shorthand", function () {
        var input = "2d6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(12);
    });
    it("groups two dice shorthand with drop lowest", function () {
        var input = "2d6dl1";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("groups two dice shorthand with drop lowest > 1 digits", function () {
        var input = "20d6dl19";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("groups two dice shorthand with drop highest", function () {
        var input = "2d6dh1";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("can parse one die shorthand", function () {
        var input = "1d6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("can parse dice and straight values", function () {
        var input = "1d6 + 56";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(6);
        expect(result[1].value()).toEqual(56);
    });
    it("can parse dice and straight values with a negative", function () {
        var input = "1d6 + -56";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(6);
        expect(result[1].value()).toEqual(-56);
    });
    it("can parse dice and straight values and leaves them in inputted order", function () {
        var input = "56 + 1d6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(2);
        expect(result[0].value()).toEqual(56);
        expect(result[1].value()).toEqual(6);
    });
    it("can parse when a dice should ace", function () {
        jest.spyOn(dice, "d6").mockReturnValueOnce(6).mockReturnValueOnce(3);
        var input = "1d6!";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(9);
    });
    it("can parse when a dice should ace at a different target", function () {
        jest.spyOn(dice, "d6").mockReturnValueOnce(5).mockReturnValueOnce(3);
        var input = "1d6!5";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(8);
        jest.spyOn(dice, "d6").mockReturnValueOnce(6).mockReturnValueOnce(3);
        input = "1d6!5";
        result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(6);
    });
    it("can parse when a dice should ace in a greater than range", function () {
        jest
            .spyOn(dice, "d6")
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(5)
            .mockReturnValueOnce(3);
        var input = "1d6!>4";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(12);
    });
    it("ignores bad dice inputs", function () {
        var input = "nd6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(0);
    });
    it("can parse when a dice should ace in a less than range", function () {
        jest
            .spyOn(dice, "d6")
            .mockReturnValueOnce(3)
            .mockReturnValueOnce(4)
            .mockReturnValueOnce(5);
        var input = "1d6!<4";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(1);
        expect(result[0].value()).toEqual(12);
    });
    it("ignores bad dice inputs", function () {
        var input = "nd6";
        var result = parser_1.parse(input);
        expect(result.length).toEqual(0);
    });
});
//# sourceMappingURL=parser.test.js.map