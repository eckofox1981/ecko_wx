import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { AppTitle } from "@/components/appTitle";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLanguageStore } from "@/store/languageStore";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const language = useLanguageStore((store) => store.language);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => <AppTitle />,
          }}
        />
        <Stack.Screen
          name="cityListModal"
          options={{ presentation: "modal", title: language.chooseYourCity }}
        />
        <Stack.Screen
          name="currentWeatherModal"
          options={{ presentation: "modal", title: language.currentWeather }}
        />
        <Stack.Screen
          name="forecastModal"
          options={{ presentation: "modal", title: language.forecast }}
        />
      </Stack>
    </ThemeProvider>
  );
}
