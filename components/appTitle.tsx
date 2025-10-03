import * as Font from "expo-font";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CustomFont = () => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "custom-font": require("../assets/fonts/BonheurRoyale-Regular.ttf"),
      });
    }

    loadFont();
  }, []);
};

export function AppTitle() {
  const [fontsLoaded] = Font.useFonts({
    "title-font": require("../assets/fonts/BonheurRoyale-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/ecko_wx-logo.png")}
      />
      <Text style={styles.title}>Ecko Wx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "#3300FF",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  logo: {
    height: 59,
    width: 59,
    marginLeft: 20,
  },
  title: {
    textAlign: "center",
    flex: 1,
    color: "#d2d2d2ff",
    fontSize: 50,
    fontFamily: "title-font",
    fontWeight: 800,
  },
});
