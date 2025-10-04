import { City } from "@/models/city";
import { create } from "zustand";

const cityListStore = (set: any) => ({
  cityList: [],
  setCityList: (newList: City[]) => set({ cityList: newList }),
});

export const useCityListStore = create(cityListStore);

const mainCityStore = (set: any) => ({
  mainCity: {
    country: "FR",
    lat: 48.8588897,
    lon: 2.3200410217200766,
    name: "Paris",
    state: "Ile-de-France",
  },
  setMainCity: (newCity: City) => set({ mainCity: newCity }),
});

export const useMainCityStore = create(mainCityStore);
