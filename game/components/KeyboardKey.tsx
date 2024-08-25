import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
  letter: string;
  onClick: (letter: string) => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export function KeyboardKey(props: IProps) {
  const { letter, icon, onClick: updateGuess } = props;

  return (
    <Pressable onPress={() => updateGuess(letter)}>
      <View style={styles.keyContianer}>
        {icon ? (
          <MaterialCommunityIcons name={icon} />
        ) : (
          <Text selectable={false}>{letter}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyContianer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 30,
    backgroundColor: "#fff",
  },
});
