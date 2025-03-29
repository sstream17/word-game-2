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
  maxWidth: number;
}

export function StatsRow(props: IProps) {
  const { stats, maxWidth } = props;

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
    <View style={[styles.container, { width: maxWidth }]}>
      <View style={styles.singleStat}>
        <ThemedText className="text-center">Played</ThemedText>
        <ThemedText className="text-center">{gamesPlayed}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText className="text-center">Won</ThemedText>
        <ThemedText className="text-center">{`${+winPercentage.toFixed(2)}%`}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText className="text-center">Avg Guess</ThemedText>
        <ThemedText className="text-center">
          {+averageGuess.toFixed(2)}
        </ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText className="text-center">Streak</ThemedText>
        <ThemedText className="text-center">{currentWinStreak}</ThemedText>
      </View>
      <View style={styles.singleStat}>
        <ThemedText className="text-center">Max Streak</ThemedText>
        <ThemedText className="text-center">{maxWinStreak}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 8,
    gap: 8,
  },
  singleStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
});
