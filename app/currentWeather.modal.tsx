import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { ThemedText } from "@/components/themed-text";
import { WindCompass } from "@/components/windCompass";
import { useMainCityStore } from "@/store/cityStore";
import { useLanguageStore } from "@/store/languageStore";
import { useCurrentWeatherStore } from "@/store/weatherStore";
import { timeFormating } from "@/utilities/timeFormating";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function CurrentWeatherModal() {
  const city = useMainCityStore((store) => store.mainCity);
  const currentWeather = useCurrentWeatherStore(
    (store) => store.currentWeather
  );
  const language = useLanguageStore((store) => store.language);

  return (
    <View>
      <View>
        <ThemedText>Current weather in {city.name}</ThemedText>
        <TouchableOpacity>Forecast</TouchableOpacity>
      </View>
      <ThemedText>
        Sunrise: {timeFormating(currentWeather.sysSunrise)} Sunset:
        {timeFormating(currentWeather.sysSunset)}
      </ThemedText>
      <ScrollView>
        <View>
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
          <ThemedText>{currentWeather.weatherDescription}</ThemedText>
          <ThemedText>
            {language.visibility}: {currentWeather.visibility}
          </ThemedText>
        </View>
        <View>
          <ThemedText>{language.temperatures}</ThemedText>
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
        <View>
          <ThemedText>{language.wind}</ThemedText>
          <View>
            <View>
              <WindCompass degree={currentWeather.windDeg} size={50} />
              <ThemedText>
                {language.direction}: {currentWeather.windDeg}°
              </ThemedText>
            </View>
            <View>
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
        <View>
          <ThemedText>{language.precipitations}</ThemedText>
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
