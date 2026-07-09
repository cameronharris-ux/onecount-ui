"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.hapticMoment = exports.HAPTIC_MOMENTS = exports.useReducedMotion = exports.AiDisclosure = exports.AiHero = exports.AiCard = exports.AiBadge = exports.ProductDot = exports.AnimatedNumber = exports.PressableScale = exports.AnimatedSplash = exports.Aurora = exports.tokens = void 0;
const tokens = __importStar(require("@onecount/ui-tokens"));
exports.tokens = tokens;
var Aurora_1 = require("./Aurora");
Object.defineProperty(exports, "Aurora", { enumerable: true, get: function () { return Aurora_1.Aurora; } });
var AnimatedSplash_1 = require("./AnimatedSplash");
Object.defineProperty(exports, "AnimatedSplash", { enumerable: true, get: function () { return AnimatedSplash_1.AnimatedSplash; } });
var PressableScale_1 = require("./PressableScale");
Object.defineProperty(exports, "PressableScale", { enumerable: true, get: function () { return PressableScale_1.PressableScale; } });
var AnimatedNumber_1 = require("./AnimatedNumber");
Object.defineProperty(exports, "AnimatedNumber", { enumerable: true, get: function () { return AnimatedNumber_1.AnimatedNumber; } });
var ProductDot_1 = require("./ProductDot");
Object.defineProperty(exports, "ProductDot", { enumerable: true, get: function () { return ProductDot_1.ProductDot; } });
var AiBadge_1 = require("./AiBadge");
Object.defineProperty(exports, "AiBadge", { enumerable: true, get: function () { return AiBadge_1.AiBadge; } });
var AiCard_1 = require("./AiCard");
Object.defineProperty(exports, "AiCard", { enumerable: true, get: function () { return AiCard_1.AiCard; } });
var AiHero_1 = require("./AiHero");
Object.defineProperty(exports, "AiHero", { enumerable: true, get: function () { return AiHero_1.AiHero; } });
var AiDisclosure_1 = require("./AiDisclosure");
Object.defineProperty(exports, "AiDisclosure", { enumerable: true, get: function () { return AiDisclosure_1.AiDisclosure; } });
var useReducedMotion_1 = require("./useReducedMotion");
Object.defineProperty(exports, "useReducedMotion", { enumerable: true, get: function () { return useReducedMotion_1.useReducedMotion; } });
var haptics_1 = require("./haptics");
Object.defineProperty(exports, "HAPTIC_MOMENTS", { enumerable: true, get: function () { return haptics_1.HAPTIC_MOMENTS; } });
Object.defineProperty(exports, "hapticMoment", { enumerable: true, get: function () { return haptics_1.hapticMoment; } });
