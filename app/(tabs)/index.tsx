import { getForecast } from "@/api/getWeather";
import { CurrentWeather } from "@/components/currentWeather";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { ThemedText } from "@/components/themed-text";
import { ForecastCard } from "@/components/ui/forecastCard";
import { useMainCityStore } from "@/store/cityStore";
import { useForecastStore } from "@/store/weatherStore";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const forecast = useForecastStore((store) => store.forecast);
  const setForecast = useForecastStore((store) => store.setForecast);
  const city = useMainCityStore((store) => store.mainCity);
  useEffect(() => {
    const fetchForeCast = async () => {
      const newForecast = await getForecast(city, "en");
      return newForecast;
    };

    fetchForeCast().then(setForecast);
  }, [city]);

  const PublishForecastCards = () => {};

  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
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
});
