import { StyleSheet, Text, View } from "react-native";

export default function HowToPlay() {
  return (
    <View style={styles.container}>
      <Text>How to play</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
