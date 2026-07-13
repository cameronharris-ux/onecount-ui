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
exports.MotionSheet = exports.AnimatedRing = exports.StaggerIn = exports.PULSE_SIGNAL_SEGMENTS = exports.PULSE_SIGNAL_POINTS = exports.PULSE_SIGNAL_PATH = exports.PULSE_SIGNAL_HIGHLIGHT_PATH = exports.DEFAULT_SPLASH_MOTIF = exports.SPLASH_MOTIFS = exports.BrandSplash = exports.BRAND_MARK_UNITS = exports.BRAND_MARK_SEGMENTS = exports.BrandMark = exports.exitTiming = exports.timing = exports.SPRING = exports.DUR = exports.EASE = exports.MOTION = exports.hapticMoment = exports.HAPTIC_MOMENTS = exports.useReducedMotion = exports.AiDisclosure = exports.AiHero = exports.AiCard = exports.AiBadge = exports.ProductDot = exports.AnimatedNumber = exports.PressableScale = exports.AnimatedSplash = exports.Aurora = exports.tokens = void 0;
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
var motion_1 = require("./motion");
Object.defineProperty(exports, "MOTION", { enumerable: true, get: function () { return motion_1.MOTION; } });
Object.defineProperty(exports, "EASE", { enumerable: true, get: function () { return motion_1.EASE; } });
Object.defineProperty(exports, "DUR", { enumerable: true, get: function () { return motion_1.DUR; } });
Object.defineProperty(exports, "SPRING", { enumerable: true, get: function () { return motion_1.SPRING; } });
Object.defineProperty(exports, "timing", { enumerable: true, get: function () { return motion_1.timing; } });
Object.defineProperty(exports, "exitTiming", { enumerable: true, get: function () { return motion_1.exitTiming; } });
var BrandMark_1 = require("./BrandMark");
Object.defineProperty(exports, "BrandMark", { enumerable: true, get: function () { return BrandMark_1.BrandMark; } });
Object.defineProperty(exports, "BRAND_MARK_SEGMENTS", { enumerable: true, get: function () { return BrandMark_1.BRAND_MARK_SEGMENTS; } });
Object.defineProperty(exports, "BRAND_MARK_UNITS", { enumerable: true, get: function () { return BrandMark_1.BRAND_MARK_UNITS; } });
var BrandSplash_1 = require("./BrandSplash");
Object.defineProperty(exports, "BrandSplash", { enumerable: true, get: function () { return BrandSplash_1.BrandSplash; } });
var motifs_1 = require("./motifs");
Object.defineProperty(exports, "SPLASH_MOTIFS", { enumerable: true, get: function () { return motifs_1.SPLASH_MOTIFS; } });
var splashContract_1 = require("./splashContract");
Object.defineProperty(exports, "DEFAULT_SPLASH_MOTIF", { enumerable: true, get: function () { return splashContract_1.DEFAULT_SPLASH_MOTIF; } });
Object.defineProperty(exports, "PULSE_SIGNAL_HIGHLIGHT_PATH", { enumerable: true, get: function () { return splashContract_1.PULSE_SIGNAL_HIGHLIGHT_PATH; } });
Object.defineProperty(exports, "PULSE_SIGNAL_PATH", { enumerable: true, get: function () { return splashContract_1.PULSE_SIGNAL_PATH; } });
Object.defineProperty(exports, "PULSE_SIGNAL_POINTS", { enumerable: true, get: function () { return splashContract_1.PULSE_SIGNAL_POINTS; } });
Object.defineProperty(exports, "PULSE_SIGNAL_SEGMENTS", { enumerable: true, get: function () { return splashContract_1.PULSE_SIGNAL_SEGMENTS; } });
var StaggerIn_1 = require("./StaggerIn");
Object.defineProperty(exports, "StaggerIn", { enumerable: true, get: function () { return StaggerIn_1.StaggerIn; } });
var AnimatedRing_1 = require("./AnimatedRing");
Object.defineProperty(exports, "AnimatedRing", { enumerable: true, get: function () { return AnimatedRing_1.AnimatedRing; } });
var MotionSheet_1 = require("./MotionSheet");
Object.defineProperty(exports, "MotionSheet", { enumerable: true, get: function () { return MotionSheet_1.MotionSheet; } });
