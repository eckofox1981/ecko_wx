import { City } from "@/models/city";
import { Button, View } from "react-native";

export function WeatherMaps({ city }: { city: City }) {
  return (
    <View>
      <Button title="Cloud" />
      <Button title="Rain" />
      <Button title="Wind" />
    </View>
  );
}
