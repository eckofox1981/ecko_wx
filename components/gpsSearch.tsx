import { getCityByCoordinates } from "@/api/getCities";
import { City } from "@/models/city";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import * as Location from "expo-location";
import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedIcon } from "./themed-icon";
import { ThemedText } from "./themed-text";

export function GpsSearch() {
  const language = useLanguageStore((store) => store.language);
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [errorMsg, setErrorMsg] = useState("");
  const setCity = useMainCityStore((store) => store.setMainCity);

  const handleGPSPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg(language.youDeniedLocationPermission);
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    });

    try {
      const locationCity: City = await getCityByCoordinates(
        location.coords.latitude,
        location.coords.longitude
      );

      setCity(locationCity);
    } catch (error: any) {
      Alert.alert(language.error, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGPSPress}>
        <ThemedIcon size={40} name={"gps-fixed.fill"} />
      </TouchableOpacity>
      <ThemedText style={styles.text}>{language.getGPSlocation}</ThemedText>
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
