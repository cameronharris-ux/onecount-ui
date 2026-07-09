import { CORE, themeForApp } from "@onecount/ui-tokens";

export type OneCountApp = "onecount" | "ops" | "shield" | "trace";

export const APP_LABELS: Record<OneCountApp, string> = {
  onecount: "OneCount",
  ops: "Ops",
  shield: "Shield",
  trace: "Trace",
};

export function appHue(app: OneCountApp): string {
  return CORE.identityHues[app];
}

export function appTheme(app: OneCountApp, scheme: "dark" | "light" = "dark") {
  return themeForApp(app).theme.colors[scheme];
}

export function withAlpha(color: string, alpha: number): string {
  const value = color.trim();
  const hex = value.startsWith("#") ? value.slice(1) : value;
  if (!/^[\da-f]{6}$/i.test(hex)) {
    return value;
  }

  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const safeAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`;
}

