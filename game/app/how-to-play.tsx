import { StyleSheet } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { ThemedText } from "@/components/ThemedText";
import { VersionInfo } from "@/components/VersionInfo";

export default function HowToPlay() {
  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <ThemedText>How to play</ThemedText>
      </GradientBackgroundView>
      <VersionInfo />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
