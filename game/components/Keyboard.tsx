import { StyleSheet, View } from "react-native";
import { KeyboardKey } from "./KeyboardKey";

interface IProps {
  updateGuess: (letter: string) => void;
  submitGuess: VoidFunction;
}

export function Keyboard(props: IProps) {
  const { updateGuess, submitGuess } = props;

  return (
    <View style={styles.container}>
      <View style={styles.keyboardRow}>
        {[..."qwertyuiop"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={updateGuess} />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        {[..."asdfghjkl"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={updateGuess} />
        ))}
      </View>
      <View style={styles.keyboardRow}>
        <KeyboardKey
          letter={"backspace"}
          onClick={updateGuess}
          icon="backspace-outline"
        />
        {[..."zxcvbnm"].map((char) => (
          <KeyboardKey key={char} letter={char} onClick={updateGuess} />
        ))}
        <KeyboardKey
          letter={"enter"}
          onClick={submitGuess}
          icon="send-outline"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0000ff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  keyboardRow: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
});
