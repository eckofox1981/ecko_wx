import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { City } from "@/models/city";
import { useCityListStore, useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { router } from "expo-router";

/**
 * displays when user searches for city.
 * @returns A clickable list of city with the same name but different country/state (or both)
 */
export default function CityListModal() {
  const cityList: City[] = useCityListStore((store) => store.cityList);
  const setMainCity = useMainCityStore((store) => store.setMainCity);
  const language = useLanguageStore((store) => store.language);
  const handleSelect = (city: City) => {
    setMainCity(city);
    router.push("/");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Choose your city</ThemedText>
      <FlatList
        data={cityList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.city}
            onPress={() => handleSelect(item)}
          >
            <ThemedText>{cityNameFormating(item)}</ThemedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <ThemedText>{language.noCityFound}.</ThemedText>
          </TouchableOpacity>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    maxWidth: "95%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: "auto",
  },
  title: {
    fontWeight: 800,
    marginBottom: 20,
  },
  city: {
    minHeight: 40,
    padding: 10,
    backgroundColor: "#3300FF",
    marginBottom: 10,
  },
});
