import { Platform, StyleSheet, View } from "react-native";

import { nativeApplicationVersion } from "expo-application";
import Constants from "expo-constants";
import { ThemedText } from "./ThemedText";

export function VersionInfo() {
  const version =
    Platform.OS === "web"
      ? Constants.expoConfig?.version
      : nativeApplicationVersion;

  return version ? (
    <View>
      <ThemedText
        className="bg-[--color-background]"
        style={styles.versionInfo}
      >{`v${version}`}</ThemedText>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  versionInfo: {
    position: "absolute",
    bottom: 4,
    right: 4,
  },
});
