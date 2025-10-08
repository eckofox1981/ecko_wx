import { GET_WEATHER_ICON_URL } from "@/api/API_KEYS";
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
  temp: number;
}) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
      <Text style={styles.text}>{temp}'C</Text>
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
  },
});
