import { createContext, useContext, useEffect } from "react";
import { View } from "react-native";

import { themes } from "@/constants/Colors";
import { getData } from "@/persistence/getData";
import { colorScheme as colorSchemeNW, useColorScheme } from "nativewind";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
}>({
  theme: "light",
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    const getSavedTheme = async () => {
      const data = await getData();
      if (data?.theme) {
        colorSchemeNW.set(data.theme);
      }
    };
    getSavedTheme();
  }, []);

  const { colorScheme = "light" } = useColorScheme();

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
      }}
    >
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
