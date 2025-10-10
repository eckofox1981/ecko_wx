import { create } from "zustand";

interface TempUnitStore {
  tempUnit: string;
  setTempUnit: (unit: string) => void;
}

const tempUnitStore = create<TempUnitStore>((set) => ({
  tempUnit: "celsius",
  setTempUnit: (unit: string) => set({ tempUnit: unit }),
}));

export const useTempUnitStore = create(tempUnitStore);
