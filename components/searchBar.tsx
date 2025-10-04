import { getCityList } from "@/api/getCities";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const handlePress = () => {
    console.log("====================================");
    console.log(getCityList(query));
    console.log("====================================");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for your city"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={handlePress}>
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
