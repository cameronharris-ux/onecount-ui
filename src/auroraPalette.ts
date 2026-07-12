import { CORE } from "@onecount/ui-tokens";

import { appHue, type OneCountApp } from "./internal";

export type AuroraPalette = "brand" | "product";

export function resolveAuroraSecondaryHue(
  app: OneCountApp,
  palette: AuroraPalette,
  hue?: string,
): string {
  if (hue) return hue;
  return palette === "product" ? appHue(app) : CORE.brand.ai;
}
