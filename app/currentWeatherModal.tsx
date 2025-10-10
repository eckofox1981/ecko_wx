import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { ThemedText } from "@/components/themed-text";
import { WindCompass } from "@/components/windCompass";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { timeFormating } from "@/utilities/timeFormating";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CurrentWeatherModal() {
  const city = useMainCityStore((store) => store.mainCity);
  const currentWeather = useCurrentWeatherStore(
    (store) => store.currentWeather
  );

  const language = useLanguageStore((store) => store.language);

  return (
    <View style={styles.main}>
      <ThemedText style={styles.title}>
        {language.currentWeather} {city.name}
      </ThemedText>
      <View style={styles.sunriset}>
        <ThemedText style={styles.sunriset}>
          {language.sunrise}: {timeFormating(currentWeather.sysSunrise)} -{" "}
          {language.sunset}:{timeFormating(currentWeather.sysSunset)}
        </ThemedText>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/forecastModal");
          }}
        >
          <Text style={styles.buttonTitle}>Forecast</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        style={{ width: "100%" }}
      >
        <View style={[styles.mainDescription, styles.section]}>
          <Image
            style={{
              resizeMode: "contain",
              height: 150,
              width: 150,
              backgroundColor: "#3300FF",
              margin: "auto",
              borderRadius: 75,
            }}
            source={{
              uri: GET_WEATHER_ICON_URL(currentWeather.weatherIcon),
            }}
          />
          <ThemedText style={styles.mainText}>
            {currentWeather.weatherDescription}
          </ThemedText>
          <ThemedText>
            {language.visibility}: {currentWeather.visibility}
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            {language.temperatures}
          </ThemedText>
          <View style={styles.data}>
            <ThemedText>
              {language.average}: {currentWeather.mainTemp}°C
            </ThemedText>
            <ThemedText>
              {language.minimum}: {currentWeather.mainTemp_min}°C
            </ThemedText>
            <ThemedText>
              {language.maximum}: {currentWeather.mainTemp_max}°C
            </ThemedText>
          </View>
        </View>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>{language.wind}</ThemedText>
          <View style={styles.windSection}>
            <View style={styles.windLeft}>
              <WindCompass degree={currentWeather.windDeg} size={100} />
              <ThemedText>
                {language.direction}: {currentWeather.windDeg}°
              </ThemedText>
            </View>
            <View style={[styles.windRight, styles.data]}>
              <ThemedText>
                {language.speed}: {currentWeather.windSpeed} m/s
              </ThemedText>
              <ThemedText>
                {language.gust}: {currentWeather.windGust} m/s
              </ThemedText>
              <ThemedText>
                {language.pressure}: {currentWeather.mainPressure} hPa
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            {language.precipitations}
          </ThemedText>
          <ThemedText>
            {language.rainLastHour}: {currentWeather?.rain1h || 0}mm
          </ThemedText>
          <ThemedText>
            {language.humidity}: {currentWeather.mainHumidity}%
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 25,
  },
  button: {
    backgroundColor: "#3300FF",
    borderRadius: 10,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  buttonTitle: {
    fontWeight: 700,
    color: "#d2d2d2ff",
    padding: 5,
    margin: 5,
  },
  sunriset: {
    fontStyle: "italic",
    width: "95%",
    textAlign: "center",
    fontSize: 15,
    marginTop: 2,
  },
  scrollview: {
    paddingBottom: 20,
  },
  mainDescription: {
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: "#3300FF",
    width: "95%",
    padding: 5,
  },
  mainText: {
    textTransform: "capitalize",
    fontWeight: 600,
  },
  section: {
    alignSelf: "center",
    marginTop: 5,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#3300FF",
    width: "95%",
    padding: 5,
  },
  sectionTitle: {
    fontWeight: 600,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  windSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: "5%",
  },
  windLeft: {
    margin: "auto",
    height: 120,
  },
  windRight: {
    height: 120,
  },
  data: {
    margin: "auto",
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
});
