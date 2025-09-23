import { useCallback, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";

import StatsIcon from "@/assets/images/chart_icon.svg";
import InfoIcon from "@/assets/images/info_icon.svg";
import MenuIcon from "@/assets/images/menu_icon.svg";
import { themes } from "@/constants/Colors";
import { MenuItem } from "./MenuItem";
import { useThemeContext } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);

  const { theme } = useThemeContext();

  const onOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <Pressable onPress={onOpen}>
        <View style={styles.menuButtonContainer}>
          <MenuIcon className="fill-[--color-text]" />
        </View>
      </Pressable>
      <Modal transparent visible={isVisible}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View
          className="bg-[--color-menuBackground]"
          style={[styles.modalContent, themes[theme]]}
        >
          <ThemeToggle />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    marginHorizontal: 11,
  },
  modalBackdrop: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  modalContent: {
    position: "absolute",
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#00000088",
        shadowRadius: 4,
      },
      web: {
        boxShadow: "0 0 8px #00000088",
      },
      android: {
        elevation: 4,
      },
    }),
    top: 56,
    right: 16,
  },
  themeText: {
    paddingStart: 8,
  },
});
