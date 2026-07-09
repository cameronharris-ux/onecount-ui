import React, { useEffect, useRef, useState } from "react";
import { Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { CORE } from "@onecount/ui-tokens";

export interface AnimatedNumberProps extends Omit<TextProps, "children"> {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  style?: StyleProp<TextStyle>;
  mono?: boolean;
  formatValue?: (value: number) => string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  durationMs = 700,
  style,
  mono = true,
  formatValue,
  ...rest
}: AnimatedNumberProps) {
  const [shown, setShown] = useState(value);
  const shownRef = useRef(value);
  shownRef.current = shown;

  useEffect(() => {
    const from = shownRef.current;
    if (from === value) return;

    let frame = 0;
    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / durationMs);
      const next = Math.round(from + (value - from) * easeOutCubic(t));
      setShown(next);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, value]);

  return (
    <Text
      {...rest}
      style={[
        mono
          ? {
              fontFamily: CORE.fonts.monoBold,
              fontVariant: ["tabular-nums"],
            }
          : null,
        style,
      ]}
    >
      {prefix}
      {formatValue ? formatValue(shown) : shown}
      {suffix}
    </Text>
  );
}

