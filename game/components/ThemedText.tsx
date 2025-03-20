import { memo } from "react";
import { Platform, StyleSheet, Text, type TextProps } from "react-native";

export const ThemedText = memo(function ThemedText(props: TextProps) {
  const { style, ...rest } = props;

  const combinedStyles = StyleSheet.flatten([style, styles.text]);
  return <Text style={combinedStyles} {...rest} />;
});

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: "Nunito_400Regular",
      ios: "Nunito-Regular",
    }),
  },
});
