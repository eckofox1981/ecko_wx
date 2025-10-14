import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLanguageStore } from "@/store/languageStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const language = useLanguageStore((store) => store.language);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `${language.home}`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: `${language.favorites}`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="heart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: `${language.settings}`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="settings.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
