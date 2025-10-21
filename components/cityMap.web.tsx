import { City } from "@/models/city";
import { StyleSheet, Text, View } from "react-native";

/**
 * @param size (of the square, if other shape needed will have to be updated to width/height)
 * @param city (used for lat/long)
 * @returns a zoomed out map of the city with a red dot pointing out its location
 */
export function CityMap({ city, size }: { city: City; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "darkgrey",
        justifyContent: "space-around",
      }}
    >
      <Text style={styles.text}>Web version does not support map.</Text>
      <Text style={styles.text}>Lat: {Math.floor(city.lat * 1000) / 1000}</Text>
      <Text style={styles.text}>
        Long: {Math.floor(city.lon * 1000) / 1000}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 5,
  },
});
