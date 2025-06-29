import { Pressable, StyleSheet, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { cssInterop } from "nativewind";
import { ThemedText } from "./ThemedText";

cssInterop(MaterialIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

interface IProps {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  href: Href;
  onClick?: VoidFunction;
}

export default function MenuItem(props: IProps) {
  const { label, icon, href, onClick } = props;

  return (
    <Link href={href} asChild>
      <Pressable onPress={onClick}>
        <View style={styles.menuItem}>
          <MaterialIcons
            className="color-[--color-text]"
            name={icon}
            size={16}
          />
          <ThemedText>{label}</ThemedText>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
});
