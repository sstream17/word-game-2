import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import MenuItem from "./MenuItem";

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);

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
            name="more-vert"
            size={24}
            style={{ color: "white" }}
          />
        </View>
      </Pressable>
      <Modal transparent visible={isVisible}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.modalContent}>
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
    backgroundColor: "#fff",
    shadowColor: "#00000088",
    shadowRadius: 4,
    borderRadius: 8,
    top: 56,
    right: 16,
  },
});
