import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function Settings() {
  return (
    <View>
      <ThemedText>Settting page</ThemedText>
      <ThemedText>celsius to farenheit</ThemedText>
      <ThemedText>XTRA: clothing tips (yes / no)</ThemedText>
      <ThemedText>XTRA: how sensible are you to cold</ThemedText>
    </View>
  );
}
