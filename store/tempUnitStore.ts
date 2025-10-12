import { create, StateCreator } from "zustand";

interface TempUnitStore {
  tempUnit: string;
  setTempUnit: (unit: string) => void;
}

const tempUnitStore: StateCreator<TempUnitStore> = (set) => ({
  tempUnit: "celsius",
  setTempUnit: (unit: string) => set({ tempUnit: unit }),
});

export const useTempUnitStore = create(tempUnitStore);
