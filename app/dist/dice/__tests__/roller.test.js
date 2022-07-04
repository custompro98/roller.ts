"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roller_1 = require("../roller");
describe('roll', function () {
    it('returns a curried rollDietion', function () {
        var rollDie = roller_1.roller(0);
        expect(typeof rollDie).toEqual('function');
    });
    it('returns a rollDietion that always returns less than the ceiling', function () {
        var ceiling = 8;
        var rollDie = roller_1.roller(ceiling);
        for (var i = 0; i < 1000; i++) {
            var result = rollDie();
            expect(result).toBeGreaterThan(0);
            expect(result).toBeLessThanOrEqual(ceiling);
        }
    });
    it('returns a rollDietion that respects the ceiling', function () {
        var ceiling = 20;
        var rollDie = roller_1.roller(ceiling);
        for (var i = 0; i < 1000; i++) {
            var result = rollDie();
            expect(result).toBeGreaterThan(0);
            expect(result).toBeLessThanOrEqual(ceiling);
        }
    });
    it('returns zero if zero is passed in as the ceiling', function () {
        var ceiling = 0;
        var rollDie = roller_1.roller(ceiling);
        var result = rollDie();
        expect(result).toEqual(0);
    });
});
//# sourceMappingURL=roller.test.js.map