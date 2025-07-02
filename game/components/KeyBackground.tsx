import { BORDER_RADIUS, BORDER_WIDTH } from "@/constants/layout";
import { useUniqueElementId } from "@/hooks/useUniqueElementId";
import { KeyStatus } from "@/types/game";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const backgroundColorMap = {
  exact: "fill-[--color-exact]",
  close: "fill-[--color-close]",
  missing: "fill-[--color-missing]",
  unknown: "fill-[--color-unknown]",
};

const borderColorMap = {
  exact: "fill-[--color-exactBorder]",
  close: "fill-[--color-closeBorder]",
  missing: "fill-[--color-missingBorder]",
  unknown: "fill-[--color-unknownBorder]",
};

interface IProps {
  width: number;
  height: number;
  colors: KeyStatus[];
}

const radius = BORDER_RADIUS;
const borderWidth = BORDER_WIDTH * 2;

export function KeyBackground(props: IProps) {
  const { width, height, colors } = props;

  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const id = useUniqueElementId();

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <ClipPath id={`borderClip-${id}`}>
          <Rect width={width} height={height} rx={radius} ry={radius} />
        </ClipPath>

        <ClipPath id={`innerClip-${id}`}>
          <Rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            rx={radius - 1}
            ry={radius - 1}
          />
        </ClipPath>
      </Defs>

      <G clipPath={`url(#borderClip-${id})`}>
        <Path
          d={`M 0,0 H ${halfWidth + 1} V ${halfHeight + 1} H 0 Z`}
          className={borderColorMap[colors[0]]}
          //fill={theme[`${colors[0]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},0 H ${width} V ${halfHeight + 1} H ${halfWidth} Z`}
          className={borderColorMap[colors[1]]}
          //fill={theme[`${colors[1]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M 0,${halfHeight} H ${halfWidth + 1} V ${height} H 0 Z`}
          className={borderColorMap[colors[2]]}
          //fill={theme[`${colors[2]}Border`] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},${halfHeight} H ${width} V ${height} H ${halfWidth} Z`}
          className={borderColorMap[colors[3]]}
          //fill={theme[`${colors[3]}Border`] ?? theme.unknown}
        />
      </G>

      <G clipPath={`url(#innerClip-${id})`}>
        <Path
          d={`M 0,0 H ${halfWidth + 1} V ${halfHeight + 1} H 0 Z`}
          className={backgroundColorMap[colors[0]]}
          // fill={theme[colors[0]] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},0 H ${width} V ${halfHeight + 1} H ${halfWidth} Z`}
          className={backgroundColorMap[colors[1]]}
          // fill={theme[colors[1]] ?? theme.unknown}
        />
        <Path
          d={`M 0,${halfHeight} H ${halfWidth + 1} V ${height} H 0 Z`}
          className={backgroundColorMap[colors[2]]}
          // fill={theme[colors[2]] ?? theme.unknown}
        />
        <Path
          d={`M ${halfWidth},${halfHeight} H ${width} V ${height} H ${halfWidth} Z`}
          className={backgroundColorMap[colors[3]]}
          // fill={theme[colors[3]] ?? theme.unknown}
        />
      </G>
    </Svg>
  );
}
