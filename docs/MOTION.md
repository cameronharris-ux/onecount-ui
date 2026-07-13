# OneCount Motion System

Version 1.0 — July 2026. Canonical spec for motion across the OneCount family:
OneCount (inventory), Ops (kitchen operations), Shield (food safety), Trace
(labelling/traceability), Pulse (workforce identity/presence), the marketing
site, and the web dashboard.

Source of truth for values: `@onecount/ui-tokens` → `CORE.motionSpec` (runtime
scale) and `CORE.motion` (audit envelope). Source of truth for behaviour:
`@onecount/ui` motion kit (`motion.ts`, `BrandSplash`, `PressableScale`,
`AnimatedNumber`, `hapticMoment`, `useReducedMotion`).

Nothing in an app may hardcode a duration, easing curve, spring config, press
scale, or haptic style that this spec already names. Apps inject only: product
mark, product name, descriptor, accent token, app motif, and workflow-specific
choreography built from these primitives.

---

## 1. Principles

1. **Motion communicates hierarchy.** Animate the primary action, the changed
   value, the state transition, the alert. Never animate everything on screen.
   If two things move at once they must be one perceptual unit (paired-element
   rule: same duration, same easing).
2. **Motion must feel fast.** Feedback lands inside one perceptual beat
   (≤120 ms). Longer motion is reserved for startup, major navigation, workflow
   completion, and brand moments. An animation that makes a busy kitchen wait
   is a defect, not polish.
3. **Motion preserves context.** Detail views, sheets, modals, and menus enter
   from where they came from and leave the way they entered (reversibility
   rule). Nothing pops into existence without spatial logic; menus originate at
   their trigger.
4. **Motion reduces cognitive load.** Animate the delta, not the page: the
   changed KPI value, the added row, the field that failed. Layouts stay stable
   during loading; skeletons match the real layout; scroll position survives.
5. **Motion is physical but restrained.** Weight and momentum, never cartoons:
   no elastic overshoot beyond ~2 %, no bouncing, no parallax, no perpetual
   floating. Springs settle with precision; the brand feel is *calm machine*,
   not toy.
6. **Frequency caps ceremony.** The more often a moment repeats, the smaller
   its motion. Boot-once → brand moment allowed. Per-screen → standard
   transition. High-frequency (scan/count loop, checklist ticks) → instant
   feedback only: opacity/scale micro-beats and a haptic, nothing that must be
   watched to completion.

Every proposed animation answers the checklist: does it improve understanding,
feedback, context, perceived speed, or brand recognition? Is it one-hand,
five-second, kitchen-proof? Would the flow still be clear with it disabled? A
"no" anywhere means cut it.

---

## 2. Motion tokens (`CORE.motionSpec`)

### 2.1 Durations (ms)

| Token      | Value | Use                                                        |
|------------|------:|------------------------------------------------------------|
| `instant`  |   120 | Press feedback, selection ticks, toggle knobs, scan beat   |
| `fast`     |   160 | Small state change: chip select, checkbox, value flip      |
| `standard` |   220 | Component transitions: fade/slide of cards, menus, toasts  |
| `nav`      |   280 | Screen push/pop, tab cross-fade, sheet presentation        |
| `expand`   |   340 | Complex expansion: card→detail, accordion, drawer          |
| `data`     |   650 | Data reveal: chart draw, KPI settle, AnimatedNumber        |
| `brand`    |   900 | Brand moments: hero reveal, onboarding beats               |
| `splash`   |  1450 | Full splash choreography (hard ceiling 1800)               |

`exitRatio: 0.65` — an exit runs at 65 % of its paired entrance duration.
Exits complete faster than entrances, always.

These values sit inside the audited envelope in `CORE.motion` (micro 120–200,
standard 240–300, dataReveal 600–700) and the product brief ranges. Validate on
device before changing; change the token, never a call-site.

### 2.2 Easing (cubic-bezier, framework-free arrays)

| Token        | Curve                          | Use                                             |
|--------------|--------------------------------|-------------------------------------------------|
| `standard`   | `[0.215, 0.61, 0.355, 1]`      | Workhorse ease-out-cubic: most enters and exits |
| `enter`      | `[0.23, 1, 0.32, 1]`           | Softer landing (quint) for large surfaces       |
| `exit`       | `[0.25, 0.46, 0.45, 0.94]`     | Quicker completion (quad) for departures        |
| `emphasized` | `[0.19, 1, 0.22, 1]`           | Hero/brand/data reveals (expo)                  |
| `move`       | `[0.645, 0.045, 0.355, 1]`     | On-screen movement/morph (in-out cubic)         |
| `linear`     | `[0, 0, 1, 1]`                 | Progress bars, scan-line sweeps ONLY            |

Never `ease-in` for UI. Never `linear` for anything interactive.

### 2.3 Springs

| Token     | damping | stiffness | mass | Use                                                    |
|-----------|--------:|----------:|-----:|--------------------------------------------------------|
| `soft`    |      18 |       160 |  1.0 | Sheets settling, drag release, layout settle           |
| `precise` |      26 |       300 |  0.9 | Lock-in moments, toggles, active indicators — ≤2 % overshoot |
| `press`   |      18 |       320 |  0.6 | Press-in (proven in `PressableScale`)                  |
| `release` |      14 |       220 |  0.7 | Press-out — slight life on the way back                |

Springs are controlled and premium, not playful. If you can see it bounce
twice, it is wrong.

### 2.4 Distance, scale, opacity

- Distances (dp/px): `micro 2`, `sm 4`, `md 8`, `lg 16`, `xl 24`. Most UI
  movement is `sm`–`md`. `xl` is for structural transitions only.
- Scale: `pressButton 0.985`, `pressCard 0.992`, `enter 0.97` (elements enter
  from 0.97, never 0), `popover 0.95` (with transform-origin at trigger),
  `emphasis 1.02` (ceiling for any grow effect).
- Opacity: `backdrop 0.45` (overlay dim), `dimmed 0.7` (de-emphasised content).
- Blur is a depth garnish, not structure; never above 20 px, never animated on
  low-end devices, and layouts must read without it.

---

## 3. Haptic language (`CORE.haptics` → `hapticMoment()`)

| Moment                 | Feel      | When                                            |
|------------------------|-----------|--------------------------------------------------|
| `button-press`         | light     | Important action press (not every button)        |
| `quantity-step`        | selection | Count +/- tick, stepper — high-frequency safe    |
| `scale-settled`        | selection | Bluetooth scale reading locks                    |
| `scan-matched`         | medium    | Barcode resolved to an item                      |
| `count-saved`          | success   | Entry committed                                  |
| `action-succeeded`     | success   | Workflow-level completion                        |
| `action-needs-review`  | warning   | Exception, duplicate, conflict                   |
| `action-failed`        | error     | Failure requiring intervention                   |
| `destructive-confirmed`| strong    | Delete / finalise / overwrite confirmed          |
| `brand-lock-in`        | light     | Splash mark lock-in — once per cold start, ever  |

Rules: haptics accompany *state*, not decoration; high-frequency loops use
`selection` ticks only (no vibration fatigue); one haptic per user action, no
chords except documented app-level divergences (OneCount's `count-saved` fires
heavy+success deliberately — see `one-count-app/lib/haptics.ts`). Respect
device settings; haptics must never throw.

Sound is optional, app-owned, settings-gated, silent-mode-aware (existing
scan-beep/save-tick system in OneCount is the reference implementation). No
startup sound by default.

---

## 4. Reduced motion

`useReducedMotion()` (RN) / `prefers-reduced-motion` (web) is honoured by every
primitive in `@onecount/ui`, and must be honoured by every app-level animation.

When reduce-motion is on:

- Translation, parallax, scale choreography, and blur animation are removed.
- Transitions become short cross-fades at `fast` (160 ms).
- State feedback is preserved: haptics, colour/status changes, focus states,
  progress indicators all still land. Reduced motion is not reduced feedback.
- The splash becomes: static mark + name fade-in (220 ms), brief hold, fade-out.
  Total under 900 ms.

Reduced motion must still feel polished — it is a first-class rendering of the
same hierarchy, not a degraded mode.

---

## 5. Splash system (`BrandSplash`)

One choreography, shared by all five apps; only the motif and identity line
change. Total 1450 ms nominal; never exceeds 1800 ms; never blocks input
(overlay is `pointerEvents="none"` above the already-rendered app); never
delays readiness — the JS overlay mounts only after the app is ready and the
native splash has done the waiting.

Continuity chain: native splash tile (static mark on theme background) → JS
overlay with identical background → app screen already rendered beneath the
fade. No blank frames, no cuts.

| Stage | Window (ms) | What happens |
|-------|-------------|--------------|
| 1 Environment | 0–120 | Theme-dark background is already there (matches native tile). Motif field fades to ambient (~12 % opacity): fine data texture, not a gradient wash. |
| 2 Construction | 80–700 | The mark **assembles**: the OneCount "1" is built from its real geometry — four data-block segments, base bar, diagonal flag, dot — arriving with a 40 ms stagger, each ~380 ms on `emphasized`. Reads as barcode lines aligning into the mark. |
| 3 Lock-in | 700–880 | Whole mark settles 1.03 → 1.0 on `precise` spring. `brand-lock-in` haptic fires exactly once at settle start. Motif reacts once (single pulse/connection), never loops. |
| 4 Identity | 860–1220 | Product name rises 12 dp / fades in (360 ms, `standard`); optional letter-spaced descriptor beneath (Ops-style "OPS" label formalised). |
| 5 Handoff | 1150–1450 | Root fades out over 300 ms while the mark eases to 1.04 — a restrained zoom-through into the app already visible beneath. |

### App motifs (same skeleton, different secondary layer)

- **OneCount — `barcode`**: hairline vertical bars flanking the mark, varying
  heights, that align to a common baseline as the mark assembles; two or three
  data dots resolve and fade.
- **Shield — `boundary`**: four corner brackets draw in around the mark; at
  lock-in a single soft ring pulse (scale 1 → 1.12, fade) — protection as
  geometry, no padlocks, no hexagons.
- **Trace — `trace`**: three nodes light in sequence, connected by a fine line
  that completes at lock-in — a journey resolving into identity.
- **Ops — `workflow`**: four nodes connect into a closed loop that locks with
  the mark — coordination clicking into place.
- **Pulse — `pulse`**: an eight-segment workforce signal draws in path order;
  at lock-in the same geometry receives one violet opacity pulse — identity
  resolving without a dot, bloom, or spectrum wash.

Motifs are monochrome surface tones plus at most a 12 % wash of the product's
`identityHue` (per the identity-hue rule in tokens). Implemented as plain
animated Views (opacity/scale/translate) — no SVG, no Skia, no video, no new
dependencies in the shared package.

---

## 6. Component and workflow rules

- **Buttons/controls**: press = `pressButton` scale on `press` spring in,
  `release` out (that is `PressableScale`); loading stays local to the control;
  success/error are state swaps at `fast`, not celebrations.
- **Tabs**: immediate. Content cross-fade ≤ `standard`; animated active
  indicator on `precise`; never replay entrance choreography on tab return.
- **Stack navigation**: platform push at `nav`; back is the exact reverse.
  Deep links enter with a plain fade — no dependency on a previous screen.
- **Sheets/modals/menus**: sheets translate up at `nav` with `backdrop` dim on
  the same clock (paired-element rule); menus scale from 0.95 at their
  transform-origin; dismissal mirrors entry at `exitRatio`.
- **Lists/tables**: animate only the changed row (add: fade+4 dp rise; remove:
  fade at exit ratio; reorder: `move`); unaffected rows do not move.
- **KPI/data**: animate the changed value once (`AnimatedNumber`, `data`
  duration); chart reveals only on new data or filter change, never on tab
  return; anomalies get one `standard` highlight sweep, never a loop.
- **Scan/count loop** (highest frequency in the family): scan → ≤120 ms
  scan-line beat + item card arrival at `standard` + `scan-matched` haptic;
  count tick → value flip at `fast` + `quantity-step`; nothing longer exists in
  this loop. Unknown barcode transitions straight into resolution with context
  preserved.
- **Success**: calm confirmation — state change, small check, subtle haptic,
  immediate continuation. Full-screen success is banned inside repetitive
  workflows.
- **Errors**: identify what/where/how-to-fix; motion only to direct attention
  (one `sm` shake of the failing field at most — never the screen).
- **Destructive**: deliberate `standard`-speed confirmation state; consequence
  communicated by pacing and colour, not drama.
- **Skeletons**: match final layout exactly; shimmer 1400 ms linear loop;
  content replaces skeleton with a `fast` cross-fade, no reflow.
- **Sync states**: synced (static tick), syncing (rotating indicator only while
  actively syncing), offline/pending/conflict/failed each a static badge —
  no permanent spinners.

---

## 7. Performance rules

Transforms and opacity only (GPU path); Reanimated worklets on the UI thread —
no JS-thread `Animated` for anything new; no layout-property animation
(width/height/padding/margin); no blur animation on low-end devices; no
long-running ambient effects on product screens (ambient ≤ marketing surfaces);
memoise animated styles; never replay per-render; cancel on unmount. Target:
60 fps on supported devices, zero dropped frames in the scan/count loop.

Degradation ladder: full choreography → (low-end) shorter durations, no blur,
no motif field → (reduce-motion) fades only.

---

## 8. Web mapping

`@onecount/ui-tokens` exports `cssEase(name)` and `motionCssVars()` producing
`--oc-dur-*` / `--oc-ease-*` custom properties from the same values, plus
framer-motion transition presets. The dashboard uses the quiet half of the
scale (`instant`–`nav`); marketing may use `data`/`brand` for storytelling.
Same reduced-motion contract via `prefers-reduced-motion`. No scroll-jacking,
no floating blobs, no generic SaaS parallax.

---

## 9. Governance

- New motion = new use of existing tokens. A new token requires editing this
  spec and `tokens.json` together, with a stated reason.
- Apps may not fork the splash choreography; they supply
  `{ app, markSource, productName, descriptor, motif, accent }` only.
- The frequency table (§1.6) is binding: anything in a high-frequency loop is
  capped at `instant`/`fast`.
- Reduced-motion coverage is an acceptance gate for every PR that adds motion.
