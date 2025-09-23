import { StyleSheet } from "react-native";

import { GradientBackgroundView } from "@/components/GradientBackgroundView";
import { Solver } from "@/components/Solver";
import { VersionInfo } from "@/components/VersionInfo";

export default function Index() {
  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <Solver />
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
    gap: 10,
  },
  gameMode: {
    padding: 10,
    borderRadius: 8,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  gameModeText: {
    fontSize: 20,
  },
});
