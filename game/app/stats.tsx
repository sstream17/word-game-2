import { StyleSheet } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { SingleGameStats } from "@/components/SingleGameStats";

const gameModes = [
  ["Classic", 1],
  ["Duo", 2],
  ["Quad", 4],
] as [string, number][];

export default function Stats() {
  // https://github.com/indiespirit/react-native-chart-kit?tab=readme-ov-file#bar-chart
  // https://github.com/JesperLekland/react-native-svg-charts?tab=readme-ov-file#barchart

  return (
    <GradientBackgroundView style={styles.container}>
      {gameModes.map(([title, numberOfGames]) => (
        <SingleGameStats
          key={numberOfGames}
          title={title}
          numberOfGames={numberOfGames}
        />
      ))}
    </GradientBackgroundView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
