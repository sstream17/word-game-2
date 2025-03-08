import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { IHints } from "@/types/game";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Line, Path } from "react-native-svg";

interface IProps {
  letter: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  hints?: { [gameId: string]: IHints };
  onClick: (letter: string) => void;
}

function getLetterColors(
  letter: string,
  hints?: { [gameId: string]: IHints },
): string[] {
  if (!hints) {
    return [];
  }

  return Object.keys(hints).map((gameId) => hints[gameId][letter]);
}

export function KeyboardKey(props: IProps) {
  const { letter, icon, hints, onClick: updateGuess } = props;

  const theme = Colors["light"];
  const colors = getLetterColors(letter, hints);
  const backgroundColor = theme.unknown; //[colors[/0]] ?? theme.unknown;

  return (
    <Pressable onPress={() => updateGuess(letter)}>
      <View style={[styles.keyContainer, { backgroundColor }]}>
        <Svg width={24} height={30} viewBox="0 0 24 30">
          {/* Quadrants */}
          <Path
            d="M 0,0 L 12,0 L 12,15 L 0,15 Z"
            fill={theme[colors[0]] ?? theme.unknown}
          />{" "}
          {/* Top-Left */}
          <Path
            d="M 12,0 L 24,0 L 24,15 L 12,15 Z"
            fill={theme[colors[1]] ?? theme.unknown}
          />{" "}
          {/* Top-Right */}
          <Path
            d="M 0,15 L 12,15 L 12,30 L 0,30 Z"
            fill={theme[colors[2]] ?? theme.unknown}
          />{" "}
          {/* Bottom-Left */}
          <Path
            d="M 12,15 L 24,15 L 24,30 L 12,30 Z"
            fill={theme[colors[3]] ?? theme.unknown}
          />{" "}
          {/* Bottom-Right */}
          {/* Borders Split at Quadrant Points */}
          <Line
            x1="0"
            y1="0"
            x2="12"
            y2="0"
            stroke={theme[`${colors[0]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Top-Left Border */}
          <Line
            x1="12"
            y1="0"
            x2="24"
            y2="0"
            stroke={theme[`${colors[1]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Top-Right Border */}
          <Line
            x1="24"
            y1="0"
            x2="24"
            y2="15"
            stroke={theme[`${colors[1]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Right-Top Border */}
          <Line
            x1="24"
            y1="15"
            x2="24"
            y2="30"
            stroke={theme[`${colors[3]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Right-Bottom Border */}
          <Line
            x1="24"
            y1="30"
            x2="12"
            y2="30"
            stroke={theme[`${colors[3]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Bottom-Right Border */}
          <Line
            x1="12"
            y1="30"
            x2="0"
            y2="30"
            stroke={theme[`${colors[2]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Bottom-Left Border */}
          <Line
            x1="0"
            y1="30"
            x2="0"
            y2="15"
            stroke={theme[`${colors[2]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Left-Bottom Border */}
          <Line
            x1="0"
            y1="15"
            x2="0"
            y2="0"
            stroke={theme[`${colors[0]}Border`] ?? theme.unknown}
            strokeWidth="4"
          />{" "}
          {/* Left-Top Border */}
          {/* Left */}
        </Svg>
        {icon ? (
          <MaterialCommunityIcons name={icon} />
        ) : (
          <Text style={styles.letter} selectable={false}>
            {letter}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyContainer: {
    width: 24,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    position: "absolute",
    fontSize: 18,
    color: "#000",
  },
});
