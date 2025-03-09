import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { IHints, KeyStatus } from "@/types/game";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyBackground } from "./KeyBackground";

interface IProps {
  letter: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  hints?: { [gameId: string]: IHints };
  onClick: (letter: string) => void;
}

function getLetterColors(
  letter: string,
  hints?: { [gameId: string]: IHints },
): KeyStatus[] {
  if (!hints) {
    return ["unknown", "unknown", "unknown", "unknown"];
  }

  return Object.keys(hints).map((gameId) => hints[gameId][letter]);
}

export function KeyboardKey(props: IProps) {
  const { letter, icon, hints, onClick: updateGuess } = props;

  const theme = Colors["light"];
  const colors = getLetterColors(letter, hints);

  return (
    <Pressable onPress={() => updateGuess(letter)}>
      <View style={styles.keyContainer}>
        <KeyBackground width={24} height={30} colors={colors} theme={theme} />
        {icon ? (
          <MaterialCommunityIcons style={styles.letter} name={icon} />
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
    textAlign: "center",
    fontSize: 18,
    color: "#000",
  },
});
