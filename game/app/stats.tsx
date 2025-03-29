import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { SingleGameStats } from "@/components/SingleGameStats";
import { getData } from "@/persistence/getData";
import {
  hydrateStats,
  selectIsStatsHydrated,
  useGameDispatch,
  useGameSelector,
} from "@/store";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { VersionInfo } from "@/components/VersionInfo";

const gameModes = [
  ["Classic", 1],
  ["Duo", 2],
  ["Quad", 4],
] as [string, number][];

export default function Stats() {
  const isStatsHydrated = useGameSelector(selectIsStatsHydrated);
  const dispatch = useGameDispatch();

  const { width: screenWidth } = useWindowDimensions();
  const maxWidth = Math.min(screenWidth, 500);

  useEffect(() => {
    // Need to explicitly handle stats hydration since there is no starting reducer to listen to
    const fetchAndHydrateStats = async () => {
      const data = await getData();
      if (data?.stats) {
        dispatch(hydrateStats(data?.stats));
      }
    };

    if (!isStatsHydrated) {
      fetchAndHydrateStats();
    }
  }, [dispatch, isStatsHydrated]);

  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <GestureHandlerRootView style={styles.gameWrapper}>
          <ScrollView
            contentContainerStyle={styles.stats}
            style={styles.scrollArea}
          >
            {gameModes.map(([title, numberOfGames]) => (
              <SingleGameStats
                key={numberOfGames}
                title={title}
                numberOfGames={numberOfGames}
                maxWidth={maxWidth}
              />
            ))}
          </ScrollView>
        </GestureHandlerRootView>
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
  gameWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollArea: {
    height: "100%",
    width: "100%",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: 64,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
