import { STORAGE_KEY } from "@/constants/storage";
import { IStats } from "@/store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./getData";

export async function updateGameStats(
  newGameStats: IStats,
  numberOfGames: number,
) {
  try {
    const previousData = await getData();

    const data = { ...previousData };
    data.stats = data.stats ?? { value: {} };
    data.stats.value[numberOfGames] = newGameStats;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing updated game progress", error);
  }
}
