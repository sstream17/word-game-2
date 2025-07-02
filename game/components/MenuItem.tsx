import { FC, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Href, Link } from "expo-router";
import { SvgProps } from "react-native-svg";
import { ThemedText } from "./ThemedText";

interface IProps {
  label: string;
  icon: FC<SvgProps>;
  href?: Href;
  onClick?: VoidFunction;
}

export const MenuItem = (props: IProps) => {
  const { label, icon: Icon, href, onClick } = props;

  const button = useMemo(() => {
    return (
      <Pressable onPress={onClick}>
        <View style={styles.menuItem}>
          <Icon className="fill-[--color-text]" width={24} height={24} />
          <ThemedText>{label}</ThemedText>
        </View>
      </Pressable>
    );
  }, [Icon, label, onClick]);

  return href ? (
    <>
      <Link href={href} asChild>
        {button}
      </Link>
    </>
  ) : (
    <>{button}</>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
});
