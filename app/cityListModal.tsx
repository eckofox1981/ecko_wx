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
      <ThemedText>Choose your city</ThemedText>
      <FlatList
        data={cityList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
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
  title: {},
});
