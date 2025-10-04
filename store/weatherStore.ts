import { CurrentWeather } from "@/models/weather";
import { create, StateCreator } from "zustand";

interface CurrentWeatherStore {
  currentWeather: CurrentWeather;
  setCurrentWeather: (newWeather: CurrentWeather) => void;
}

const currentWeatherStore: StateCreator<CurrentWeatherStore> = (set) => ({
  currentWeather: {
    weatherMain: "Clouds",
    weatherDescription: "broken clouds",
    weatherIcon: "04d",
    mainTemp: 288.65,
    mainFeels_like: 287.64,
    mainTemp_min: 287.23,
    mainTemp_max: 289.4,
    mainPressure: 1011,
    mainHumidity: 53,
    mainSea_level: 1011,
    visibility: 10000,
    windSpeed: 9.77,
    windDeg: 270,
    windGust: 0,
    cloudsAll: 75,
    dt: new Date(1759593792 * 1000),
    sysSunrise: new Date(1759554770 * 1000),
    sysSunset: new Date(1759595490 * 1000),
  },
  setCurrentWeather: (newWeather: CurrentWeather) =>
    set({ currentWeather: newWeather }),
});

export const useCurrentWeatherStore = create(currentWeatherStore);
