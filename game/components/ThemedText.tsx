import { memo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

export const ThemedText = memo(function ThemedText(props: TextProps) {
  const { style, ...rest } = props;

  const combinedStyles = StyleSheet.flatten([styles.text, style]);
  return <Text style={combinedStyles} {...rest} />;
});

const styles = StyleSheet.create({
  text: {
    fontFamily: "Nunito_400Regular",
  },
});
