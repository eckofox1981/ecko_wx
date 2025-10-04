import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { City } from "@/models/city";
import { useCityListStore, useMainCityStore } from "@/store/cityStore";
import { router } from "expo-router";

export default function CityListModal() {
  const cityList: City[] = useCityListStore((store) => store.cityList);
  const setMainCity = useMainCityStore((store) => store.setMainCity);

  const handleSelect = (city: City) => {
    setMainCity(city);
    router.push("/");
  };

  const isCityState = (item: City) => {
    if (item.state === undefined) {
      return ", ";
    }

    return ", " + item.state + ", ";
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
            <ThemedText>
              {item.name}
              {isCityState(item)}
              {item.country}
            </ThemedText>
            {/* Adjust based on your city object structure */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <TouchableOpacity
            onPress={() => {
              router.push("/");
            }}
          >
            <ThemedText>No cities found (tap to return)</ThemedText>
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
