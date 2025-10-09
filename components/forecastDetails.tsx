import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { ThreeHoursForeCast } from "@/models/weather";
import { useLanguageStore } from "@/store/languageStore";
import { timeFormating } from "@/utilities/timeFormating";
import { Image, View } from "react-native";
import { ThemedText } from "./themed-text";
import { Wind } from "./wind";

export function ForecastDetails({
  forecast,
}: {
  forecast: ThreeHoursForeCast;
}) {
  const language = useLanguageStore((store) => store.language);

  return (
    <View>
      <ThemedText>{timeFormating(forecast.dt)}</ThemedText>
      <View>
        <Image
          style={{
            resizeMode: "contain",
            height: 100,
            width: 100,
            backgroundColor: "#3300FF",
            margin: "auto",
            borderRadius: 50,
          }}
          source={{
            uri: GET_WEATHER_ICON_URL(forecast.weatherIcon),
          }}
        />
      </View>
      <ThemedText>{forecast.weatherDescription}</ThemedText>
      <ThemedText>
        {language.visibility}: {forecast.visibilty}
      </ThemedText>
      <View>
        <Wind
          degree={forecast.windDeg}
          speed={forecast.windSpeed}
          gust={forecast.windGust}
        />
        <ThemedText>
          {language.temp}: {forecast.mainTemp}
        </ThemedText>
        <ThemedText>
          {language.feelsLike}: {forecast.mainFeels_like}
        </ThemedText>
        <ThemedText>
          {language.minimum}: {forecast.mainTemp_min}
        </ThemedText>
        <ThemedText>
          {language.precipitations} 3Hrs: {forecast.pop}
        </ThemedText>
        <ThemedText>
          {language.humidity}: {forecast.mainHumidity}
        </ThemedText>
        <ThemedText>
          {language.pressure}: {forecast.mainPressure}hPa
        </ThemedText>
      </View>
    </View>
  );
}
