import { Platform, StyleSheet, Text, type TextProps } from "react-native";

export function ThemedText(props: TextProps) {
  const { style, ...rest } = props;
  return <Text style={[style, styles.text]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: "Nunito_400Regular",
      ios: "Nunito-Regular",
    }),
  },
});
