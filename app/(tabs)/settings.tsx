import { ThemedText } from "@/components/themed-text";
import { useLanguageStore } from "@/store/languageStore";
import { Button, StyleSheet, View } from "react-native";

export default function Settings() {
  const setLanguage = useLanguageStore((store) => store.setLanguage);
  const language = useLanguageStore((store) => store.language);

  return (
    <View style={styles.main}>
      <ThemedText style={styles.title}>Settings</ThemedText>
      <View style={styles.selection}>
        <ThemedText style={styles.text}>Temperature units: </ThemedText>
        <View style={{ gap: 5 }}>
          <Button title="Celsius" />
          <Button title="Farenheit" />
        </View>
      </View>
      <View style={styles.selection}>
        <ThemedText style={styles.text}>Languages: </ThemedText>
        <View style={{ gap: 5 }}>
          <Button title="English" />
          <Button title="Français" />
          <Button title="Svenska" />
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
