"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAuroraSecondaryHue = resolveAuroraSecondaryHue;
const ui_tokens_1 = require("@onecount/ui-tokens");
const internal_1 = require("./internal");
function resolveAuroraSecondaryHue(app, palette, hue) {
    if (hue)
        return hue;
    return palette === "product" ? (0, internal_1.appHue)(app) : ui_tokens_1.CORE.brand.ai;
}
