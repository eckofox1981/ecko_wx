import { City } from "@/models/city";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";

export function FavoriteCard({ city }: { city: City }) {
  return (
    <TouchableOpacity style={styles.container}>
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
    padding: 5,
  },
  name: {
    fontWeight: 600,
    alignSelf: "flex-start",
  },
  coordinate: {
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
});
