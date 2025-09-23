import { STORAGE_KEY } from "@/constants/storage";
import { IGamesState } from "@/store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "./getData";

export async function updateGameProgress(
  newGameProgress: IGamesState,
  numberOfGames: number,
) {
  try {
    const previousData = await getData();

    const data = { ...previousData };
    data.games = data.games || {};
    data.games[numberOfGames] = newGameProgress;

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing updated game progress", error);
  }
}
