import { StyleSheet, View } from "react-native";

import { useGameSelector } from "@/store";
import { selectGameStats } from "@/store/statsSlice";
import { ThemedText } from "./ThemedText";
import { StatsRow } from "./StatsRow";

interface IProps {
  numberOfGames: number;
  title: string;
}

export function SingleGameStats(props: IProps) {
  const { numberOfGames, title } = props;

  const stats = useGameSelector((state) =>
    selectGameStats(state, numberOfGames),
  );

  const { finishCounts, ...rest } = stats;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading}>{title}</ThemedText>
      <StatsRow stats={rest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold" },
});
