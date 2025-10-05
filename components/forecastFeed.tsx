import { ThreeHoursForeCast } from "@/models/weather";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./themed-text";
import { ForecastCard } from "./ui/forecastCard";

export function ForecastFeed({
  screenSize,
  forecast,
}: {
  screenSize: { height: number; width: number };
  forecast: ThreeHoursForeCast[];
}) {
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

  return <PublishForecastCards />;
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
