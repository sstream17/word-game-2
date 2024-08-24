import { MaterialIcons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
          <MaterialIcons name={icon} size={16} />
          <Text>{label}</Text>
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
