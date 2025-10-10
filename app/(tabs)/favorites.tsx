import { FlatList, StyleSheet, View } from "react-native";

import { FavoriteCard } from "@/components/favoriteCard";
import { ThemedText } from "@/components/themed-text";
import { City } from "@/models/city";
import { useFavoriteCitiesStore } from "@/store/cityStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function Favorites() {
  const favoCities = useFavoriteCitiesStore((store) => store.favoriteCities);
  const setFavoCities = useFavoriteCitiesStore((store) => store.setFavoCities);

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
    getFavorites().then(setFavoCities);
  }, []);

  return (
    <View>
      <ThemedText style={styles.title}>Favorites</ThemedText>
      <FlatList
        data={favoCities}
        keyExtractor={(item) => `${item.lat}-${item.lon}-${Math.random()}`} //TODO: remove Math.random (there to fix duplicate issue)
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
