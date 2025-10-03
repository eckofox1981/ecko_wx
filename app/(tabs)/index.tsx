import { CurrentWeather } from "@/components/currentWeather";
import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <CurrentWeather />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
