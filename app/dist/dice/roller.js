"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roller = void 0;
var random_1 = require("../random");
var roller = function (ceiling) {
    return function () {
        var seed = random_1.random();
        return Math.ceil(seed * ceiling);
    };
};
exports.roller = roller;
//# sourceMappingURL=roller.js.map