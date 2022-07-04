"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDieIndex = exports.d100 = exports.d20 = exports.d12 = exports.d10 = exports.d8 = exports.d6 = exports.d4 = exports.d2 = exports.Dice = exports.AceOperator = exports.AceMap = void 0;
var dice_1 = __importDefault(require("./dice"));
var types_1 = require("./types");
Object.defineProperty(exports, "AceMap", { enumerable: true, get: function () { return types_1.AceMap; } });
Object.defineProperty(exports, "AceOperator", { enumerable: true, get: function () { return types_1.AceOperator; } });
Object.defineProperty(exports, "Dice", { enumerable: true, get: function () { return types_1.Dice; } });
var dice_2 = require("./dice");
Object.defineProperty(exports, "d2", { enumerable: true, get: function () { return dice_2.d2; } });
Object.defineProperty(exports, "d4", { enumerable: true, get: function () { return dice_2.d4; } });
Object.defineProperty(exports, "d6", { enumerable: true, get: function () { return dice_2.d6; } });
Object.defineProperty(exports, "d8", { enumerable: true, get: function () { return dice_2.d8; } });
Object.defineProperty(exports, "d10", { enumerable: true, get: function () { return dice_2.d10; } });
Object.defineProperty(exports, "d12", { enumerable: true, get: function () { return dice_2.d12; } });
Object.defineProperty(exports, "d20", { enumerable: true, get: function () { return dice_2.d20; } });
Object.defineProperty(exports, "d100", { enumerable: true, get: function () { return dice_2.d100; } });
Object.defineProperty(exports, "isValidDieIndex", { enumerable: true, get: function () { return dice_2.isValidDieIndex; } });
exports.default = dice_1.default;
//# sourceMappingURL=index.js.map