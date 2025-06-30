import { createContext, useContext, useEffect, useRef } from "react";
import { View } from "react-native";

import { themes } from "@/constants/Colors";
import { getData } from "@/persistence/getData";
import { colorScheme as colorSchemeNW, useColorScheme } from "nativewind";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  theme: "light" | "dark";
  isInitialSystemTheme?: boolean;
}>({
  theme: "light",
  isInitialSystemTheme: true,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isInitialSystemTheme = useRef<boolean | undefined>();

  useEffect(() => {
    const getSavedTheme = async () => {
      const data = await getData();
      if (data?.theme) {
        colorSchemeNW.set(data.theme);
        isInitialSystemTheme.current = data.theme === "system";
      }
    };
    getSavedTheme();
  }, []);

  const { colorScheme = "light" } = useColorScheme();

  return (
    <ThemeContext.Provider
      value={{
        theme: colorScheme,
        isInitialSystemTheme: isInitialSystemTheme.current,
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
