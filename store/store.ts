import { City } from "@/models/city";
import { create } from "zustand";

const cityListStore = (set: any) => ({
  cityList: [],
  setCityList: (newList: City[]) => set({ cityList: newList }),
});

export const useCityListStore = create(cityListStore);
