"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
describe('random', function () {
    it('returns a number', function () {
        var result = index_1.random();
        expect(typeof result).toEqual('number');
    });
    it('returns a random number every time', function () {
        var firstCall = index_1.random();
        var secondCall = index_1.random();
        expect(firstCall).not.toEqual(secondCall);
    });
});
//# sourceMappingURL=index.test.js.map