import { getCityList } from "@/api/getCities";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useCityListStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

/**
 * text input for user to search for cities
 * navigates (router.push) to cityListModal
 * @returns
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const setCityList = useCityListStore((store) => store.setCityList);
  const language = useLanguageStore((store) => store.language);

  const handlePress = () => {
    getCityList(query).then(setCityList);
    setQuery("");
    router.push("/cityListModal");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={language.searchyourcity}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handlePress}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={handlePress}>
        <IconSymbol size={50} name="search.fill" color={"#585858ff"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#d2d2d2ff",
    borderRadius: 25,
    height: 50,
    width: "90%",
    paddingHorizontal: 25,
    fontSize: 20,
  },
  searchIcon: {
    position: "absolute",
    right: 5,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
});
