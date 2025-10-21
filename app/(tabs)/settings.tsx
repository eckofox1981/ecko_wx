import { english, french, swedish } from "@/assets/languages/languages";
import { ThemedText } from "@/components/themed-text";
import { Language } from "@/models/languages";
import { useLanguageStore } from "@/store/languageStore";
import { useTempUnitStore } from "@/store/tempUnitStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, View } from "react-native";

/**
 * user can here set its setting preference:
 *  - temperature unit (Celsius or Farenheit)
 *  - language (english, french, swedish)
 * preferences are saved in localstorage for next use of the app
 * @returns settings tab
 */
export default function Settings() {
  const setLanguage = useLanguageStore((store) => store.setLanguage);
  const language = useLanguageStore((store) => store.language);
  const tempUnit = useTempUnitStore((store) => store.tempUnit);
  const setTempUnit = useTempUnitStore((store) => store.setTempUnit);
  const englishSelected: Language = english;
  const frenchSelected: Language = french;
  const swedishSelected: Language = swedish;

  const languageSelection = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem("language", lang.id);
  };

  const saveTempUnit = async (tempUnit: string) => {
    setTempUnit(tempUnit);
    await AsyncStorage.setItem("tempUnit", tempUnit);
  };

  const languageButtonsColor = (key: string) => {
    if (language.id === key) {
      return "orange";
    }
    return "blue";
  };

  const tempUnitButonsColor = (unit: string) => {
    if (tempUnit === unit) {
      return "orange";
    }
    return "blue";
  };

  return (
    <View style={styles.main}>
      <ThemedText style={styles.title}>{language.settings}</ThemedText>
      <View style={styles.selection}>
        <ThemedText style={styles.text}>{language.temperatures}: </ThemedText>
        <View style={{ gap: 5 }}>
          <Button
            title="Celsius"
            color={tempUnitButonsColor("celsius")}
            onPress={() => saveTempUnit("celsius")}
          />
          <Button
            title="Farenheit"
            color={tempUnitButonsColor("farenheit")}
            onPress={() => saveTempUnit("farenheit")}
          />
        </View>
      </View>
      <View style={styles.selection}>
        <ThemedText style={styles.text}>{language.language}: </ThemedText>
        <View style={{ gap: 5 }}>
          <Button
            title="English"
            color={languageButtonsColor("en")}
            onPress={() => {
              languageSelection(englishSelected);
            }}
          />
          <Button
            title="Français"
            color={languageButtonsColor("fr")}
            onPress={() => {
              languageSelection(frenchSelected);
            }}
          />
          <Button
            key={"se"}
            title="Svenska"
            color={languageButtonsColor("se")}
            onPress={() => {
              languageSelection(swedishSelected);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 800,
    fontSize: 20,
    alignSelf: "center",
    margin: 10,
  },
  text: {
    fontWeight: 600,
  },
  main: {
    padding: 5,
    marginHorizontal: "auto",
  },
  selection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#3300FF",
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: "95%",
  },
});
