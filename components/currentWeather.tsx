import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { getWeather } from "@/api/getWeather";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { City } from "@/models/city";
import { useFavoriteCitiesStore, useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useTempUnitStore } from "@/store/tempUnitStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { timeFormating } from "@/utilities/timeFormating";
import Feather from "@expo/vector-icons/Feather";
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

/**
 * fetches current weather for active city sets as globalstate
 * checks screendimension an add/removes data accordingly
 * responsiveness function named with  [functionName]568
 * @returns a summarized version of the current weather for the active city
 */
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
  const tempUnits = useTempUnitStore((store) => store.tempUnit);
  const screenSize: { height: number; width: number } =
    Dimensions.get("window");

  useEffect(() => {
    const upDateWeather = async () => {
      const weather = await getWeather(city, `${language.id}`, tempUnits);
      return weather;
    };

    upDateWeather()
      .then(setCurrentWeather)
      .catch((error: string) =>
        Alert.alert(language.couldNotFetchWeather, error)
      );
  }, [city, language, tempUnits]);

  /**
   * saves city to favorite list in localstorage and globalstate
   * checks first for duplicate, if duplicate: Alerts user and cancel function
   * @returns Alert to confirm city saved
   */
  const addToFavorite = async () => {
    const jsonString = await AsyncStorage.getItem("cities");
    const json: any[] = jsonString ? JSON.parse(jsonString) : [];
    const currentCityList: City[] = json.map(
      (city) =>
        new City(city.name, city.lat, city.lon, city.country, city.state)
    );

    const isDuplicate = currentCityList.some(
      //NOTES ON some():checks whether at least one element in an array meets a certain condition, returns a boolean (med predicate)
      (c) =>
        c.name === city.name &&
        c.lat === city.lat &&
        c.lon === city.lon &&
        c.country === city.country &&
        c.state === city.state
    );

    if (isDuplicate) {
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

  // display rains data if it exists or screen height is more than 600
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

  //for small screens space is save by not displaying sunrise/sunset
  const sunrise_sunset568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <View>
        <View style={styles.sunsriseContainer}>
          <Feather name="sunrise" size={24} color="orange" />
          <ThemedText style={styles.sunrise}>
            {timeFormating(currentWeather.sysSunrise)}
          </ThemedText>
        </View>
        <View style={styles.sunsriseContainer}>
          <Feather name="sunset" size={24} color="blue" />
          <ThemedText style={styles.sunrise}>
            {timeFormating(currentWeather.sysSunset)}
          </ThemedText>
        </View>
      </View>
    );
  };

  //for small screens space is save simplifying bookmark button
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

  //for small screens space is save adjusting icon size
  const iconSize = () => {
    if (screenSize.height <= 568) {
      return 50;
    }
    return 100;
  };

  //for small screens space is save by not displaying "feels like" temperature
  const feelLike568 = () => {
    if (screenSize.height <= 568) {
      return;
    }
    return (
      <ThemedText>
        {language.feelsLike}: {currentWeather.mainFeels_like}
      </ThemedText>
    );
  };

  //for small screens space is save by not displaying pressure
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

  //for small screens space is save by not displaying visbility
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
            {language.temp}: {currentWeather.mainTemp}
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
    marginTop: 2,
  },
  bookmarkText: {
    color: "#d2d2d2ff",
  },
  description: {
    margin: "auto",
    textTransform: "capitalize",
    fontWeight: 600,
    textAlign: "center",
  },
  sunsriseContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 5,
  },
  sunrise: {
    fontStyle: "italic",
    textAlign: "justify",
    alignSelf: "center",
  },
});
