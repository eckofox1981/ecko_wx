import { useLanguageStore } from "@/store/languageStore";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";
import { WindCompass } from "./windCompass";

interface WindProps {
  speed: number;
  degree: number;
  gust: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * displays wind information using WindCompass
 * @param wind information
 * @returns wind data with an arrow pointing in the same direction of the wind.
 */
export function Wind({ speed, degree, gust, style, children }: WindProps) {
  const language = useLanguageStore((store) => store.language);
  return (
    <View style={[styles.container, style]}>
      <WindCompass degree={degree} size={40} />
      <View>
        <ThemedText>
          {language.wind}: {speed}m/s
        </ThemedText>
        <ThemedText>
          {language.gust}: {gust}m/s
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});
