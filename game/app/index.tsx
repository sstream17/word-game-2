import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Link href="/1" asChild>
      <Pressable>
        
      <Text>Classic</Text>
      </Pressable>
      </Link>
      <Link href="/2" asChild>
      <Pressable>
        
      <Text>Duo</Text>
      </Pressable>
      </Link>
      <Link href="/4" asChild>
      <Pressable>
        
      <Text>Quad</Text>
      </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});