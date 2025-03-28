import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

import { GradientBackgroundView } from "@/components/GradientBackgroundView";
import { SingleGameStats } from "@/components/SingleGameStats";
import { VersionInfo } from "@/components/VersionInfo";
import { useHeaderHeight } from "@react-navigation/elements";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const gameModes = [
  ["Classic", 1],
  ["Duo", 2],
  ["Quad", 4],
] as [string, number][];

export default function Stats() {
  const { width: screenWidth } = useWindowDimensions();
  const maxWidth = Math.min(screenWidth, 500);

  const headerHeight = useHeaderHeight();

  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <GestureHandlerRootView
          style={[styles.gameWrapper, { marginTop: headerHeight }]}
        >
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
