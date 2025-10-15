import { ForecastDetails } from "@/components/forecastDetails";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useMainCityStore } from "@/store/cityStore";
import { useForecastStore } from "@/store/weatherStore";
import { cityNameFormating } from "@/utilities/cityNameFormating";
import { FlatList, StyleSheet } from "react-native";

/**
 * displays when ForeCastFeed is taped in index
 * @returns a list of detailed forecast (ForecastDetails) for the active city
 */
export default function ForecastModal() {
  const forecast = useForecastStore((store) => store.forecast);
  const city = useMainCityStore((store) => store.mainCity);
  return (
    <ThemedView>
      <ThemedText style={styles.cityName}>{cityNameFormating(city)}</ThemedText>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => `${item.dt} ${index}`}
        renderItem={({ item }) => <ForecastDetails forecast={item} />}
        ListEmptyComponent={<ThemedText>No forecast to display</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cityName: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    borderBottomColor: "#3300FF",
    borderBottomWidth: 2,
  },
});
