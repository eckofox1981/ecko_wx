import { CurrentWeather, ThreeHoursForeCast } from "@/models/weather";
import { create, StateCreator } from "zustand";

interface CurrentWeatherStore {
  currentWeather: CurrentWeather | null;
  setCurrentWeather: (newWeather: CurrentWeather) => void;
}

const currentWeatherStore: StateCreator<CurrentWeatherStore> = (set) => ({
  currentWeather: null,
  setCurrentWeather: (newWeather: CurrentWeather) =>
    set({ currentWeather: newWeather }),
});

export const useCurrentWeatherStore = create(currentWeatherStore);

interface ForecastStore {
  forecast: ThreeHoursForeCast[];
  setForecast: (newForecast: ThreeHoursForeCast[]) => void;
}

const forecastStore: StateCreator<ForecastStore> = (set) => ({
  forecast: [],
  setForecast: (newForecast: ThreeHoursForeCast[]) =>
    set({ forecast: newForecast }),
});

export const useForecastStore = create(forecastStore);
