import { Pressable, StyleSheet } from "react-native";

import GradientBackgroundView from "@/components/GradientBackgroundView";
import { ThemedText } from "@/components/ThemedText";
import { VersionInfo } from "@/components/VersionInfo";
import { Link } from "expo-router";

export default function Index() {
  return (
    <>
      <GradientBackgroundView style={styles.container}>
        <Link href="/1" asChild>
          <Pressable>
            <ThemedText>Classic</ThemedText>
          </Pressable>
        </Link>
        <Link href="/2" asChild>
          <Pressable>
            <ThemedText>Duo</ThemedText>
          </Pressable>
        </Link>
        <Link href="/4" asChild>
          <Pressable>
            <ThemedText>Quad</ThemedText>
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
});
