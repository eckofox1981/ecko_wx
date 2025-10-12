import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { ThreeHoursForeCast } from "@/models/weather";
import { useLanguageStore } from "@/store/languageStore";
import { timeFormating } from "@/utilities/timeFormating";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { Wind } from "./wind";

export function ForecastDetails({
  forecast,
}: {
  forecast: ThreeHoursForeCast;
}) {
  const language = useLanguageStore((store) => store.language);

  const weekDays = [
    language.sunday,
    language.monday,
    language.tuesday,
    language.wednesday,
    language.thursday,
    language.friday,
    language.saturday,
  ];

  return (
    <View style={styles.main}>
      <ThemedText style={styles.title}>
        {weekDays[forecast.dt.getDay()]} {timeFormating(forecast.dt)}
      </ThemedText>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            style={{
              resizeMode: "contain",
              height: 120,
              width: 120,
              backgroundColor: "#3300FF",
              margin: "auto",
              borderRadius: 60,
            }}
            source={{
              uri: GET_WEATHER_ICON_URL(forecast.weatherIcon),
            }}
          />
          <ThemedText style={styles.description}>
            {forecast.weatherDescription}
          </ThemedText>
          <ThemedText>
            {language.visibility}: {forecast.visibilty}m
          </ThemedText>
        </View>
        <View style={styles.rightContainer}>
          <Wind
            style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}
            degree={forecast.windDeg}
            speed={forecast.windSpeed}
            gust={forecast.windGust}
          />
          <ThemedText>
            {language.temp}: {forecast.mainTemp}°C
          </ThemedText>
          <ThemedText>
            {language.feelsLike}: {forecast.mainFeels_like}°C
          </ThemedText>
          <ThemedText>
            {language.minimum}: {forecast.mainTemp_min}°C
          </ThemedText>
          <ThemedText>
            {language.precipitations} 3Hrs: {forecast.pop}mm
          </ThemedText>
          <ThemedText>
            {language.humidity}: {forecast.mainHumidity}%
          </ThemedText>
          <ThemedText>
            {language.pressure}: {forecast.mainPressure}hPa
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignSelf: "center",
    borderBottomColor: "#3300FF",
    borderBottomWidth: 2,
    alignItems: "center",
    marginTop: 5,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    gap: 20,
    marginBottom: 5,
  },
  leftContainer: {
    alignItems: "center",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  title: {
    fontWeight: 600,
    fontSize: 20,
  },
  description: {
    fontWeight: 600,
    textTransform: "capitalize",
    marginVertical: 10,
  },
});
