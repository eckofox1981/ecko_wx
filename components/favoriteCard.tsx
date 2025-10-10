import { City } from "@/models/city";
import { useMainCityStore } from "@/store/cityStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

export function FavoriteCard({ city }: { city: City }) {
  const setCity = useMainCityStore((store) => store.setMainCity);

  const goToTown = () => {
    setCity(city);
    router.push("/");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={goToTown}>
      <ThemedText style={styles.name}>{cityNameFormating(city)}</ThemedText>
      <ThemedText style={styles.coordinate}>Lat.: {city.lat}</ThemedText>
      <ThemedText style={styles.coordinate}>Long.: {city.lon}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderColor: "#3300FF",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontWeight: 600,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  coordinate: {
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
});
