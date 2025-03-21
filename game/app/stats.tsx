import { StyleSheet } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { ThemedText } from "@/components/ThemedText";
import { useGameSelector } from "@/store";
import { selectGameStats } from "@/store/statsSlice";

export default function Stats() {
  const statsClassic = useGameSelector((state) => selectGameStats(state, 1));
  const statsDuo = useGameSelector((state) => selectGameStats(state, 2));
  const statsQuad = useGameSelector((state) => selectGameStats(state, 4));

  return (
    <GradientBackgroundView style={styles.container}>
      <ThemedText>Classic</ThemedText>
      <ThemedText>{JSON.stringify(statsClassic)}</ThemedText>
      <ThemedText>Duo</ThemedText>
      <ThemedText>{JSON.stringify(statsDuo)}</ThemedText>
      <ThemedText>Quad</ThemedText>
      <ThemedText>{JSON.stringify(statsQuad)}</ThemedText>
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
