import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { City } from "@/models/city";
import { useCityListStore } from "@/store/store";
import { router } from "expo-router";

export default function CityListModal() {
  const cityList: City[] = useCityListStore((store) => store.cityList);

  const handleSelect = (city: City) => {
    console.log("====================================");
    console.log(city.name + ", " + city.state);
    console.log("====================================");
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
            <ThemedText>
              {item.name}, {item.state}, {item.country}
            </ThemedText>
            {/* Adjust based on your city object structure */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ThemedText>No cities found</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
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
    height: 40,
    padding: 10,
    backgroundColor: "#3300FF",
    marginBottom: 10,
  },
});
