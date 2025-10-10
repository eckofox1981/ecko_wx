import { FlatList, StyleSheet, View } from "react-native";

import { FavoriteCard } from "@/components/favoriteCard";
import { ThemedText } from "@/components/themed-text";
import { City } from "@/models/city";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    const getFavorites = async () => {
      const jsonString = await AsyncStorage.getItem("cities");
      const json: any[] = jsonString ? JSON.parse(jsonString) : [];

      if (json.length === 0) {
        return [];
      } else {
        return json.map(
          (city) =>
            new City(city.name, city.lat, city.lon, city.country, city.state)
        );
      }
    };
    getFavorites().then(setCities);
  });

  return (
    <View style={styles.main}>
      <ThemedText style={styles.title}>Favorites</ThemedText>

      <FlatList
        data={cities}
        keyExtractor={(item) => `${item.lat}-${item.lon}`}
        renderItem={({ item }) => <FavoriteCard city={item} />}
        ListEmptyComponent={
          <ThemedText style={styles.noCities}>
            No cities added to favorites
          </ThemedText>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontWeight: 800,
    alignSelf: "center",
  },
  noCities: {
    alignSelf: "center",
    marginTop: "25%",
    fontSize: 20,
  },
});
