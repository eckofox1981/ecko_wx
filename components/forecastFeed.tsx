import { useForecastStore } from "@/store/weatherStore";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./themed-text";
import { ForecastCard } from "./ui/forecastCard";

export function ForecastFeed() {
  const forecast = useForecastStore((store) => store.forecast);
  const screenSize: { height: number; width: number } =
    Dimensions.get("window");
  const currentDataAndTabHeight: number = 590;
  const forecastFeedHeight: number =
    screenSize.height - currentDataAndTabHeight;
  const numberOfRows: number = Math.floor(forecastFeedHeight / 150);
  const adaptList = () => {
    console.log(
      "rows: " +
        numberOfRows +
        " screenHeight: " +
        screenSize.height +
        " feed height: " +
        forecastFeedHeight
    );

    return forecast.slice(0, numberOfRows * 3);
  };

  const PublishForecastCards = () => {
    if (screenSize.height < 674) {
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
        contentContainerStyle={styles.forecastListContent}
        data={adaptList()}
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
    <View style={{ alignItems: "center" }}>
      <ThemedText style={styles.title}>Forecast (tap for details)</ThemedText>
      <View style={[styles.container, { flex: 1 }]}>
        <PublishForecastCards />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    margin: 5,
  },
  forecastList: {
    width: "100%",
  },
  forecastListContent: {
    justifyContent: "center",
  },
  forecastButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "hsla(252, 100%, 50%, 0.50)",
    borderRadius: 10,
    minHeight: 40,
    padding: 10,
  },
  forecastButtonText: {
    color: "#f3f3f3ff",
    fontWeight: 600,
  },
});
