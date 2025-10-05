import { getForecast } from "@/api/getWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { ThemedText } from "@/components/themed-text";
import { ForecastCard } from "@/components/ui/forecastCard";
import { useMainCityStore } from "@/store/cityStore";
import { useForecastStore } from "@/store/weatherStore";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

  const PublishForecastCards = () => {
    console.log("====================================");
    console.log(screenSize.height);
    console.log("====================================");
    if (screenSize.height < 640) {
      return (
        <TouchableOpacity style={[styles.forecastButton]}>
          <Text style={styles.forecastButtonText}>
            Tap to see 5-day forecast
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <FlatList
        style={styles.forecastList}
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <ForecastCard
            date={item.dt}
            icon={item.weatherIcon}
            weather={item.weatherMain}
            temp={item.mainTemp}
          />
        )}
        ListEmptyComponent={<ThemedText>No forecast found.</ThemedText>}
      />
    );
  };

  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
      <PublishForecastCards />
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
