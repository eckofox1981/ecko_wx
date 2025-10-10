import { getForecast } from "@/api/getWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { ForecastFeed } from "@/components/forecastFeed";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useTempUnitStore } from "@/store/tempUnitStore";
import { useForecastStore } from "@/store/weatherStore";
import { useEffect } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const setForecast = useForecastStore((store) => store.setForecast);
  const city = useMainCityStore((store) => store.mainCity);
  const setTempUnit = useTempUnitStore((store) => store.setTempUnit);
  const language = useLanguageStore((store) => store.language);

  const screenSize: { height: number; width: number } =
    Dimensions.get("window");

  useEffect(() => {
    const fetchForeCast = async () => {
      const newForecast = await getForecast(city, language.id);
      return newForecast;
    };

    fetchForeCast()
      .then(setForecast)
      .catch((error: string) =>
        Alert.alert("Could not fetch forecast!", error)
      );
  }, [city, language]);

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
