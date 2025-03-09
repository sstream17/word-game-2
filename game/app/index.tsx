import GradientBackgroundView from "@/components/GradientBackgroundView";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <GradientBackgroundView style={styles.container}>
      <Link href="/1" asChild>
        <Pressable>
          <Text>Classic</Text>
        </Pressable>
      </Link>
      <Link href="/2" asChild>
        <Pressable>
          <Text>Duo</Text>
        </Pressable>
      </Link>
      <Link href="/4" asChild>
        <Pressable>
          <Text>Quad</Text>
        </Pressable>
      </Link>
    </GradientBackgroundView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
