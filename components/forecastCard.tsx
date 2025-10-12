import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
import { useLanguageStore } from "@/store/languageStore";
import { timeFormating } from "@/utilities/timeFormating";
import { Image, StyleSheet, Text, View } from "react-native";

export function ForecastCard({
  date,
  icon,
  weather,
  temp,
}: {
  date: Date;
  icon: string;
  weather: string;
  temp: string;
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
    <View style={styles.container}>
      <Text style={styles.text}>
        {weekDays[date.getDay()]}
        {"\n"}
        {timeFormating(date)}
      </Text>
      <Image
        style={{ flex: 1, resizeMode: "contain", minHeight: 100, margin: -20 }}
        source={{
          uri: GET_WEATHER_ICON_URL(icon),
        }}
      />
      <Text style={styles.text}>{weather}</Text>
      <Text style={styles.text}>{temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2700c5ff",
    borderRadius: 5,
    padding: 2,
    margin: 2,
    width: 105,
    height: 140,
  },
  text: {
    color: "#d2d2d2ff",
    alignSelf: "center",
    fontWeight: 600,
    fontSize: 13,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
