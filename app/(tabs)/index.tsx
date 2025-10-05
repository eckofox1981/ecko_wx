import { CurrentWeather } from "@/components/currentWeather";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { ForecastCard } from "@/components/ui/forecastCard";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
      <ForecastCard
        date={new Date(1759593792 * 1000)}
        icon={"01d"}
        weather="Cloud"
        temp={27}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
