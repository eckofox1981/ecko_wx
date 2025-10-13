import { getForecast } from "@/api/getWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { ForecastFeed } from "@/components/forecastFeed";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useTempUnitStore } from "@/store/tempUnitStore";
import { useForecastStore } from "@/store/weatherStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const setForecast = useForecastStore((store) => store.setForecast);
  const city = useMainCityStore((store) => store.mainCity);
  const tempUnit = useTempUnitStore((store) => store.tempUnit);
  const setTempUnit = useTempUnitStore((store) => store.setTempUnit);
  const language = useLanguageStore((store) => store.language);

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

  useEffect(() => {
    const checkTempUnit = async () => {
      const localTempUnit = await AsyncStorage.getItem("tempUnit");
      if (!localTempUnit) {
        return "celsius";
      }

      return localTempUnit;
    };
    checkTempUnit()
      .then(setTempUnit)
      .catch((err) => {
        Alert.alert(language.error, "Could not set temperature unit. " + err); // catch is theoreticcaly redundant because of if-statement above
      });
  }, []);

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
