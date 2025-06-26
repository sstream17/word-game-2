import { Pressable, StyleSheet } from "react-native";

import { GradientBackgroundView } from "@/components/GradientBackgroundView";
import { ThemedText } from "@/components/ThemedText";
import { VersionInfo } from "@/components/VersionInfo";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <Link href="/1" asChild>
          <Pressable style={styles.gameMode}>
            <ThemedText style={styles.gameModeText}>Classic</ThemedText>
          </Pressable>
        </Link>
        <Link href="/2" asChild>
          <Pressable style={styles.gameMode}>
            <ThemedText style={styles.gameModeText}>Duo</ThemedText>
          </Pressable>
        </Link>
        <Link href="/4" asChild>
          <Pressable style={styles.gameMode}>
            <ThemedText style={styles.gameModeText}>Quad</ThemedText>
          </Pressable>
        </Link>
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
    backgroundColor: Colors.light.exact,
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
