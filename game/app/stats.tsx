import { StyleSheet } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { ThemedText } from "@/components/ThemedText";

export default function HowToPlay() {
  return (
    <GradientBackgroundView style={styles.container}>
      <ThemedText>Stats</ThemedText>
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
