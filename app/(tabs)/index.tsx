import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <ThemedText>MAIN</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
