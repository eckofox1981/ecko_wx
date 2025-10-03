import { GpsSearch } from "@/components/gpsSearch";
import { SearchBar } from "@/components/searchBar";
import { ThemedText } from "@/components/themed-text";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <SearchBar />
      <GpsSearch />
      <ThemedText>MAIN</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
});
