import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { getWeather } from "@/api/getWeather";
import { City } from "@/models/city";
import { useMainCityStore } from "@/store/cityStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "./themed-icon";
import { ThemedText } from "./themed-text";
import { Wind } from "./wind";

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

  const rain = (rain: number | null) => {
    if (rain === 0 || rain === undefined || rain === null) {
      return;
    }
    return <ThemedText>Rain last hour: {window.Math.floor(rain)}mm</ThemedText>;
  };
  const snow = (snow: number | null) => {
    if (snow === 0 || snow === undefined || snow === null) {
      return;
    }
    return <ThemedText>Snow last hour: {window.Math.floor(snow)}mm</ThemedText>;
  };

  return (
    <View style={styles.main}>
      <ThemedText style={styles.cityName}>
        {city.name}
        {isCityState(city)}
        {city.country}
      </ThemedText>
      <ThemedText style={styles.sunrise}>
        Time: {currentWeather.dt.getHours()}:{currentWeather.dt.getMinutes()}
      </ThemedText>
      <View style={styles.weatherContainer}>
        <View style={styles.leftContainer}>
          <Image
            style={{ flex: 1, resizeMode: "contain", minHeight: 100 }}
            source={{
              uri: GET_WEATHER_ICON_URL(currentWeather.weatherIcon),
            }}
          />
          <ThemedText style={styles.description}>
            {currentWeather.weatherDescription}
          </ThemedText>
          <ThemedText style={styles.sunrise}>
            Sunrise: {currentWeather.sysSunrise.getHours()}:
            {currentWeather.sysSunrise.getMinutes()}
          </ThemedText>
          <ThemedText style={styles.sunrise}>
            Sunset: {currentWeather.sysSunset.getHours()}:
            {currentWeather.sysSunset.getMinutes()}
          </ThemedText>
          <TouchableOpacity style={styles.bookmark}>
            <ThemedIcon size={40} name="heart.fill" />
            <Text style={styles.bookmarkText}>Bookmark{"\n"}city</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightContainer}>
          <ThemedText>Temp: {currentWeather.mainTemp}°C</ThemedText>
          <ThemedText>Feels like: {currentWeather.mainFeels_like}°C</ThemedText>
          <Wind
            speed={currentWeather.windSpeed}
            degree={currentWeather.windDeg}
            gust={currentWeather.windGust}
          />
          {rain(currentWeather.rain1h)}
          <ThemedText>Press.: {currentWeather.mainPressure} hPa</ThemedText>
          <ThemedText>Humidity: {currentWeather.mainHumidity}%</ThemedText>
          <ThemedText>
            Visibility:{" "}
            {window.Math.floor(currentWeather.visibility / 10) / 100} km
          </ThemedText>
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
    width: "45%",
  },
  rightContainer: {
    width: "55%",
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  bookmark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "hsla(252, 100%, 50%, 0.50)",
    borderRadius: 10,
    width: "100%",
  },
  bookmarkText: {
    color: "#f3f3f3ff",
  },
  description: {
    margin: "auto",
    textTransform: "capitalize",
    fontWeight: 600,
  },
  sunrise: {
    fontStyle: "italic",
    textAlign: "justify",
    alignSelf: "center",
  },
});
