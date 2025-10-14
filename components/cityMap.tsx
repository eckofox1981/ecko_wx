import { City } from "@/models/city";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function CityMap({ city, size }: { city: City; size: number }) {
  return (
    <View>
      <MapView
        style={{ width: size, height: size }}
        region={{
          latitude: city.lat,
          longitude: city.lon,
          latitudeDelta: 2.25,
          longitudeDelta: 2.25,
        }}
      >
        <Marker
          coordinate={{ latitude: city.lat, longitude: city.lon }}
          anchor={{ x: 0.1, y: 0.1 }} //if not anchored, the marker doesn't center properly (0, 0 doesn't seem to be default value)
        >
          <View style={styles.marker} />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },
});
