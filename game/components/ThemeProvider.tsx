import { createContext, useContext } from "react";
import { View } from "react-native";

import { themes } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({
  theme: "light",
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme = "light" } = useColorScheme();

  return (
    <ThemeContext.Provider value={{ theme: colorScheme }}>
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
