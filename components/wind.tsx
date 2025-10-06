import { useLanguageStore } from "@/store/languageStore";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { WindCompass } from "./windCompass";

export function Wind({
  speed,
  degree,
  gust,
}: {
  speed: number;
  degree: number;
  gust: number;
}) {
  const language = useLanguageStore((store) => store.language);
  return (
    <View style={styles.container}>
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
