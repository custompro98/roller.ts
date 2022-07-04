"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.d100 = exports.d20 = exports.d12 = exports.d10 = exports.d8 = exports.d6 = exports.d4 = exports.d2 = exports.Die = exports.StraightValue = exports.parse = void 0;
var dice_1 = __importDefault(require("./dice"));
exports.Die = dice_1.default;
var parser_1 = require("./parser");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parser_1.parse; } });
var modifiers_1 = require("./modifiers");
Object.defineProperty(exports, "StraightValue", { enumerable: true, get: function () { return modifiers_1.StraightValue; } });
var dice_2 = require("./dice");
Object.defineProperty(exports, "d2", { enumerable: true, get: function () { return dice_2.d2; } });
Object.defineProperty(exports, "d4", { enumerable: true, get: function () { return dice_2.d4; } });
Object.defineProperty(exports, "d6", { enumerable: true, get: function () { return dice_2.d6; } });
Object.defineProperty(exports, "d8", { enumerable: true, get: function () { return dice_2.d8; } });
Object.defineProperty(exports, "d10", { enumerable: true, get: function () { return dice_2.d10; } });
Object.defineProperty(exports, "d12", { enumerable: true, get: function () { return dice_2.d12; } });
Object.defineProperty(exports, "d20", { enumerable: true, get: function () { return dice_2.d20; } });
Object.defineProperty(exports, "d100", { enumerable: true, get: function () { return dice_2.d100; } });
//# sourceMappingURL=index.js.map