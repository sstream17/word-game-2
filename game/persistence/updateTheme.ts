import { STORAGE_KEY } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./getData";

export async function updateTheme(newTheme: "light" | "dark" | "system") {
  try {
    const previousData = await getData();

    const data = { ...previousData };
    data.theme = newTheme;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing updated theme", error);
  }
}
