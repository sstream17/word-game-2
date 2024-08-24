import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";


export function Keyboard() {

    return <View style={styles.container}>
        <ThemedText>Keyboard</ThemedText>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        display: 'flex',
      backgroundColor: '#0000ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });