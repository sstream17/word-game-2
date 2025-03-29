import { memo } from "react";
import { Text, type TextProps } from "react-native";

export const ThemedText = memo(function ThemedText(props: TextProps) {
  const { className, ...rest } = props;
  const defaultStyle = "font-nunito text-base";

  return <Text className={`${defaultStyle} ${className}`} {...rest} />;
});
