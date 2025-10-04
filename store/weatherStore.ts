import { create } from "zustand";

const currentWeatherStore = (set: any) => ({
  currentWeather: {},
  setCurrentWeather: (newWeather: any) => set({ currentWeather: newWeather }),
});

export const useCurrentWeatherStore = create(currentWeatherStore);
