import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { APP_LABELS, appHue, type OneCountApp } from "./internal";

export interface ProductDotProps {
  app: OneCountApp;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function ProductDot({ app, size = 8, style }: ProductDotProps) {
  return (
    <View
      accessible
      accessibilityLabel={`from ${APP_LABELS[app]}`}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: appHue(app),
        },
        style,
      ]}
    />
  );
}

