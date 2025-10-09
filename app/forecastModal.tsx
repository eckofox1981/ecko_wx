import { ForecastDetails } from "@/components/forecastDetails";
import { ThemedText } from "@/components/themed-text";
import { useForecastStore } from "@/store/weatherStore";
import { FlatList, ScrollView } from "react-native";

export default function ForecastModal() {
  const forecast = useForecastStore((store) => store.forecast);

  return (
    <ScrollView>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => `${item.dt} ${index}`}
        renderItem={({ item }) => <ForecastDetails forecast={item} />}
        ListEmptyComponent={<ThemedText>No forecast to display</ThemedText>}
      />
    </ScrollView>
  );
}
