import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "./themed-icon";
import { ThemedText } from "./themed-text";

export function GpsSearch() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <ThemedIcon size={40} name={"gps-fixed.fill"} />
      </TouchableOpacity>
      <ThemedText style={styles.text}>Get Weather at your location</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    gap: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
});
