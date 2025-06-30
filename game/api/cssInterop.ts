import { cssInterop } from "nativewind";
import Svg, { Path, Rect, Text } from "react-native-svg";

cssInterop(Path, {
  className: {
    target: "style",
    nativeStyleToProp: { stroke: true },
  },
});

cssInterop(Rect, {
  className: {
    target: "style",
    nativeStyleToProp: { fill: true },
  },
});

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

cssInterop(Text, {
  className: {
    target: "style",
    nativeStyleToProp: { fill: true },
  },
});
