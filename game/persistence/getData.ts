import { STORAGE_KEY } from "@/constants/storage";
import { IPersistedGameState } from "@/store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData(): Promise<IPersistedGameState | undefined> {
  try {
    const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonData ? JSON.parse(jsonData) : undefined;
  } catch (error) {
    console.error("Error getting data from storage", error);
    return undefined;
  }
}
