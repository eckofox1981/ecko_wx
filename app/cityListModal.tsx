import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { City } from "@/models/city";

export default function CityListModal({ cityList }: { cityList: City[] }) {
  const showList = () => {
    return cityList.map((city) => (
      <TouchableOpacity>
        <ThemedText>
          {city.name}, {city.state}
        </ThemedText>
      </TouchableOpacity>
    ));
  };

  return <ThemedView style={styles.container}>{showList()}</ThemedView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
