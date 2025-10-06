import { english } from "@/assets/languages/languages";
import { Language } from "@/models/languages";
import { create, StateCreator } from "zustand";

interface LanguageStore {
  language: Language;
  setLanguage: (newLanguage: Language) => void;
}

const languageStore: StateCreator<LanguageStore> = (set) => ({
  language: english,
  setLanguage: (newLanguage: Language) => set({ language: newLanguage }),
});

export const useLanguageStore = create(languageStore);
