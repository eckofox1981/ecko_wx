import { City } from "@/models/city";
import { useFavoriteCitiesStore, useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { CityMap } from "./cityMap";
import { ThemedText } from "./themed-text";
import { IconSymbol } from "./ui/icon-symbol";

/**
 * a very simple card including city name, state(if exists), country and a zoomed out map marked with a dot
 * @param city
 * @returns FavortieCard (of the city saved in local storage)
 */
export function FavoriteCard({ city }: { city: City }) {
  const setCity = useMainCityStore((store) => store.setMainCity);
  const setFavoCities = useFavoriteCitiesStore((store) => store.setFavoCities);
  const language = useLanguageStore((store) => store.language);

  const goToTown = () => {
    setCity(city);
    router.push("/");
  };

  const deleteCity = async () => {
    Alert.alert(
      language.deleteCity,
      `${language.youReAboutToDelete} ${cityNameFormating(city)}. ${
        language.areYouSure
      }?`,
      [
        {
          text: "DELETE",
          onPress: async () => {
            const jsonString = await AsyncStorage.getItem("cities");
            const json = jsonString ? JSON.parse(jsonString) : [];

            if (json.length === 0) {
              Alert.alert(language.error, language.somethingWentWrong);
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
          text: language.abort,
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
        <View style={styles.nameContainer}>
          <ThemedText style={styles.name}>{city.name},</ThemedText>
          {city?.state && (
            <ThemedText style={styles.name}>{city.state},</ThemedText>
          )}
          <ThemedText style={styles.name}>{city.country}</ThemedText>
        </View>
        <CityMap city={city} size={100} />
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameContainer: {
    justifyContent: "center",
  },
  name: {
    fontWeight: 600,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
