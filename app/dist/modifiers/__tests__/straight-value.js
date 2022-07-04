"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var straight_value_1 = __importDefault(require("../straight-value"));
describe('StraightValue', function () {
    it('wraps a raw value to be added', function () {
        var mod = 5;
        var subject = new straight_value_1.default(mod);
        expect(subject.value()).toEqual(mod);
        mod = 2;
        subject = new straight_value_1.default(mod);
        expect(subject.value()).toEqual(mod);
    });
});
//# sourceMappingURL=straight-value.js.map