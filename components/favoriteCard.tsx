import { City } from "@/models/city";
import { useFavoriteCitiesStore, useMainCityStore } from "@/store/cityStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

export function FavoriteCard({ city }: { city: City }) {
  const setCity = useMainCityStore((store) => store.setMainCity);
  const setFavoCities = useFavoriteCitiesStore((store) => store.setFavoCities);

  const goToTown = () => {
    setCity(city);
    router.push("/");
  };

  const deleteCity = async () => {
    Alert.alert(
      "DELETE CITY",
      `You are about to delete ${cityNameFormating(city)}. Are you sure?`,
      [
        {
          text: "DELETE",
          onPress: async () => {
            const jsonString = await AsyncStorage.getItem("cities");
            const json = jsonString ? JSON.parse(jsonString) : [];

            if (json.length === 0) {
              Alert.alert("Error", "Something went wrong.");
              return;
            }

            let cityList: City[] = json.map(
              (c: City) => new City(c.name, c.lat, c.lon, c.country, c.state)
            );

            cityList = cityList.filter((c) => {
              {
                return c.lat !== city.lat && c.lon !== city.lon;
              }
            });

            AsyncStorage.setItem("cities", JSON.stringify(cityList));
            setFavoCities(cityList);
          },
          style: "default",
        },
        {
          text: "ABORT",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={deleteCity}>
        <IconSymbol name="delete.fill" size={40} color={"#c40000ff"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={goToTown}>
        <ThemedText style={styles.name}>{cityNameFormating(city)}</ThemedText>
        <ThemedText style={styles.coordinate}>Lat.: {city.lat}</ThemedText>
        <ThemedText style={styles.coordinate}>Long.: {city.lon}</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 3,
  },
  container: {
    borderColor: "#3300FF",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    flex: 1,
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
