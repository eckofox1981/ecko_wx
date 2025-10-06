import * as Font from "expo-font";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
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
      <Text style={[styles.title, { fontFamily: "title-font" }]}>Ecko Wx</Text>
    </SafeAreaView>
  );
}

const screenSize: { height: number; width: number } = Dimensions.get("window");
const calculateLogoSize = () => {
  if (screenSize.height <= 480) {
    return 40;
  }
  return 55;
};
const logoSize: number = calculateLogoSize();

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#3300FF",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: logoSize,
    width: logoSize,
    marginLeft: 30,
  },
  title: {
    textAlign: "center",
    flex: 1,
    color: "#d2d2d2ff",
    fontSize: logoSize - 10,
    fontWeight: 800,
  },
});
