import { StyleSheet, Text } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";

export default function HowToPlay() {
  return (
    <GradientBackgroundView style={styles.container}>
      <Text>Stats</Text>
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
