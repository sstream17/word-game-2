import { Colors } from "@/constants/Colors";
import { KeyStatus } from "@/types/game";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IProps {
  width: number;
  height: number;
  colors: KeyStatus[];
  theme: (typeof Colors)["light"] | (typeof Colors)["dark"];
}

const radius = 4;
const borderWidth = 4;

export function KeyBackground(props: IProps) {
  const { width, height, colors, theme } = props;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <ClipPath id="borderClip">
          <Rect width={width} height={height} rx={radius} ry={radius} />
        </ClipPath>

        <ClipPath id="innerClip">
          <Rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            rx={radius}
            ry={radius}
          />
        </ClipPath>
      </Defs>

      <G clipPath="url(#borderClip)">
        <Path
          d={`M 0,0 H ${halfWidth} V ${halfHeight} H 0 Z`}
          fill={theme[`${colors[0]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},0 H ${width} V ${halfHeight} H ${halfWidth} Z`}
          fill={theme[`${colors[1]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M 0,${halfHeight} H ${halfWidth} V ${height} H 0 Z`}
          fill={theme[`${colors[2]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},${halfHeight} H ${width} V ${height} H ${halfWidth} Z`}
          fill={theme[`${colors[3]}Border`] ?? theme.unknown}
        />
      </G>

      <G clipPath="url(#innerClip)">
        <Path
          d={`M 0,0 H ${halfWidth} V ${halfHeight} H 0 Z`}
          fill={theme[colors[0]] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},0 H ${width} V ${halfHeight} H ${halfWidth} Z`}
          fill={theme[colors[1]] ?? theme.unknown}
        />
        <Path
          d={`M 0,${halfHeight} H ${halfWidth} V ${height} H 0 Z`}
          fill={theme[colors[2]] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},${halfHeight} H ${width} V ${height} H ${halfWidth} Z`}
          fill={theme[colors[3]] ?? theme.unknown}
        />
      </G>
    </Svg>
  );
}
