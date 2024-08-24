import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
      <Button title="menu" onPress={onOpen} />
      <Modal transparent visible={isVisible}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.fullScreen} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Link href="/how-to-play" asChild>
            <Pressable>
              <Text>How to play</Text>
            </Pressable>
          </Link>
          <Link href="/stats" asChild>
            <Pressable>
              <Text>Stats</Text>
            </Pressable>
          </Link>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%",
  },
  modalContent: {
    height: "25%",
    backgroundColor: "#fff",
    borderRadius: 8,
    position: "absolute",
    top: 16,
    right: 16,
  },
});
