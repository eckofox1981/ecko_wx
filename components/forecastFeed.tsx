import { useLanguageStore } from "@/store/languageStore";
import { useForecastStore } from "@/store/weatherStore";
import { router } from "expo-router";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ForecastCard } from "./forecastCard";
import { ThemedText } from "./themed-text";

export function ForecastFeed() {
  const language = useLanguageStore((store) => store.language);
  const forecast = useForecastStore((store) => store.forecast);
  const screenSize: { height: number; width: number } =
    Dimensions.get("window");
  const currentDataAndTabHeight: number = 585;
  const forecastFeedHeight: number =
    screenSize.height - currentDataAndTabHeight;
  const numberOfRows: number = Math.floor(forecastFeedHeight / 150);

  const adaptList = () => {
    return forecast.slice(0, numberOfRows * 3);
  };

  const PublishForecastCards = () => {
    if (screenSize.height < 674) {
      return (
        <TouchableOpacity
          style={[styles.forecastButton]}
          onPress={() => {
            router.push("/forecastModal");
          }}
        >
          <Text style={styles.forecastButtonText}>
            {language.tapForDetails}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          router.push("/forecastModal");
        }}
      >
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
              weather={item.weatherDescription}
              temp={item.mainTemp}
            />
          )}
          ListEmptyComponent={<ThemedText>No forecast found.</ThemedText>}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: "center" }}>
      <ThemedText style={styles.title}>
        {language.forecast} ({language.tapForDetails})
      </ThemedText>
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
    textAlign: "center",
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
    textTransform: "capitalize",
  },
});
