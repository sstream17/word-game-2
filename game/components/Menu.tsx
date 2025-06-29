import { useCallback, useContext, useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";

import { themes } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import MenuItem from "./MenuItem";
import { ThemeContext } from "./ThemeProvider";

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);

  const { theme } = useContext(ThemeContext);

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
          <MaterialIcons
            className="color-[--color-text]"
            name="more-vert"
            size={24}
          />
        </View>
      </Pressable>
      <Modal transparent visible={isVisible}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View
          className="bg-[--color-menuBackground]"
          style={[styles.modalContent, themes[theme]]}
        >
          <MenuItem
            label="How to play"
            href="/how-to-play"
            icon="info-outline"
            onClick={onClose}
          />
          <MenuItem
            label="Stats"
            href="/stats"
            icon="bar-chart"
            onClick={onClose}
          />
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
});
