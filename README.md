# @onecount/ui

Shared React Native component extractions for the OneCount family.

Cameron's 2026-07-09 override of doc 10 section 7 is explicit here: this package is extraction-not-invention, tokens-first, and every component has a working donor.

## Install

```json
{
  "dependencies": {
    "@onecount/ui": "github:cameronharris-ux/onecount-ui#v0.3.2"
  }
}
```

Peer dependencies stay in the consuming app:

| Package | Why |
|---|---|
| `react` | React component runtime |
| `react-native` | Native primitives and accessibility APIs |
| `react-native-svg >=15` | Aurora and AI sparkle glyph |
| `react-native-reanimated >=4` | Ambient Aurora, splash, and press feedback |
| `expo-haptics` optional | Used only by `hapticMoment`; missing module is a silent no-op |

## Usage

```tsx
import { Aurora, ProductDot, PressableScale } from "@onecount/ui";

export function Header() {
  return (
    <>
      <Aurora app="ops" variant="static" />
      <PressableScale onPress={() => {}}>
        <ProductDot app="shield" />
      </PressableScale>
    </>
  );
}
```

```tsx
import { AnimatedSplash } from "@onecount/ui";

<AnimatedSplash
  markSource={require("./assets/icon.png")}
  wordmarkSource={require("./assets/wordmark.png")}
  onDone={() => setSplashDone(true)}
/>;
```

```tsx
import { AnimatedNumber } from "@onecount/ui";

<AnimatedNumber value={1284} suffix=" items" />;
```

```tsx
import { AiBadge, AiCard, AiDisclosure, AiHero } from "@onecount/ui";

<AiHero title="Operational intelligence" subtitle="Live kitchen context">
  <AiCard halo>
    <AiBadge />
    <AiDisclosure />
  </AiCard>
</AiHero>;
```

```ts
import { hapticMoment, tokens, useReducedMotion } from "@onecount/ui";

const reduceMotion = useReducedMotion();
await hapticMoment("count-saved");
console.log(tokens.CORE.identityHues.trace);
```

## Component Donors

| Export | Donor |
|---|---|
| `Aurora` | `One-Count/one-count-app/components/oc/OcAurora.tsx`; ambient feel references `AuroraBackground.tsx` without Skia |
| `AnimatedSplash` | `OneCount-Playbook/components/ui/AnimatedSplash.tsx` |
| `PressableScale` | `OneCount-Shield/components/ui/PressableScale.tsx` |
| `AnimatedNumber` | `OneCount-Shield/components/ui/AnimatedNumber.tsx` |
| `ProductDot` | `OneCount-Playbook/app/activity.tsx` and `OneCount-Shield/app/family-connections.tsx` |
| `AiBadge`, `AiCard`, `AiHero`, `AiDisclosure` | `One-Count/one-count-app/components/ai-hub/*` |
| `useReducedMotion` | `One-Count/one-count-app/lib/useReducedMotion.ts`, consolidated from chart and AI-card motion use |
| `hapticMoment` | doc 10 section 4 haptic vocabulary, sourced from `@onecount/ui-tokens` |

## Laws

Reduced motion is live-updating through `AccessibilityInfo.reduceMotionChanged`. Aurora becomes static and AnimatedSplash snaps to its final frame before a quick fade.

The canonical full-screen Aurora preserves the original OneCount donor: low-opacity mint, magenta, and teal. Saturated magenta controls, halos, badges, and framing remain AI-only. Components import `tokens.CORE.brand.ai`; do not hand-copy the hex. Product identity hues stay on dots and icon accents unless a caller explicitly requests `palette="product"` for a low-opacity attribution wash.

Build and smoke-test:

```bash
npm run build
npm test
```
