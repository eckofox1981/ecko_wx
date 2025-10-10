import { City } from "@/models/city";
import { create, StateCreator } from "zustand";

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

interface FavoriteCitiesStore {
  favoriteCities: City[] | null;
  setFavoCities: (newList: City[]) => void;
}

const favoriteCitiesStore: StateCreator<FavoriteCitiesStore> = (set) => ({
  favoriteCities: null,
  setFavoCities: (newList: City[]) => set({ favoriteCities: newList }),
});

export const useFavoriteCitiesStore = create(favoriteCitiesStore);
