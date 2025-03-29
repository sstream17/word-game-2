import { StyleSheet, View } from "react-native";

import Constants from "expo-constants";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export function VersionInfo() {
  const version = Constants.expoConfig?.version;

  return version ? (
    <View>
      <ThemedText style={styles.versionInfo}>{`v${version}`}</ThemedText>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  versionInfo: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: Colors.light.background,
  },
});
