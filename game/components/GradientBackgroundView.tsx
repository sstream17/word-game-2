import { PropsWithChildren, useContext } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { colors } from "@/constants/Colors";
import { useUniqueElementId } from "@/hooks/useUniqueElementId";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { ThemeContext } from "./ThemeProvider";

interface IProps extends PropsWithChildren {
  style?: ViewStyle;
}

const viewBoxSize = 100;
const circleSize = 200;
const circleRadius = circleSize / 2;

export function GradientBackgroundView(props: IProps) {
  const { children, style } = props;

  const id = useUniqueElementId();

  // Have to retrieve colors from the theme directly
  // to apply to gradient `Stop`
  const { theme } = useContext(ThemeContext);
  const themeColors = colors[theme];

  return (
    <View className="bg-[--color-background]" style={styles.background}>
      <Svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Defs>
          <RadialGradient
            id={`${id}`}
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <Stop
              offset="0%"
              stopColor={themeColors.backgroundLightest}
              stopOpacity="1"
            />
            <Stop
              offset="100%"
              stopColor={themeColors.backgroundLighter}
              stopOpacity="0.5"
            />
          </RadialGradient>
        </Defs>

        <Circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={circleRadius}
          fill={`url(#${id})`}
        />
      </Svg>
      <View style={style}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});
