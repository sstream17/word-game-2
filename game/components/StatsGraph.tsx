import { StyleSheet, View } from "react-native";
import { BarChart, IChartData } from "./BarChart";

interface IProps {
  numberOfGames: number;
  finishCounts: Record<number, number>;
  maxWidth: number;
}

export function StatsGraph(props: IProps) {
  const { numberOfGames, finishCounts, maxWidth } = props;

  const data = Object.keys(finishCounts).reduce(
    (acc, key) => {
      if (key === "6") {
        acc.labels.push("L");
      } else {
        acc.labels.push(`${+key + numberOfGames}`);
      }
      acc.data.push(finishCounts[`${+key}`]);
      return acc;
    },
    { labels: [], data: [] } as IChartData,
  );

  return (
    <View style={styles.container}>
      <BarChart data={data} width={maxWidth} height={400} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { fontSize: 24, fontWeight: "bold" },
});
