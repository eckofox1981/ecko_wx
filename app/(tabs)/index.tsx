import { getForecast } from "@/api/getWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { ForecastFeed } from "@/components/forecastFeed";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { useMainCityStore } from "@/store/cityStore";
import { useForecastStore } from "@/store/weatherStore";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const forecast = useForecastStore((store) => store.forecast);
  const setForecast = useForecastStore((store) => store.setForecast);
  const city = useMainCityStore((store) => store.mainCity);

  const screenSize: { height: number; width: number } =
    Dimensions.get("window");

  useEffect(() => {
    const fetchForeCast = async () => {
      const newForecast = await getForecast(city, "en");
      return newForecast;
    };

    fetchForeCast().then(setForecast);
  }, [city]);

  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
      <ForecastFeed screenSize={screenSize} forecast={forecast} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  forecastList: {
    flexDirection: "row",
  },
  forecastButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "hsla(252, 100%, 50%, 0.50)",
    borderRadius: 10,
    minHeight: 40,
    margin: 10,
    padding: 10,
  },
  forecastButtonText: {
    color: "#f3f3f3ff",
    fontWeight: 600,
  },
});
