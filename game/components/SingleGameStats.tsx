import { StyleSheet, View } from "react-native";

import { useGameSelector } from "@/store";
import { selectGameStats } from "@/store/statsSlice";
import { ThemedText } from "./ThemedText";
import { StatsRow } from "./StatsRow";
import { StatsGraph } from "./StatsGraph";

interface IProps {
  numberOfGames: number;
  title: string;
  maxWidth: number;
}

export function SingleGameStats(props: IProps) {
  const { numberOfGames, title, maxWidth } = props;

  const stats = useGameSelector((state) =>
    selectGameStats(state, numberOfGames),
  );

  const { finishCounts, ...rest } = stats;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading}>{title}</ThemedText>
      <StatsRow stats={rest} maxWidth={maxWidth} />
      <StatsGraph
        numberOfGames={numberOfGames}
        finishCounts={finishCounts}
        maxWidth={maxWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  heading: { fontSize: 24, fontWeight: "bold" },
});
