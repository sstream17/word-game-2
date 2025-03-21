import { StyleSheet, View } from "react-native";

import { ThemedText } from "./ThemedText";

interface IStats {
  gamesPlayed: number;
  gamesWon: number;
  currentWinStreak: number;
  maxWinStreak: number;
  sumOfFinishes: number;
}

interface IProps {
  stats: IStats;
}

export function StatsRow(props: IProps) {
  const { stats } = props;

  const {
    gamesPlayed,
    gamesWon,
    sumOfFinishes,
    currentWinStreak,
    maxWinStreak,
  } = stats;

  const winPercentage = gamesPlayed !== 0 ? (gamesWon / gamesPlayed) * 100 : 0;
  const averageGuess = gamesPlayed !== 0 ? sumOfFinishes / gamesPlayed : 0;

  return (
    <View style={styles.container}>
      <View style={styles.singleStat}>
        <ThemedText>Played</ThemedText>
        <ThemedText>{gamesPlayed}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText>Won</ThemedText>
        <ThemedText>{`${+winPercentage.toFixed(2)}%`}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText>Avg Guess</ThemedText>
        <ThemedText>{+averageGuess.toFixed(2)}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText>Streak</ThemedText>
        <ThemedText>{currentWinStreak}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText>Max Streak</ThemedText>
        <ThemedText>{maxWinStreak}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 32,
    textAlign: "center",
  },
  singleStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
