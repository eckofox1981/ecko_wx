import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { getWeather } from "@/api/getWeather";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useFavoriteCitiesStore, useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { timeFormating } from "@/utilities/timeFormating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";
import { Wind } from "./wind";

export function CurrentWeather() {
  const language = useLanguageStore((store) => store.language);
  const city = useMainCityStore((store) => store.mainCity);
  const currentWeather = useCurrentWeatherStore(
    (store) => store.currentWeather
  );
  const setCurrentWeather = useCurrentWeatherStore(
    (store) => store.setCurrentWeather
  );
  const favoCities = useFavoriteCitiesStore((store) => store.favoriteCities);
  const setFavoCities = useFavoriteCitiesStore((store) => store.setFavoCities);
  const screenSize: { height: number; width: number } =
    Dimensions.get("window");

  useEffect(() => {
    const upDateWeather = async () => {
      const weather = await getWeather(city, `${language.id}`);
      return weather;
    };

    upDateWeather()
      .then(setCurrentWeather)
      .catch((error: string) =>
        Alert.alert(language.couldNotFetchWeather, error)
      );
  }, [city, language]);

  const addToFavorite = async () => {
    const jsonString = await AsyncStorage.getItem("cities");
    const json: any[] = jsonString ? JSON.parse(jsonString) : [];
    if (json.includes(city)) {
      Alert.alert(language.duplicateCities, language.YouVelreadyAddedThisCity);
      return;
    }
    const newCityList = [...json, city];

    await AsyncStorage.setItem("cities", JSON.stringify(newCityList))
      .then(() => {
        Alert.alert(
          language.cityAddedToFavorites,
          `${cityNameFormating(city)} ${language.wasAddedToFavorites}.`
        );
      })
      .catch((err) => {
        Alert.alert(
          "ERROR",
          `Could not save city to favorites: ${err.message}`
        );
      });
    setFavoCities(newCityList);
  };

  const rain = (rain: number | null) => {
    if (
      rain === 0 ||
      rain === undefined ||
      rain === null ||
      screenSize.height < 600
    ) {
      return;
    }
    return (
      <ThemedText>
        {language.rainLastHour}: {window.Math.floor(rain)}mm
      </ThemedText>
    );
  };

  const snow = (snow: number | null) => {
    if (
      snow === 0 ||
      snow === undefined ||
      snow === null ||
      screenSize.height < 600
    ) {
      return;
    }
    return <ThemedText>Snow last hour: {window.Math.floor(snow)}mm</ThemedText>;
  };

  const sunrise_sunset568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <View>
        <ThemedText style={styles.sunrise}>
          {language.sunrise}: {timeFormating(currentWeather.sysSunrise)}
        </ThemedText>
        <ThemedText style={styles.sunrise}>
          {language.sunset}: {timeFormating(currentWeather.sysSunset)}
        </ThemedText>
      </View>
    );
  };

  const bookmarkButton568 = () => {
    if (screenSize.height <= 568) {
      return (
        <TouchableOpacity style={styles.bookmark} onPress={addToFavorite}>
          <IconSymbol size={20} name="heart.fill" color={"#d2d2d2ff"} />
          <Text style={styles.bookmarkText}>{language.bookmark}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.bookmark} onPress={addToFavorite}>
        <IconSymbol size={40} name="heart.fill" color={"#d2d2d2ff"} />
        <Text style={styles.bookmarkText}>{language.bookmarkCity}</Text>
      </TouchableOpacity>
    );
  };

  const iconSize = () => {
    if (screenSize.height <= 568) {
      return 50;
    }
    return 100;
  };

  const feelLike568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <ThemedText>
        {language.feelsLike}: {currentWeather.mainFeels_like}°C
      </ThemedText>
    );
  };

  const pressure568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <ThemedText>
        {language.press}.: {currentWeather.mainPressure} hPa
      </ThemedText>
    );
  };

  const visibility568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <ThemedText>
        {language.visibility}:{" "}
        {window.Math.floor(currentWeather.visibility / 10) / 100} km
      </ThemedText>
    );
  };

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        router.push("/currentWeatherModal");
      }}
    >
      <ThemedText style={styles.cityName}>{cityNameFormating(city)}</ThemedText>
      <ThemedText style={styles.sunrise}>
        {language.time}: {timeFormating(currentWeather.dt)}
      </ThemedText>
      <View style={styles.weatherContainer}>
        <View style={styles.leftContainer}>
          <Image
            style={{
              resizeMode: "contain",
              height: iconSize(),
              width: iconSize(),
              backgroundColor: "#3300FF",
              margin: "auto",
              borderRadius: iconSize() / 2,
            }}
            source={{
              uri: GET_WEATHER_ICON_URL(currentWeather.weatherIcon),
            }}
          />
          <ThemedText style={styles.description}>
            {currentWeather.weatherDescription}
          </ThemedText>
          {sunrise_sunset568()}
          {bookmarkButton568()}
        </View>
        <View style={styles.rightContainer}>
          <ThemedText>
            {language.temp}: {currentWeather.mainTemp}°C
          </ThemedText>
          {feelLike568()}
          <Wind
            speed={currentWeather.windSpeed}
            degree={currentWeather.windDeg}
            gust={currentWeather.windGust}
          />
          {rain(currentWeather.rain1h)}
          {pressure568()}
          <ThemedText>
            {language.humidity}: {currentWeather.mainHumidity}%
          </ThemedText>
          {visibility568()}
        </View>
      </View>
    </TouchableOpacity>
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
    alignItems: "center",
  },
  bookmark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#3300FF",
    borderRadius: 10,
    width: "100%",
    maxWidth: 180,
    alignSelf: "center",
  },
  bookmarkText: {
    color: "#d2d2d2ff",
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
