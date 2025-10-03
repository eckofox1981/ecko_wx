import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search for your city" />
      <TouchableOpacity style={styles.searchIcon}>
        <IconSymbol size={50} name="search.fill" color={"#585858ff"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#d2d2d2ff",
    borderRadius: 25,
    height: 50,
    width: "90%",
    padding: 25,
    fontSize: 20,
  },
  searchIcon: {
    marginLeft: -50.0,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
});
