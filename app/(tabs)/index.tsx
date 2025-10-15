import { getForecast } from "@/api/getWeather";
import { english } from "@/assets/languages/languages";
import { CurrentWeather } from "@/components/currentWeather";
import { ForecastFeed } from "@/components/forecastFeed";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useTempUnitStore } from "@/store/tempUnitStore";
import { useForecastStore } from "@/store/weatherStore";
import { languageGetter } from "@/utilities/languageGetter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

/**
 * upon mounting relevant data is gathered and set as globalstate (zustand):
 *  - language preference
 *  - temperature unit preference
 * current weather is fetch in its own component (saved in global state)
 * forecast are fetch as globalstate here and displayed as ForecastCard in Forecastfeed.
 * @returns HomeScreen displaying currentWeather for selected city (default paris) and forecast summary adapted to screen size
 */
export default function HomeScreen() {
  const setForecast = useForecastStore((store) => store.setForecast);
  const city = useMainCityStore((store) => store.mainCity);
  const tempUnit = useTempUnitStore((store) => store.tempUnit);
  const setTempUnit = useTempUnitStore((store) => store.setTempUnit);
  const language = useLanguageStore((store) => store.language);
  const setLanguage = useLanguageStore((store) => store.setLanguage);

  useEffect(() => {
    const checkTempUnit = async () => {
      const localTempUnit = await AsyncStorage.getItem("tempUnit");
      if (!localTempUnit) {
        return "celsius";
      }

      return localTempUnit;
    };

    const checkLanguage = async () => {
      const localLanguageId = await AsyncStorage.getItem("language");
      if (!localLanguageId) {
        return english;
      }

      return languageGetter(localLanguageId);
    };

    checkTempUnit()
      .then(setTempUnit)
      .catch((err) => {
        Alert.alert(language.error, "Could not set temperature unit. " + err); // catch is theoreticcaly redundant because of if-statement above
      });

    checkLanguage()
      .then(setLanguage)
      .catch((err) => {
        Alert.alert(language.error, "Could not set language. " + err); // catch is theoreticcaly redundant because of if-statement above
      });
  }, []);

  useEffect(() => {
    const fetchForeCast = async () => {
      const newForecast = await getForecast(city, language.id, tempUnit);
      return newForecast;
    };

    fetchForeCast()
      .then(setForecast)
      .catch((error: string) =>
        Alert.alert(`${language.couldNotFetchForecast}!`, error)
      );
  }, [city, language, tempUnit]);

  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
      <ForecastFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
