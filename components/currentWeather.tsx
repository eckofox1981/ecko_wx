import { getWeather } from "@/api/getWeather";
import { City } from "@/models/city";
import { useMainCityStore } from "@/store/cityStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "./themed-icon";
import { ThemedText } from "./themed-text";

export function CurrentWeather() {
  const city = useMainCityStore((store) => store.mainCity);
  const currentWeather = useCurrentWeatherStore(
    (store) => store.currentWeather
  );
  const setCurrentWeather = useCurrentWeatherStore(
    (store) => store.setCurrentWeather
  );

  const isCityState = (item: City) => {
    useEffect(() => {
      const upDateWeather = async () => {
        const weather = await getWeather(city, "en");
        return weather;
      };

      upDateWeather().then(setCurrentWeather);

      console.log("====================================");
      console.log(currentWeather);
      console.log("====================================");
    }, [city]);

    if (item.state === undefined) {
      return ", ";
    }

    return ", " + item.state + ", ";
  };

  return (
    <View style={styles.main}>
      <ThemedText style={styles.cityName}>
        {city.name}
        {isCityState(city)}
        {city.country}
      </ThemedText>
      <View style={styles.weatherContainer}>
        <View style={styles.leftContainer}>
          <Image
            style={{ flex: 1, resizeMode: "contain" }}
            source={{
              uri: "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-256.png",
            }}
          />
          <TouchableOpacity style={styles.bookmark}>
            <ThemedIcon size={40} name="heart.fill" />
            <ThemedText style={styles.bookmarkText}>
              Bookmark{"\n"}city
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <ThemedText>Temp: 27*C</ThemedText>
          <ThemedText>Feels like 27*C</ThemedText>
          <ThemedText>Clear sky</ThemedText>
          <ThemedText>Gentle breeze</ThemedText>
          <ThemedText>5.1 m/s ENE</ThemedText>
          <ThemedText>1017 hPa</ThemedText>
          <ThemedText>Humdity: 38%</ThemedText>
          <ThemedText>UV: 3</ThemedText>
          <ThemedText>Dew point: 12*C</ThemedText>
          <ThemedText>Visibility: 10 km</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    width: "95%",
    padding: 10,
    borderBottomColor: "#3300FF",
    borderBottomWidth: 2,
  },
  weatherContainer: {
    flexDirection: "row",
    gap: 5,
  },
  cityName: {
    fontWeight: 600,
    fontSize: 20,
  },
  leftContainer: {
    width: "50%",
  },
  rightContainer: {
    width: "50%",
    paddingLeft: 10,
  },
  bookmark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "flex-start",
  },
  bookmarkText: {
    flex: 1,
  },
});
