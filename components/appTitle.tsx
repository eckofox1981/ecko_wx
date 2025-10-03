import * as Font from "expo-font";
import { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView
      edges={["top"]}
      style={[{ backgroundColor: "#3300FF" }, styles.container]}
    >
      <Image
        style={styles.logo}
        source={require("../assets/images/ecko_wx-logo.png")}
      />
      <Text style={styles.title}>Ecko Wx</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#3300FF",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 55,
    width: 55,
    marginLeft: 30,
  },
  title: {
    textAlign: "center",
    flex: 1,
    color: "#d2d2d2ff",
    fontSize: 40,
    fontFamily: "title-font",
    fontWeight: 800,
  },
});
