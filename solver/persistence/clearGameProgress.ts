import { STORAGE_KEY } from "@/constants/storage";
import { initialGamesState } from "@/store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./getData";

export async function clearGameProgress(numberOfGames: number) {
  try {
    const previousData = await getData();

    const data = { ...previousData };
    data.games = data.games || {};
    data.games[numberOfGames] = initialGamesState;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error clearing game progress", error);
  }
}
