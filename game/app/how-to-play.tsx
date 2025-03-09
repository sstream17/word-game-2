import GradientBackgroundView from "@/components/GradientBackgroundView";
import { StyleSheet, Text } from "react-native";

export default function HowToPlay() {
  return (
    <GradientBackgroundView style={styles.container}>
      <Text>How to play</Text>
    </GradientBackgroundView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
