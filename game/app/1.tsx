import { Game } from "@/components/Game";
import {  usePathname } from "expo-router";

export default function GamePage() {
  const pathName = usePathname();

  const number = parseInt(pathName.replace(/\D/g, ''), 10);
  
  return (
    <Game numberOfGames={number} />
  );
}